import express from 'express';
import { createUser, loginUser, getUser } from '../controllers/UserValidateControllers';

const userValidateRouter = express.Router();

userValidateRouter.post('/signup', createUser);
userValidateRouter.post('/login', loginUser); 
userValidateRouter.get('/user/:id', getUser);

export default userValidateRouter;