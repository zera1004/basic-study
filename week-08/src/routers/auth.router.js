import express from 'express';
import bcrypt from 'bcrypt';
import { signUpValidator } from '../middlewares/validators/sign-up-validator.middleware.js';
import { signInValidator } from '../middlewares/validators/sign-in-validator.middleware.js';
import AuthController from '../controllers/auth.controller.js';

const authRouter = express.Router();

authRouter.post('/sign-up', signUpValidator, AuthController.signUp);

authRouter.post('/sign-in', signInValidator, AuthController.signIn);

export { authRouter };
