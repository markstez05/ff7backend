import mongoose from 'mongoose';

const WorkSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true
    },
    completed: {
        type: Boolean,
        required: true,
        default: false
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    createdAt: {
        type: Date,
        default: new Date()
    }
})

const Work = mongoose.model('Work', WorkSchema);

export default Work;