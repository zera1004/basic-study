import express from 'express';
import { requireAccessToken } from '../middlewares/require-access-token.middleware.js';
import UserController from '../controllers/users.controller.js';

const usersRouter = express.Router();

usersRouter.get('/me', requireAccessToken, UserController.me);

export { usersRouter };
