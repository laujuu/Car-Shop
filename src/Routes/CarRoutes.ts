import { Router } from 'express';
import CarController from '../Controllers/CarController';

const routes = Router();

const carsRoute = '/cars/:id';

routes.post('/cars', (req, res, next) =>
  new CarController(req, res, next).create());

routes.get('/cars', (req, res, next) =>
  new CarController(req, res, next).findAll());

routes.get(carsRoute, (req, res, next) =>
  new CarController(req, res, next).findById());
  
routes.put(carsRoute, (req, res, next) =>
  new CarController(req, res, next).findByIdAndUpdate());

routes.delete(carsRoute, (req, res, next) =>
  new CarController(req, res, next).findByIdAndDelete());

export default routes;
