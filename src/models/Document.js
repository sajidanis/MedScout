import mongoose from "mongoose";

const docSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    etag : {
        type: String,
        unique: true,  
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    }
}, {timestamps: true});

export const Document = mongoose.model('document', docSchema);