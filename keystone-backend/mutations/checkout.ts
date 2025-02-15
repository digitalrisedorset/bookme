import stripeConfig from '../lib/stripe';
import type { Context } from '.keystone/types'
import {sendEmail} from "../lib/mail";
import formatMoney from "../lib/formatMoney";
import {orderReference} from "../lib/order";
import {itemDescription, itemName} from "../lib/cartItem";

interface Arguments {
    token: string
}

const graphql = String.raw;

async function checkout(
    root: any,
    { token }: Arguments,
    context: Context
): Promise<OrderCreateInput> {
    console.log('creating an order')
    // 1. Make sure they are signed in
    const userId = context.session.itemId;
    if(!userId) {
        throw new Error('Sorry! You must be signed in to create an order!')
    }
    console.log('creating an order 1')
    // 1.5 Query the current user
    const user = await context.query.User.findOne({
        where: { id: userId },
        query: graphql`
            id
            email
            name    
            venue {               
                orderPrefix
                orderPadding
            }          
            cartItems {
              id
              quantity   
              price
              haircut {
                name
              }
              shampoo
              event {
                id
                day
                startTime              
                hairdresser {
                  id            
                  name
                }                                  
              }      
            }             
    `
    });

    //console.dir(user, { depth: null })
    // 2. calc the total price for their order
    const cartItems = user.cartItems.filter(cartItem => cartItem.event);
    const amount = cartItems.reduce(function(tally: number, cartItem: CartItemCreateInput) {
        return tally + cartItem.quantity * cartItem.price;
    }, 0);

    // 3. create the charge with the stripe library
    const charge = await stripeConfig.paymentIntents.create({
        amount,
        currency: 'GBP',
        confirm: true,
        payment_method: token,
    }).catch(err => {
        console.log(err);
        throw new Error(err.message);
    });

    // 4. Convert the cartItems to OrderItems
    const orderItems = cartItems.map(cartItem => {
        const orderItem = {
            name: itemName(cartItem), //`${capitalise(cartItem.event.day)} ${cartItem.haircut.name}`,
            description: itemDescription(cartItem),//`${getFormattedDate(cartItem.event.startTime)} with ${capitalise(cartItem.event.hairdresser.name)} for a ${cartItem.haircut.name}`,
            price: cartItem.price,
            quantity: cartItem.quantity,
            event: { connect: { id: cartItem.event.id }}
        }
        return orderItem;
    })

    const lastOrder = await context.query.Order.count()

    // 5. Create the order and return it
    const order = await context.query.Order.createOne({
        data: {
            orderNumber: lastOrder + 1,
            total: charge.amount,
            charge: charge.id,
            items: { create: orderItems },
            user: { connect: { id: userId }}
        },
        resolveFields: false,
    });

    // 6. Clean up any old cart item
    //const cartItemIds = user.cartItems.map(cartItem => {{ id: cartItem.id}} );
    let cartItemIds = []
    for (let i=0;i<user.cartItems.length;i++) {
        cartItemIds.push({id: user.cartItems[i].id})
    }

    await context.query.CartItem.deleteMany({ where: cartItemIds });

    const orderSummary = cartItems.reduce((summary, cartItem) => {
        return summary + `<p>${itemDescription(cartItem)}</p>`
    }, '');

    await sendEmail(user.email, 'Your order has been received!', `<h2>Your order - ${orderReference(user?.venue, lastOrder + 1)}</h2>
     <p>Order Total: ${formatMoney(charge.amount)}</p>      
     ${orderSummary}            
    `)

    return order;
}

export default checkout;
