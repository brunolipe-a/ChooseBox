require('dotenv').config();

import express from 'express';
import morgan from 'morgan';
import mongoose from 'mongoose';
import path from 'path';
import cors from 'cors';

import routes from "./routes";

mongoose.connect(
  process.env.MONGO_URL,
  {
    useNewUrlParser: true,
  }
);

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(
  '/files', 
  express.static(path.resolve(__dirname, '..', 'tmp', 'uploads'))
);

app.use(routes);

app.listen(process.env.PORT || 3000);