import { Router } from 'express';
import MotorcycleController from '../Controllers/MotorcycleController';

const routes = Router();

routes.post('/motorcycles', (req, res, next) =>
  new MotorcycleController(req, res, next).create());

routes.get('/motorcycles', (req, res, next) =>
  new MotorcycleController(req, res, next).findAll());

routes.get('/motorcycles/:id', (req, res, next) =>
  new MotorcycleController(req, res, next).findById());
  
routes.put('/motorcycles/:id', (req, res, next) =>
  new MotorcycleController(req, res, next).findByIdAndUpdate());

export default routes;
