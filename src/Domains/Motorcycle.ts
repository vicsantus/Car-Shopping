import IMotorcycle from '../Interfaces/IMotorcycle';
import Vehicle from './Vehicle';

class Motorcycle extends Vehicle {
  private category: string;
  private engineCapacity: number;

  constructor(moto: IMotorcycle) {
    super(moto);
    const catList = ['Street', 'Custom', 'Trail'];
    if (catList.some((categ) => categ === moto.category)) {
      this.category = moto.category;
    } else {
      throw new Error('This category doesnt exists');
    }

    this.engineCapacity = moto.engineCapacity;
  }

  public setCategory(category: string) {
    this.category = category;
  }

  public getCategory() {
    return this.category;
  }

  public setEngineCapacity(engineCapacity: number) {
    this.engineCapacity = engineCapacity;
  }

  public getEngineCapacity() {
    return this.engineCapacity;
  }
}

export default Motorcycle;