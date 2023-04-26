import { expect } from 'chai';
import { Model } from 'mongoose';
import sinon from 'sinon';
import Motorcycle from '../../../src/Domains/Motorcycle';
import IMotorcycle from '../../../src/Interfaces/IMotorcycle';
import MotorcycleService from '../../../src/Services/MotorcycleService';

const INVALID_MONGO_ID = 'Invalid mongo id';
const MOTORCYCLE_NOT_FOUND = 'Motorcycle not found';

const motoInput: IMotorcycle = {
  model: 'Marea',
  year: 2002,
  color: 'Black',
  status: true,
  buyValue: 15.990,
  category: 'Street',
  engineCapacity: 5,
};

describe('Deveria validar a rota motorcycle', function () {
  it('Criando uma moto com SUCESSO', async function () {
    const motoOutput: Motorcycle = new Motorcycle({
      id: '64484c4f3a1ed52ac6a52704',
      model: 'Marea',
      year: 2002,
      color: 'Black',
      status: true,
      buyValue: 15.990,
      category: 'Street',
      engineCapacity: 5,
    });
    sinon.stub(Model, 'create').resolves(motoOutput);

    const service = new MotorcycleService();
    const result = await service.saveMoto(motoInput);

    expect(result).to.be.deep.equal(motoOutput);
    expect(motoInput.model).to.be.equal(motoOutput.getModel());
    expect(motoInput.color).to.be.equal(motoOutput.getColor());
    expect(motoInput.year).to.be.equal(motoOutput.getYear());
    expect(motoInput.category).to.be.equal(motoOutput.getCategory());
  });

  it('Pegando uma lista de motos com SUCESSO', async function () {
    const motoOutput: Motorcycle = new Motorcycle({
      id: '64484c4f3a1ed52ac6a52704',
      model: 'Marea',
      year: 2002,
      color: 'Black',
      status: true,
      buyValue: 15.990,
      category: 'Street',
      engineCapacity: 5,
    });
    sinon.stub(Model, 'find').resolves([motoOutput]);

    const service = new MotorcycleService();
    const result = await service.findAll();

    expect(result).to.be.deep.equal([motoOutput]);
  });

  it('Pegando uma moto com SUCESSO', async function () {
    const idMoto = '64484c4f3a1ed52ac6a52704';
    const motoOutput: Motorcycle = new Motorcycle({
      id: idMoto,
      model: 'Marea',
      year: 2002,
      color: 'Black',
      status: true,
      buyValue: 15.990,
      category: 'Street',
      engineCapacity: 5,
    });
    sinon.stub(Model, 'findById').resolves(motoOutput);

    const service = new MotorcycleService();
    const result = await service.findById(idMoto);

    expect(result).to.be.deep.equal(motoOutput);
  });

  it('Pegando uma moto com id inválida', async function () {
    const idMotoInvalida = '64484c4f3a1ed52ac6a5270';
    sinon.stub(Model, 'findById').resolves({});

    try {
      const service = new MotorcycleService();
      await service.findById(idMotoInvalida);
    } catch (error) {
      expect((error as Error).message).to.be.equal(INVALID_MONGO_ID);
    }
  });

  it('Pegando uma moto com id não existente no banco de dados', async function () {
    const idMoto = '64484c4f3a1ed52ac6a52704';
    sinon.stub(Model, 'findById').resolves(null);

    try {
      const service = new MotorcycleService();
      await service.findById(idMoto);
    } catch (error) {
      expect((error as Error).message).to.be.equal(MOTORCYCLE_NOT_FOUND);
    }
  });

  it('Não substituindo uma moto com id inválida', async function () {
    const idMotoInvalida = '64484c4f3a1ed52ac6a5270';
    sinon.stub(Model, 'findByIdAndUpdate').resolves({});

    try {
      const service = new MotorcycleService();
      await service.update(idMotoInvalida, motoInput);
    } catch (error) {
      expect((error as Error).message).to.be.equal(INVALID_MONGO_ID);
    }
  });

  it('Não substituindo uma moto com id que não existe no banco de dados', async function () {
    const idMoto = '64484c4f3a1ed52ac6a52704';
    sinon.stub(Model, 'findById').resolves(null);
    sinon.stub(Model, 'findByIdAndUpdate').resolves(null);

    try {
      const service = new MotorcycleService();
      await service.update(idMoto, motoInput);
    } catch (error) {
      expect((error as Error).message).to.be.equal(MOTORCYCLE_NOT_FOUND);
    }
  });

  it('Substituindo uma moto com SUCESSO', async function () {
    const idMoto = '64484c4f3a1ed52ac6a52704';
    const motoOutput: Motorcycle = new Motorcycle({
      id: idMoto,
      model: 'Marea',
      year: 2002,
      color: 'Black',
      status: true,
      buyValue: 15.990,
      category: 'Street',
      engineCapacity: 5,
    });
    sinon.stub(Model, 'findById').resolves(motoOutput);
    sinon.stub(Model, 'findByIdAndUpdate').resolves(motoOutput);

    const service = new MotorcycleService();
    const resultMoto = await service.update(idMoto, motoInput);
    expect(resultMoto).to.be.deep.equal(motoOutput);
  });
  
  afterEach(function () {
    sinon.restore();
  });
});