import Skill from './SkillModel';

const SkillController = {

    getSkill:(req, res) => {
        Skill.find({userId: req.user})
        .then(docs => res.status(200).json(docs))
        .catch(err => res.status(500).json({err: 'could not get Skills...lel'}))
    },
    createSkill: (req, res) => {
        if('title' in req.body && 'desc' in req.body && 'level' in req.body && 'type' in req.body ) {
            const skillBody = { title: req.body.title, desc: req.body.desc, level: req.body.level, type: req.body.type, userId: req.user}
            const newSkill = new Skill(skillBody);
            newSkill.save()
                .then(doc => res.status(201).json(doc))
                .catch(err => res.status(500).json({ err: 'something went wrong'}));
        } else {
            res.send('title, desc, level, type and equipped are required')
        }
    },
    updateSkill: (req, res) => {
        const { id } = req.params;
        if('title' in req.body && 'desc' in req.body && 'level' in req.body && 'type' in req.body) {
            const { title, desc, level, type } = req.body;
            Skill.findOneAndUpdate({_id: id}, {$set:{title, desc, level, type}})
            .then(doc => res.status(200).json(doc))
            .catch(err => res.status(500).json({ err: 'something went wrong'}));
        } else {
            res.send('title, desc, level and type are required');
        }
    },
    deleteSkill: (req, res) => {
        const { id } = req.params;
        Skill.findByIdAndRemove(id)
        .then(doc => res.status(200).json(doc))
        .catch(err => res.status(500).json({err: 'failed to delete work'}))
    },
    getSkillById: (req, res) => {
        const { id } = req.params;
        Skill.findById(id)
        .then(doc => res.status(201).json(doc))
        .catch(err => res.status(500).json({ err: "cant yo"}));
    }
}

export default SkillController;