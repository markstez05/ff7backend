const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const UserRouter = require('./Users/UserRoutes');
const WorkRouter = require('./WorkExp/WorkRoutes');
const SkillRouter  = require('./Skills/SkillRoutes');
const MediaRouter = require('./media/MediaRouter');
const Config = require('./config');


const CONNECTION_URI = process.env.MONGODB_URI || Config.SERVER_CREDENTIALS;
const app = express();
const port = process.env.PORT || 8081;

app.use(express.json());
app.use(cors());
app.use('/api/media/images', MediaRouter )
app.use('/api/users', UserRouter);
app.use('/api/work', WorkRouter);
app.use('/api/skill', SkillRouter);
app.get("/", (req, res) => {
    res.json({hello: 'world'});
});
mongoose.connect(
	CONNECTION_URI,
	{
 	 useNewUrlParser: true })
	.then(() => console.log('connected to MLAB!'))
	.catch(err => console.log(err,'error connecting to mongodb'))

app.listen(port , function(){
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});
