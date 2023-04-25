import { Router } from 'express';
import CarController from '../Controllers/CarController';
// import KeyController from '../Controllers/KeyController';

const routes = Router();

routes.post(
  '/cars',
  (req, res, next) => new CarController(req, res, next).create(),
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