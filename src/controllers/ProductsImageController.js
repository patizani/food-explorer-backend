const knex = require('../database/knex');
const AppError = require("../utils/AppError");

const DiskStorage = require("../provides/DiskStorage");

class ProductsImageController{
  async update(request, response){
    const product_id = request.params.id
    const imageFilename = request.file.filename;

    const diskStorage = new DiskStorage();

    const product = await knex("products")
    .where({ id: product_id }).first();

    if(!product) {
      throw new AppError("Não foi possível salvar a imagem. Por favor verifique os dados informados", 401);
    };

    if(product.image){
      await diskStorage.deletefile(product.image);
    };

    const filename = await diskStorage.savefile(imageFilename);
    product.image = filename;

    await knex("products").update(product).where({id: product_id });

    return response.json(product);
  }
}

module.exports = ProductsImageController;

