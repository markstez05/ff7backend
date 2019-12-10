const fs = require("fs");
const MEDIA = `${__dirname}`;
const Media = require('./MediaModel');

const MediaController = {
    getMedia: (req, res) => {

        const { img } = req.params;
        Media.find({ userId: req.user });
        console.log('user', req.user);
        fs.readFile(`${MEDIA}/images/${img}`, (err, data) => {
            if (err) {
                console.log(err);
            } else {
                const c = Buffer.from(data).toString("base64");
                console.log("base64", c);
                res.set("Content-Type", "image/jpg").send(data);
            }
        });
    }
};

module.exports = MediaController;