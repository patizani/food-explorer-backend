const { Router } = require('express')
const multer = require('multer')
const uploadConfig = require('../configs/upload')

const ensureAuthenticated = require('../middleware/ensureAuthenticated')
const ensureIsAdmin = require('../middleware/ensureIsAdmin')

const ProductsController = require('../controllers/ProductsController')
const ProductsImageController = require('../controllers/ProductsImageController')

const productsRoutes = Router()
const upload = multer(uploadConfig.MULTER)

const productsController = new ProductsController()
const productsImageController = new ProductsImageController()

productsRoutes.use(ensureAuthenticated)

productsRoutes.post('/', upload.single('image'), productsController.create)
productsRoutes.patch(
  '/image/:id',
  upload.single('image'),
  productsImageController.update
)
productsRoutes.get('/', productsController.index)
productsRoutes.get('/:id', productsController.show)

productsRoutes.put("/:id", ensureIsAdmin, upload.single("image"),
 productsController.update);
productsRoutes.delete("/:id", ensureIsAdmin, productsController.delete);
module.exports = productsRoutes
