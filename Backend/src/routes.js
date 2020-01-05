import { Router as routes} from 'express';
import multer from 'multer';
import multerConfig from './config/multer';

import BoxController from './controllers/BoxController';
import FileController from "./controllers/FileController";

routes = routes();

routes.get('/', BoxController.check);
routes.post('/boxes', BoxController.store);
routes.get('/boxes/:id', BoxController.show);
routes.delete('/boxes/:id/delete', BoxController.delete);
routes.post('/boxes/:id/file', multer(multerConfig).single('file'), FileController.store);
routes.delete('/files/:id/delete', FileController.delete);

export default routes;