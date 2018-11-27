import express from 'express';
import Passport from 'passport';
import UserController from './UserController';
import AuthMiddleware from '../Middleware/Auth-Middleware';

const UserRouter = express.Router();
//Methods from user controller
const { createUser, login, logout, getUserById } = UserController;
//validates a users password and sends token
const { localStrategy } = AuthMiddleware;

//passport global middleware
Passport.use(localStrategy);

//passport local middleware
const passportOptions = { session: false };
//block login by requiring a valid password
const authenticate = Passport.authenticate('local', passportOptions);

UserRouter.post('/register', createUser);
UserRouter.post('/login', authenticate, login);
UserRouter.get('/logout', logout);
UserRouter.get('/:id', getUserById)

export default UserRouter;