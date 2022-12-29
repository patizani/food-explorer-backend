const knex = require("../database/knex");
const DiskStorage = require("../provides/DiskStorage");

class ProductsController{
  async create(request, response){
    const { title, description, category, price, ingredients } = request.body;

    const imageFilename =  request.file.filename;
    const diskStorage = new DiskStorage();
    const filename = await diskStorage.savefile(imageFilename);

    const product_id = await knex("products").insert({
      image:filename,
      title,
      description,
      category,
      price
    });
    const ingredients_id = await knex('ingredients')
    .select(['ingredients.id'])
    .whereIn('name', Array.isArray(ingredients) ? ingredients : [ingredients])

    const ingredientsInsert = ingredients_id.map(ingredient_id => {
      return {
        product_id,
        ingredient_id: ingredient_id.id
      }
    });

    await knex("productsIngredients").insert(ingredientsInsert);

     return response.status(201).json();
  }

  async show(request, response) {
    const { id } = request.params

    const product = await knex('products').where({ id }).first()
    const ingredients = await knex('productsIngredients')
    .where({product_id: id})
    .innerJoin('ingredients', 'ingredients.id', 'productsIngredients.ingredient_id')
   
    return response.status(200).json({
      ...product,
      ingredients
    })
  }

  async index(request, response) {
    const { title, ingredients } = request.query;
    // const user_id = request.user.id

    let products

    if(ingredients){
      const filterIngredients = ingredients.split(',').map(ingredient => ingredient.trim());
      
      products = await knex("ingredients")
      .whereIn("name", filterIngredients)
      .innerJoin('productsIngredients', 'productsIngredients.ingredient_id', 'ingredients.id')
      .innerJoin('products', 'products.id', 'productsIngredients.product_id')

    }else{
      products = await knex("products")
      .whereLike("title", `%${title}%`)     
      .orderBy("title");
    }

    return response.status(200).json(products);
  }  
  
  async delete(request, response){
    const { id } = request.params

    await knex('products').where({ id }).delete()

    return response.json()
  }

  async update(request, response) {
    const { title, description, category, price, ingredients } = request.body;
    const { id } = request.params;
    const { filename: imageFilename } = request.file || {};

    const diskStorage = new DiskStorage();

    const product = await knex("products").where({ id }).first();

    if (product.image && imageFilename) {
      await diskStorage.deletefile(product.image);
    }

    if (imageFilename) {
      product.image = await diskStorage.savefile(imageFilename);
    }
    
    product.title = title ?? product.title;
    product.description = description ?? product.description;
    product.category = category ?? product.category;
    product.price = price ?? product.price;

    await knex("products").where({ id }).update(product);
    await knex("products").where({ id }).update('updated_at', knex.fn.now());

    await knex("productsIngredients").where({ product_id:id }).delete();

    const ingredients_id = await knex('ingredients')
    .select(['ingredients.id'])
    .whereIn('name', Array.isArray(ingredients) ? ingredients : [ingredients])

    const ingredientsInsert = ingredients_id.map(ingredient_id => {
      return {
        product_id:id,
        ingredient_id: ingredient_id.id
      }
    });

    await knex("productsIngredients").insert(ingredientsInsert);

    return response.status(200).json();
  }
}

module.exports = ProductsController;
