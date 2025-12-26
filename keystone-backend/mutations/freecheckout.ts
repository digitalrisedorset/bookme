import type { Context } from '.keystone/types'
import {sendEmail} from "../lib/mail";
import {itemDescription, itemName} from "../lib/cartItem";

const graphql = String.raw;

async function freecheckout(
    root: any,
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
                name
            }          
            cartItems {
              id
              quantity   
              price
              eventType {
                name
              }
              shampoo
              event {
                id
                day
                startTime 
                endTime             
                eventHost {
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

    // 4. Convert the cartItems to OrderItems
    const orderItems = cartItems.map(cartItem => {
        const orderItem = {
            name: itemName(cartItem), //`${capitalise(cartItem.event.day)} ${cartItem.eventType.name}`,
            description: itemDescription(cartItem),//`${getFormattedDate(cartItem.event.startTime)} with ${capitalise(cartItem.event.eventHost.name)} for a ${cartItem.eventType.name}`,
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
            total: 0,
            charge: 'Free Checkout',
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

    /*await sendEmail(user.email, 'Your appointment has been received!', `<h2>Your appointment with ${(user?.venue?.name)}</h2>
     ${orderSummary}            
    `)*/

    return order;
}

export default freecheckout;
