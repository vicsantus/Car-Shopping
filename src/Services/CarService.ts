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

  public async findById(id: string) {
    const carODM = new CarsODM();
    if (await carODM.findById(id)) {
      const resultCar = await carODM.findById(id);
      return this.createCarDomain(resultCar);
    }
    throw new Error('Car not found');
  }

  public async findAll() {
    const carODM = new CarsODM();
    const resultCar = await carODM.findAll();
    const carDomained = resultCar.map((car) => this.createCarDomain(car));
    return carDomained;
  }

  public async update(id: string, newCar: ICar) {
    const carODM = new CarsODM();
    if (await carODM.findById(id)) {
      const resultCar = await carODM.update(id, newCar);
      return this.createCarDomain(resultCar);
    }
    throw new Error('Car not found');
  }
}

export default CarService;