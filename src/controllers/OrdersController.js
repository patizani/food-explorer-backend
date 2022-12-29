const knex = require('../database/knex');

class OrdersController{
  async create(request, response) {
    const { status, paymentMethod, orders } = request.body;
    const user_id = request.user.id;

    const order_id = await knex("orders").insert({
      status,
      paymentMethod,
      user_id
    })

    const ordersInsert = orders.map(order => {

      return {
        title: order.title,
        quantity: order.quantity,
        order_id,
        product_id: order.id
      }
    });

    await knex("ordersItems").insert(ordersInsert);
    return response.status(201).json();
  }

  async show(request, response) {
    const { id } = request.params;

    const orders = await knex("orders").where({ user_id: id }).first();
    const orderItems = await knex("ordersItems").where({ order_id: orders.id});

    return response.status(201).json({
      ...orders,
      orderItems,
    });
  }

  async index(request, response) {
    const allIOrders = await knex("orders")
    const items = await knex("ordersItems")  

    const ordersWithItems = allIOrders.map(order => {
      const orderItem = items.filter(item => item.order_id === order.id)

      return {
        ...order,
        items: orderItem
      }
    })
    return response.status(201).json(ordersWithItems)
  }

  async update(request, response) {
    const { id, status } = request.body;
    await knex("orders").update({status}).where({ id })
    
    return response.status(201).json();
  }

  async delete(request, response) {
    const { id } = request.params;
    await knex("orders").where({ user_id: id }).delete();

    return response.status(201).json();
  }
}

module.exports = OrdersController;
