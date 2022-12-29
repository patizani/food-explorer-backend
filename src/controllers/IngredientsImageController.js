const knex = require("../database/knex");
const AppError = require("../utils/AppError");
const DiskStorage = require("../provides/DiskStorage");

class IngredientsImageController {
  async update(request, response){
    const ingredient_id = request.params.id
    const imageFilename = request.file.filename;

    const diskStorage = new DiskStorage();

    const ingredient = await knex("ingredients")
    .where({ id: ingredient_id }).first();

    if(!ingredient) {
      throw new AppError("Não foi possível salvar a imagem. Por favor verifique os dados informados", 401);
    };

    if(ingredient.image){
      await diskStorage.deletefile(ingredient.image);
    };

    const filename = await diskStorage.savefile(imageFilename);
    ingredient.image = filename;

    await knex("ingredients").update(ingredient).where({id: ingredient_id });

    return response.json(ingredient);
  }
}

module.exports = IngredientsImageController;