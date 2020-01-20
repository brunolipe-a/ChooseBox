import mongoose from 'mongoose';
import aws from 'aws-sdk';
import fs from 'fs';
import path from 'path';
import { promisify } from 'util';

import Box from './Box.js';

const s3 = new aws.S3();

const FileSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    path: {
        type: String,
        required: true,
    },
    url: {
        type: String,
        required: true,
    },
}, {
    timestamps: true,
});


FileSchema.pre('save', function() {
    if(!this.url) {
        this.url = `${process.env.APP_URL}/files/${this.path}`;
    }
});

FileSchema.pre('remove', async function() {
    let box = await Box.findOne({ files: { $in: this._id} }).lean().exec();

    box.files = box.files.filter(file => {
        return file.toString() !== this._id.toString();
    });

    await Box.findOneAndUpdate({ _id: box._id}, { files: box.files}).exec();

    if (process.env.STORAGE_TYPE === 's3') {
        return s3.deleteObject({
            Bucket: process.env.AWS_BUCKET,
            Key: this.path,
        }).promise();
    } else {
        return promisify(fs.unlink)(
            path.resolve(__dirname, '..', '..', 'tmp', 'uploads', this.path
            )
        );
    }

});

module.exports = mongoose.model('File', FileSchema);
