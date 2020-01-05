require('dotenv').config();

import express from 'express';
import morgan from 'morgan';
import mongoose from 'mongoose';
import path from 'path';
import cors from 'cors';
import server from 'http';
import io from 'socket.io';

const app = express();
server = server.Server(app);
io = io(server);

io.on('connection', socket => {
    socket.on('connectRoom', box => {
        socket.join(box);
    });
});

mongoose.connect(
  process.env.MONGO_URL,
  {
    useNewUrlParser: true,
  }
);

app.use((req, res, next) => {
    req.io = io;

    return next();
});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(
  '/files', 
  express.static(path.resolve(__dirname, '..', 'tmp', 'uploads'))
);

import routes from "./routes";
app.use(routes);

server.listen(process.env.PORT || 3000);