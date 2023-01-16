import { expect } from 'chai';
import sinon from 'sinon';
import { Model } from 'mongoose';
import ICar from '../../../src/Interfaces/ICar';
import Car from '../../../src/Domains/Car';
import CarService from '../../../src/Services/CarService';

const carInput: ICar = {
  model: 'Marea',
  year: 2002,
  color: 'Black',
  status: true,
  buyValue: 15.99,
  doorsQty: 4,
  seatsQty: 5,
};

const carOutput: Car = new Car({
  id: '63c5a2d9ea4c9d90f33cc1f0',
  model: 'Marea',
  year: 2002,
  color: 'Black',
  status: true,
  buyValue: 15.99,
  doorsQty: 4,
  seatsQty: 5,
});

describe('Deve manipular um carro com sucesso', function () {
  it('Verifica se é possível criar um carro com sucesso', async function () {
    sinon.stub(Model, 'create').resolves(carOutput);

    const service = new CarService();
    const result = await service.create(carInput);

    expect(result).to.be.deep.equal(carOutput);
  });

  it('Verifica se é possível acessar todos os carros com sucesso', async function () {
    sinon.stub(Model, 'find').resolves([carOutput]);

    const service = new CarService();
    const result = await service.findAll();

    expect(result).to.be.deep.equal([carOutput]);
  });

  it('Verifica se é possível acessar um carro pelo seu id com sucesso', async function () {
    sinon.stub(Model, 'findOne').resolves(carOutput);

    const service = new CarService();
    const result = await service.findById('63c5a2d9ea4c9d90f33cc1f0');

    expect(result).to.be.deep.equal(carOutput);
  });
});
