import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import UserRouter from './Users/UserRoutes';
import WorkRouter from './WorkExp/WorkRoutes';
import SkillRouter  from './Skills/SkillRoutes';
import MediaRouter from './media/MediaRouter';


const CONNECTION_URI = process.env.MONGODB_URI || 'mongodb://markstez05:cheese12@ds147003.mlab.com:47003/ff7'
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
