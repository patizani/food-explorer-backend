const knex = require('../database/knex');

class IngredientsController{
  async create(request, response){
    const { name, image } = request.body;
    const user_id = request.user.id;

    await knex('ingredients').insert({
      name,
      image
    });

    return response.json()

  }
  async show(request, response){
    const { id } = request.params;

    const productsIngredients = await knex("productsIngredients")
      .select(['ingredients.name', 'ingredients.image'])
      .where({ product_id: id })
      .innerJoin('ingredients', 'ingredients.id', 'productsIngredients.ingredient_id');

    return response.json({ productsIngredients });
  }
  async index(request, response){
    const ingredients = await knex("ingredients").orderBy("name");

    return response.json({ ingredients });
  }
}

module.exports = IngredientsController;