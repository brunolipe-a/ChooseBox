import mongoose from 'mongoose';
import {promisify} from "util";
import fs from "fs";
import path from "path";
import aws from 'aws-sdk';
import uniqueValidator from 'mongoose-unique-validator';

import File from './File';

const s3 = new aws.S3();

const Box = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique : true
    },
    files: [{ type: mongoose.Schema.Types.ObjectID, ref: 'File' }],
},{
    timestamps: true,
});

Box.plugin(uniqueValidator);

Box.pre('remove', async function() {
    await File.deleteMany({_id:  this.files });

    if (process.env.STORAGE_TYPE === 's3') {
        const listParams = {
            Bucket: process.env.AWS_BUCKET,
            Prefix: this.title
        };

        const listedObjects = await s3.listObjectsV2(listParams).promise();

        if (listedObjects.Contents.length === 0) return;

        const deleteParams = {
            Bucket: process.env.AWS_BUCKET,
            Delete: { Objects: [] }
        };

        listedObjects.Contents.forEach(({ Key }) => {
            deleteParams.Delete.Objects.push({ Key });
        });

        return s3.deleteObjects(deleteParams).promise();
    } else {
        return promisify(fs.unlink)(
            path.resolve(__dirname, '..', '..', 'tmp', 'uploads', this.title
            )
        );
    }
});

export default mongoose.model('Box', Box);