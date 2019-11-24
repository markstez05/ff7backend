import mongoose from 'mongoose';

const SkillSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    desc: {
        type: String,
        required: true
    },
    level: {
        type: Number,
        required: true,
        default: 1,
        min: 1,
        max: 5
    },
    type: {
        type: String,
        required: true
    },
    // equipped: {
    //     type: Boolean,
    //     default: false
    // },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
})

const Skill = mongoose.model('Skill', SkillSchema);

export default Skill;