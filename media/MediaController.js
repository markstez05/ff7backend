const fs = require("fs");
const MEDIA = `${__dirname}`;

import Media from './MediaModel';

const MediaController = {
    getMedia:(req, res) => {
        // const  picture = req.file.path,
        // const {userId} = req.params;
        const {img} = req.params;
        Media.find({userId: req.user})
        console.log('user', req.user)
        console.log('path', req.file.path)
        fs.readFile(`${MEDIA}/images/${img}`, (err, data) => {
            if (err) {
                console.log(err);
            } else {
                const c = Buffer.from(data).toString("base64")
                console.log("base64", c)
                res.set("Content-Type", "image/jpg").send(data)
            }
        });
    },
    postMedia: (req, res) => {
            console.log('file', req.file)
            const newPhoto = new Media({
            userId: req.user,
            picture: req.file,
        });
            newPhoto.save()
                .then(doc => res.status(201).json(doc))
                .catch(err => res.status(405).json({ err: 'something went wrong'}));
        }
}

export default MediaController;