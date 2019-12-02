
const express = require('express');
const Passport = require('passport');
const multer = require('multer');
const path = require('path');
const UserController = require('./UserController');
const AuthMiddleware = require('../Middleware/Auth-Middleware');

const UserRouter = express.Router();
//Methods from user controller
const { createUser, login, logout, getUserById, getUsers, updateUser } = UserController;
//validates a users password and sends token

const { localStrategy } = AuthMiddleware;

// const storage = multer.diskStorage({
//     destination: '../media/images',
//     filename: function (req, file, cb) {
//         cb(null, file.fieldname + '-' + Date.now() + 
//         path.extname(file.originalname))
//         console.log('IMG INFO', file)
//     }
// })

//passport global middleware
Passport.use(localStrategy);
// const upload = multer({ storage: storage })
//passport local middleware
const passportOptions = { session: false };
//block login by requiring a valid password
const authenticate = Passport.authenticate('local', passportOptions);

UserRouter.get('/', getUsers);
UserRouter.put('/:id', updateUser);
UserRouter.post('/register', createUser);
UserRouter.post('/login', authenticate, login);
UserRouter.get('/logout', logout);
UserRouter.get('/:id', getUserById);

module.exports = UserRouter;
//# sourceMappingURL=UserRoutes.js.map