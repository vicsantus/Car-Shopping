import { NextFunction, Request, Response } from 'express';
import IMotorcycle from '../Interfaces/IMotorcycle';
import MotorcycleService from '../Services/MotorcycleService';
// import PaymentStatus from '../utils/PaymentStatus';

class MotorcycleController {
  private req: Request;
  private res: Response;
  private next: NextFunction;
  private service: MotorcycleService;

  constructor(req: Request, res: Response, next: NextFunction) {
    this.req = req;
    this.res = res;
    this.next = next;
    this.service = new MotorcycleService();
  }

  public async create() {
    const moto: IMotorcycle = {
      model: this.req.body.model,
      year: this.req.body.year,
      color: this.req.body.color,
      status: this.req.body.status,
      buyValue: this.req.body.buyValue,
      category: this.req.body.category,
      engineCapacity: this.req.body.engineCapacity,
    };

    try {
      const newMoto = await this.service.saveMoto(moto);
      return this.res.status(201).json(newMoto);
    } catch (error) {
      this.next(error);
    }
  }

  public async getById() {
    const { id } = this.req.params;
    try {
      const moto = await this.service.findById(id);
      return this.res.status(200).json(moto);
    } catch (e) {
      this.next(e);
    }
  }

  public async getAllMotos() {
    try {
      const moto = await this.service.findAll();
      return this.res.status(200).json(moto);
    } catch (e) {
      this.next(e);
    }
  }

  public async updateById() {
    const moto: IMotorcycle = {
      model: this.req.body.model,
      year: this.req.body.year,
      color: this.req.body.color,
      status: this.req.body.status,
      buyValue: this.req.body.buyValue,
      category: this.req.body.category,
      engineCapacity: this.req.body.engineCapacity,
    };
    const { id } = this.req.params;

    try {
      const newMoto = await this.service.update(id, moto);
      return this.res.status(200).json(newMoto);
    } catch (e) {
      this.next(e);
    }
  }

  // public async reversalRequest() {
  //   const payment: IMoto = {
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

export default MotorcycleController;