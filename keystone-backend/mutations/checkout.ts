import stripeConfig from '../lib/stripe';
import type { Context } from '.keystone/types'

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
      name
      email
      cartItems {
        id
        quantity
        event {        
          price          
          id         
        }
      }
    `
    });

    console.log('creating an order 2', user)

    console.dir(user, { depth: null })
    // 2. calc the total price for their order
    const cartItems = user.cartItems.filter(cartItem => cartItem.event);
    console.log('creating an order 3', cartItems)
    const amount = cartItems.reduce(function(tally: number, cartItem: CartItemCreateInput) {
        return tally + cartItem.quantity * cartItem.event.price;
    }, 0);
    console.log('creating an order 4')
    console.log(amount);
    // 3. create the charge with the stripe library
    const charge = await stripeConfig.paymentIntents.create({
        amount,
        currency: 'USD',
        confirm: true,
        payment_method: token,
    }).catch(err => {
        console.log(err);
        throw new Error(err.message);
    });
    console.log('charge', charge)
    // 4. Convert the cartItems to OrderItems
    const orderItems = cartItems.map(cartItem => {
        const orderItem = {
            name: 'test',
            description: 'test',
            price: cartItem.event.price,
            quantity: cartItem.quantity
        }
        return orderItem;
    })
    console.log('gonna create the order')
    // 5. Create the order and return it
    const order = await context.query.Order.createOne({
        data: {
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

    console.log('gonna create delete cartItems', cartItemIds)
    await context.query.CartItem.deleteMany({ where: cartItemIds });
    console.log('deleted cartItems', cartItemIds)
    return order;
}

export default checkout;
