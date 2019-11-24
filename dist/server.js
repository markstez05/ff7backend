'use strict';

var express = require('express');
var cors = require('cors');
var mongoose = require('mongoose');
var UserRouter = require('./Users/UserRoutes');
var WorkRouter = require('./WorkExp/WorkRoutes');
var SkillRouter = require('./Skills/SkillRoutes');
var MediaRouter = require('./media/MediaRouter');
var Config = require('./config');

var CONNECTION_URI = process.env.MONGODB_URI || Config.SERVER_CREDENTIALS;
var app = express();
var port = process.env.PORT || 8081;

app.use(express.json());
app.use(cors());
app.use('/api/media/images', MediaRouter);
app.use('/api/users', UserRouter);
app.use('/api/work', WorkRouter);
app.use('/api/skill', SkillRouter);
app.get("/", function (req, res) {
	res.json({ hello: 'world' });
});
mongoose.connect(CONNECTION_URI, {
	useNewUrlParser: true }).then(function () {
	return console.log('connected to MLAB!');
}).catch(function (err) {
	return console.log(err, 'error connecting to mongodb');
});

app.listen(port, function () {
	console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});