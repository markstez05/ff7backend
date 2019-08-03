import express from 'express';
import mongoose from 'mongoose';
import Passport from 'passport';
import UserController from './UserController';
import AuthMiddleware from '../Middleware/Auth-Middleware';
import multer from 'multer';

const upload = multer({dest: 'media/images/'})
const storage = multer.diskStorage({
    destination: function(cb){
        cb(null, './media/images/');
    },
    filename: function(file, cb){
        cb(null, new Date().toISOString() + file.originalname);
    }
})

const UserRouter = express.Router();
//Methods from user controller
const { createUser, login, logout, getUserById, getUsers, updateUser } = UserController;
//validates a users password and sends token
const { localStrategy } = AuthMiddleware;

//passport global middleware
Passport.use(localStrategy);

//passport local middleware
const passportOptions = { session: false };
//block login by requiring a valid password
const authenticate = Passport.authenticate('local', passportOptions);

UserRouter.get('/', getUsers);
UserRouter.put('/:id', upload.single('picture'), updateUser);
UserRouter.post('/register', upload.single('picture'), createUser);
UserRouter.post('/login', authenticate, login);
UserRouter.get('/logout', logout);
UserRouter.get('/:id', getUserById)


export default UserRouter;