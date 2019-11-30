
import express from 'express';
import Passport from 'passport';
import multer from 'multer';
import path from 'path';
import UserController from './UserController';
import AuthMiddleware from '../Middleware/Auth-Middleware';

const UserRouter = express.Router();
//Methods from user controller
const { createUser, login, logout, getUserById, getUsers, updateUser } = UserController;
//validates a users password and sends token

const { localStrategy } = AuthMiddleware;

const storage = multer.diskStorage({
    destination: './media/images/',
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + 
        path.extname(file.originalname))
        console.log('IMG INFO', file)
    }
})

//passport global middleware
Passport.use(localStrategy);
const upload = multer({ storage: storage })
//passport local middleware
const passportOptions = { session: false };
//block login by requiring a valid password
const authenticate = Passport.authenticate('local', passportOptions);

UserRouter.get('/', getUsers);
UserRouter.put('/:id', upload.single('picture'), updateUser);
UserRouter.post('/register', createUser);
UserRouter.post('/login', authenticate, login);
UserRouter.get('/logout', logout);
UserRouter.get('/:id', getUserById)


export default UserRouter;