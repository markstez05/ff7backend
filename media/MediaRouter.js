import MediaController from './MediaController';
import Passport from 'passport';
import express from 'express';
import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
    destination: './media/images/',
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + 
        path.extname(file.originalname))
        console.log('IMG INFO', file)
    }
})

const passportOptions = { session: false };
const checkForToken = Passport.authenticate('jwt', passportOptions);
const upload = multer({ storage: storage })
const MediaRouter = express.Router();

const { getMedia, postMedia } = MediaController;

MediaRouter.get('/:img', checkForToken, getMedia);
MediaRouter.post('/', upload.single('picture'), checkForToken, postMedia);

export default MediaRouter;