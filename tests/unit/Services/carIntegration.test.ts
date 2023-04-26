import { expect } from 'chai';
import { Model } from 'mongoose';
import sinon from 'sinon';
import Car from '../../../src/Domains/Car';
import ICar from '../../../src/Interfaces/ICar';
import CarService from '../../../src/Services/CarService';

const carInput: ICar = {
  model: 'Marea',
  year: 2002,
  color: 'Black',
  status: true,
  buyValue: 15.990,
  doorsQty: 4,
  seatsQty: 5,
};
const INVALID_MONGO_ID = 'Invalid mongo id';
const CAR_NOT_FOUND = 'Car not found';

describe('Deveria validar a rota cars', function () {
  it('Criando um car com SUCESSO', async function () {
    const carOutput: Car = new Car({
      id: '64484c4f3a1ed52ac6a52704',
      model: 'Marea',
      year: 2002,
      color: 'Black',
      status: true,
      buyValue: 15.990,
      doorsQty: 4,
      seatsQty: 5,
    });
    sinon.stub(Model, 'create').resolves(carOutput);

    const service = new CarService();
    const result = await service.saveCar(carInput);

    expect(result).to.be.deep.equal(carOutput);
    expect(carInput.model).to.be.equal(carOutput.getModel());
    expect(carInput.color).to.be.equal(carOutput.getColor());
    expect(carInput.year).to.be.equal(carOutput.getYear());
    expect(carInput.doorsQty).to.be.equal(carOutput.getDoorsQty());
  });

  it('Pegando uma lista de carros com SUCESSO', async function () {
    const carOutput: Car = new Car({
      id: '64484c4f3a1ed52ac6a52704',
      model: 'Marea',
      year: 2002,
      color: 'Black',
      status: true,
      buyValue: 15.990,
      doorsQty: 4,
      seatsQty: 5,
    });
    sinon.stub(Model, 'find').resolves([carOutput]);

    const service = new CarService();
    const result = await service.findAll();

    expect(result).to.be.deep.equal([carOutput]);
  });

  it('Pegando um carro com SUCESSO', async function () {
    const idCar = '64484c4f3a1ed52ac6a52704';
    const carOutput: Car = new Car({
      id: idCar,
      model: 'Marea',
      year: 2002,
      color: 'Black',
      status: true,
      buyValue: 15.990,
      doorsQty: 4,
      seatsQty: 5,
    });
    sinon.stub(Model, 'findById').resolves(carOutput);

    const service = new CarService();
    const result = await service.findById(idCar);

    expect(result).to.be.deep.equal(carOutput);
  });

  it('Pegando um carro com id inválida', async function () {
    const idCarInvalida = '64484c4f3a1ed52ac6a5270';
    sinon.stub(Model, 'findById').resolves({});

    try {
      const service = new CarService();
      await service.findById(idCarInvalida);
    } catch (error) {
      expect((error as Error).message).to.be.equal(INVALID_MONGO_ID);
    }
  });

  it('Pegando um carro com id não existente no banco de dados', async function () {
    const idCar = '64484c4f3a1ed52ac6a52704';
    sinon.stub(Model, 'findById').resolves(null);

    try {
      const service = new CarService();
      await service.findById(idCar);
    } catch (error) {
      expect((error as Error).message).to.be.equal(CAR_NOT_FOUND);
    }
  });

  it('Não substituindo um car com id inválida', async function () {
    const idCarInvalida = '64484c4f3a1ed52ac6a5270';
    sinon.stub(Model, 'findByIdAndUpdate').resolves({});

    try {
      const service = new CarService();
      await service.update(idCarInvalida, carInput);
    } catch (error) {
      expect((error as Error).message).to.be.equal(INVALID_MONGO_ID);
    }
  });

  it('Não substituindo um car com id que não existe no banco de dados', async function () {
    const idCar = '64484c4f3a1ed52ac6a52704';
    sinon.stub(Model, 'findById').resolves(null);
    sinon.stub(Model, 'findByIdAndUpdate').resolves(null);

    try {
      const service = new CarService();
      await service.update(idCar, carInput);
    } catch (error) {
      expect((error as Error).message).to.be.equal(CAR_NOT_FOUND);
    }
  });

  it('Substituindo um car com SUCESSO', async function () {
    const idCar = '64484c4f3a1ed52ac6a52704';
    const carOutput: Car = new Car({
      id: idCar,
      model: 'Marea',
      year: 2002,
      color: 'Black',
      status: true,
      buyValue: 15.990,
      doorsQty: 4,
      seatsQty: 5,
    });
    sinon.stub(Model, 'findById').resolves({ id: idCar, ...carInput });
    sinon.stub(Model, 'findByIdAndUpdate').resolves(carOutput);

    const service = new CarService();
    const result = await service.update(idCar, carInput);
    expect(result).to.be.deep.equal(carOutput);
  });
  
  afterEach(function () {
    sinon.restore();
  });
});