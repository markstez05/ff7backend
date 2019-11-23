import MediaController from './MediaController';
import Passport from 'passport';
import express from 'express';

const passportOptions = { session: false };
const checkForToken = Passport.authenticate('jwt', passportOptions);
const MediaRouter = express.Router();

const { getMedia } = MediaController;

MediaRouter.get('/:img', getMedia);

export default MediaRouter;