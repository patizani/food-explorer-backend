const { Router } = require("express");

const ensureAuthenticated = require('../middleware/ensureAuthenticated');

const usersRoutes =  Router();

const UsersController = require('../controllers/UsersController');

const usersController = new UsersController();

// usersRoutes.use(ensureAuthenticated);

usersRoutes.post('/', usersController.create);

module.exports = usersRoutes;