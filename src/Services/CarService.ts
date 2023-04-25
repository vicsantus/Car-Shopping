import Car from '../Domains/Car';
import ICar from '../Interfaces/ICar';
import CarsODM from '../Models/CarsODM';

class CarService {
  private createCarDomain(car: ICar | null): Car | null {
    if (car) {
      return new Car({
        id: car.id,
        model: car.model,
        year: car.year,
        color: car.color,
        status: car.status,
        buyValue: car.buyValue,
        doorsQty: car.doorsQty,
        seatsQty: car.seatsQty,
      });
    }
    return null;
  }

  public async saveCar(car: ICar) {
    const carODM = new CarsODM();
    const newCar = await carODM.create(car);
    return this.createCarDomain(newCar);
  }

  // public async transfer(payment: ICar) {
  //   // const keyService = new KeyService();
  //   if (await keyService.getByValue(payment.key)) {
  //     const paymentODM = new CarsODM();
  //     const newPayment = await paymentODM.create(payment);
  //     return this.createPaymentDomain(newPayment);
  //   }
  //   throw new Error('Key not found');
  // }

  // public async undoTransfer(id: string, payment: ICar) {
  //   // const keyService = new KeyService();
  //   if (await keyService.getByValue(payment.key)) {
  //     const paymentODM = new CarsODM();
  //     return paymentODM.update(id, payment);
  //   }
  //   throw new Error('Key not found');
  // }
}

export default CarService;