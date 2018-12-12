import MediaController from './MediaController';
import express from 'express';

const MediaRouter = express.Router();

const { getMedia } = MediaController;

MediaRouter.get('/:img', getMedia);

export default MediaRouter;