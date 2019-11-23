import express from 'express';
import Passport from 'passport';
import WorkController from './WorkController';
import AuthMiddleware from '../Middleware/Auth-Middleware';

const WorkRouter = express.Router();
// Methods from work controller
const { getWork, createWork, updateWork, deleteWork, getWorkById } = WorkController;
// JWT strat for securing user work
const { jwtStrategy } = AuthMiddleware;

//passport global middleware
Passport.use(jwtStrategy);
//passport local middleware
const passportOptions = { session: false };
//require JWT strat for accessing work
const checkForToken = Passport.authenticate('jwt', passportOptions);

WorkRouter.get('/', checkForToken, getWork);
WorkRouter.post('/', checkForToken, createWork);
WorkRouter.put('/:id', updateWork);
WorkRouter.delete('/:id', deleteWork);
WorkRouter.get('/:id', getWorkById);

export default WorkRouter;