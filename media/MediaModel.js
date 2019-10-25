import mongoose from 'mongoose';

const MediaSchema = new mongoose.Schema({
    filename: {
        type: String,
        required: true
      },
      originalname: {
        type: String,
        required: true
      },
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    }, {timestamps: true})

const Media = mongoose.model('Media', MediaSchema);

export default Media;

