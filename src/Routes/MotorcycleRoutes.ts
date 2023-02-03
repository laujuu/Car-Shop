import { Router } from 'express';
import MotorcycleController from '../Controllers/MotorcycleController';

const routes = Router();

const motorcyclesRoute = '/motorcycles/:id';

routes.post('/motorcycles', (req, res, next) =>
  new MotorcycleController(req, res, next).create());

routes.get('/motorcycles', (req, res, next) =>
  new MotorcycleController(req, res, next).findAll());

routes.get(motorcyclesRoute, (req, res, next) =>
  new MotorcycleController(req, res, next).findById());
  
routes.put(motorcyclesRoute, (req, res, next) =>
  new MotorcycleController(req, res, next).findByIdAndUpdate());

routes.delete(motorcyclesRoute, (req, res, next) =>
  new MotorcycleController(req, res, next).findByIdAndDelete());

export default routes;
