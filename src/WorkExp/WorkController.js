import Work from './WorkModel';
import User from '../Users/UserModel';


const WorkController = {

    getWork:(req, res) => {
        Work.find({userId: req.user})
        .then(docs => res.status(200).json(docs))
        .catch(err => res.status(500).json({err: 'could not get work...lel'}))
    },
    createWork: (req, res) => {
        if('title' in req.body && 'location' in req.body && 'date' in req.body && 'text' in req.body) {
            const workBody = { title: req.body.title, location: req.body.location, date: req.body.date, text: req.body.text, userId: req.user}
            const newWork = new Work(workBody);
            newWork.save()
                .then(doc => res.status(201).json(doc))
                .catch(err => res.status(500).json({ err: 'something went wrong'}));
        } else {
            res.send('title, location, date, text and user are required')
        }
    },
    updateWork: (req, res) => {
        const { id } = req.params;
        if('title' in req.body && 'location' in req.body && 'date' in req.body && 'text' in req.body) {
            const { title, location, date, text, completed } = req.body;
            Work.findOneAndUpdate({_id: id}, {$set:{title, location, date, text, completed}})
            .then(doc => res.status(204).json(doc))
            .catch(err => res.status(500).json({ err: 'something went wrong'}));
        } else {
            res.send('title, location, date and text are required');
        }
    },
    deleteWork: (req, res) => {
        const { id } = req.params;
        Work.findByIdAndRemove(id)
        .then(doc => res.status(200).json(doc))
        .catch(err => res.status(500).json({err: 'failed to delete work'}))
    },
    getWorkById: (req, res) => {
        const { id } = req.params;
        Work.findById(id)
        .then(doc => res.status(204).json(doc))
        .catch(err => res.status(500).json({ err: "cant yo"}));
    }
}

export default WorkController;