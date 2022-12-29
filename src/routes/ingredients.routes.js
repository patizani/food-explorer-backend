const { Router, response } = require('express');
const multer = require('multer')
const uploadConfig = require('../configs/upload');

const ensureAuthenticated = require('../middleware/ensureAuthenticated');

const IngredientsController = require('../controllers/IngredientsController');
const IngredientsImageController = require('../controllers/IngredientsImageController');

const ingredientsRoutes = Router()
const upload = multer(uploadConfig.MULTER)

const ingredientsController = new IngredientsController()
const ingredientsImageController = new IngredientsImageController()

ingredientsRoutes.use(ensureAuthenticated);

ingredientsRoutes.post('/', ingredientsController.create);
ingredientsRoutes.patch(
  '/image/:id',
  upload.single('image'),
  ingredientsImageController.update
);
ingredientsRoutes.get('/:id', ingredientsController.show);
ingredientsRoutes.get('/', ingredientsController.index);


module.exports = ingredientsRoutes
