const { Router } = require("express");

const usersRouter = require("./users.routes");
const sessionsRouter = require("./sessions.routes");
const ingredientsRouter = require("./ingredients.routes");
const productsRouter = require("./products.routes");
const ordersRouter = require("./orders.routes");

const routes = Router();

routes.use("/users", usersRouter);
routes.use("/sessions", sessionsRouter);
routes.use("/ingredients", ingredientsRouter);
routes.use("/products", productsRouter);
routes.use("/orders", ordersRouter);


module.exports = routes;