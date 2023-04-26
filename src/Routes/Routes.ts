import { Router } from 'express';
import CarController from '../Controllers/CarController';
import MotorcycleController from '../Controllers/MotorcycleController';

const routes = Router();

// Routers CARS
routes.post(
  '/cars',
  (req, res, next) => new CarController(req, res, next).create(),
);

routes.put(
  '/cars/:id',
  (req, res, next) => new CarController(req, res, next).updateById(),
);

routes.get(
  '/cars',
  (req, res, next) => new CarController(req, res, next).getAllCars(),
);

routes.get(
  '/cars/:id',
  (req, res, next) => new CarController(req, res, next).getById(),
);

// Router MOTORCYCLES
routes.post(
  '/motorcycles',
  (req, res, next) => new MotorcycleController(req, res, next).create(),
);

routes.put(
  '/motorcycles/:id',
  (req, res, next) => new MotorcycleController(req, res, next).updateById(),
);

routes.get(
  '/motorcycles',
  (req, res, next) => new MotorcycleController(req, res, next).getAllMotos(),
);

routes.get(
  '/motorcycles/:id',
  (req, res, next) => new MotorcycleController(req, res, next).getById(),
);

// routes.patch(
//   '/transfer/:id',
//   (req, res, next) => new TransferController(req, res, next).reversalRequest(),
// );

// routes.post(
//   '/key/register',
//   (req, res, next) => new KeyController(req, res, next).create(),
// );

// routes.get(
//   '/key/:value',
//   (req, res, next) => new KeyController(req, res, next).getByValue(),
// );

export default routes;