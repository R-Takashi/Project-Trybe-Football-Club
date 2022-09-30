import { Router } from 'express';
import LoginController from '../controllers/login.controller';
import validLogin from '../middlewares/validate.login';

const loginRouter = Router();

const loginController = new LoginController();

loginRouter.post('/', validLogin, (req, res) => loginController.login(req, res));

loginRouter.get('/validate', (req, res) => loginController.validate(req, res));

export default loginRouter;
