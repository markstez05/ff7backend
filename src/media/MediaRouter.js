const MediaController = require('./MediaController');
const Passport = require('passport');
const express = require('express');

const passportOptions = { session: false };
const checkForToken = Passport.authenticate('jwt', passportOptions);
const MediaRouter = express.Router();

const { getMedia } = MediaController;

MediaRouter.get('/:img', getMedia);

module.exports = MediaRouter;