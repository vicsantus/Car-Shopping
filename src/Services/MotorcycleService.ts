import Motorcycle from '../Domains/Motorcycle';
import IMotorcycle from '../Interfaces/IMotorcycle';
import MotorcyclesODM from '../Models/MotorcycleODM';

class MotorcycleService {
  private createMotoDomain(moto: IMotorcycle | null): Motorcycle | null {
    if (moto) {
      return new Motorcycle({
        id: moto.id,
        model: moto.model,
        year: moto.year,
        color: moto.color,
        status: moto.status,
        buyValue: moto.buyValue,
        category: moto.category,
        engineCapacity: moto.engineCapacity,
      });
    }
    return null;
  }

  public async saveMoto(moto: IMotorcycle) {
    const motoODM = new MotorcyclesODM();
    const newMoto = await motoODM.create(moto);
    return this.createMotoDomain(newMoto);
  }

  public async findById(id: string) {
    const motoODM = new MotorcyclesODM();
    if (await motoODM.findById(id)) {
      const resultMoto = await motoODM.findById(id);
      return this.createMotoDomain(resultMoto);
    }
    throw new Error('Motorcycle not found');
  }

  public async findAll() {
    const motoODM = new MotorcyclesODM();
    const resultMoto = await motoODM.findAll();
    const motoDomained = resultMoto.map((moto) => this.createMotoDomain(moto));
    return motoDomained;
  }

  public async update(id: string, newMoto: IMotorcycle) {
    const motoODM = new MotorcyclesODM();
    if (await motoODM.findById(id)) {
      const resultMoto = await motoODM.update(id, newMoto);
      return this.createMotoDomain(resultMoto);
    }
    throw new Error('Motorcycle not found');
  }
}

export default MotorcycleService;