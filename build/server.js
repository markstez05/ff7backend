"use strict";

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

var _cors = require("cors");

var _cors2 = _interopRequireDefault(_cors);

var _mongoose = require("mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

var _UserRoutes = require("./Users/UserRoutes");

var _UserRoutes2 = _interopRequireDefault(_UserRoutes);

var _WorkRoutes = require("./WorkExp/WorkRoutes");

var _WorkRoutes2 = _interopRequireDefault(_WorkRoutes);

var _SkillRoutes = require("./Skills/SkillRoutes");

var _SkillRoutes2 = _interopRequireDefault(_SkillRoutes);

var _MediaRouter = require("./media/MediaRouter");

var _MediaRouter2 = _interopRequireDefault(_MediaRouter);

var _config = require("./config");

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

require("babel-polyfill");
require("@babel/register");


var CONNECTION_URI = process.env.MONGODB_URI || _config2.default.SERVER_CREDENTIALS;
var app = (0, _express2.default)();
var port = process.env.PORT || 8081;

app.use(_express2.default.json());
app.use((0, _cors2.default)());
app.use('/api/media/images', _MediaRouter2.default);
app.use('/api/users', _UserRoutes2.default);
app.use('/api/work', _WorkRoutes2.default);
app.use('/api/skill', _SkillRoutes2.default);
app.get("/", function (req, res) {
	res.json({ hello: 'world' });
});
_mongoose2.default.connect(CONNECTION_URI, {
	useNewUrlParser: true }).then(function () {
	return console.log('connected to MLAB!');
}).catch(function (err) {
	return console.log(err, 'error connecting to mongodb');
});

app.listen(port, function () {
	console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});
//# sourceMappingURL=server.js.map