import { NextFunction, Request, Response } from 'express';
import ICar from '../Interfaces/ICar';
import CarService from '../Services/CarService';
// import PaymentStatus from '../utils/PaymentStatus';

class CarController {
  private req: Request;
  private res: Response;
  private next: NextFunction;
  private service: CarService;

  constructor(req: Request, res: Response, next: NextFunction) {
    this.req = req;
    this.res = res;
    this.next = next;
    this.service = new CarService();
  }

  public async create() {
    const car: ICar = {
      model: this.req.body.model,
      year: this.req.body.year,
      color: this.req.body.color,
      status: this.req.body.status,
      buyValue: this.req.body.buyValue,
      doorsQty: this.req.body.doorsQty,
      seatsQty: this.req.body.seatsQty,
    };

    try {
      const newCar = await this.service.saveCar(car);
      return this.res.status(201).json(newCar);
    } catch (error) {
      this.next(error);
    }
  }

  public async getById() {
    const { id } = this.req.params;
    try {
      const car = await this.service.findById(id);
      return this.res.status(200).json(car);
    } catch (e) {
      this.next(e);
    }
  }

  public async getAllCars() {
    try {
      const car = await this.service.findAll();
      return this.res.status(200).json(car);
    } catch (e) {
      this.next(e);
    }
  }

  public async updateById() {
    const car: ICar = {
      model: this.req.body.model,
      year: this.req.body.year,
      color: this.req.body.color,
      status: this.req.body.status,
      buyValue: this.req.body.buyValue,
      doorsQty: this.req.body.doorsQty,
      seatsQty: this.req.body.seatsQty,
    };
    const { id } = this.req.params;

    try {
      const newCar = await this.service.update(id, car);
      return this.res.status(200).json(newCar);
    } catch (e) {
      this.next(e);
    }
  }

  // public async reversalRequest() {
  //   const payment: ICar = {
  //     ...this.req.body,
  //     status: PaymentStatus.reversed,
  //   };
  //   const { id } = this.req.params;
  //   try {
  //     await this.service.undoTransfer(id, payment);
  //     return this.res.status(204).json({});
  //   } catch (error) {
  //     this.next(error);
  //   }
  // }
}

export default CarController;