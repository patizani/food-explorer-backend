const { Router } = require("express");

const OrdersController = require("../controllers/OrdersController");
const ensureAuthenticated = require("../middleware/ensureAuthenticated");
const ensureIsAdmin = require("../middleware/ensureIsAdmin");

const ordersRoutes = Router();

const ordersController = new OrdersController();

ordersRoutes.use(ensureAuthenticated);

ordersRoutes.post("/", ordersController.create);
ordersRoutes.get("/",ensureIsAdmin, ordersController.index);
ordersRoutes.get("/:id", ordersController.show);
ordersRoutes.delete("/:id", ordersController.delete);
ordersRoutes.put("/", ordersController.update);

module.exports = ordersRoutes;