import { isValidObjectId } from 'mongoose';
import Car from '../Domains/Car';
import HttpException from '../exceptions/HttpException';
import ICar from '../Interfaces/ICar';
import CarODM from '../Models/CarODM';

class CarService {
  private createCarDomain(car: ICar | null): Car | null {
    if (car) {
      return new Car(car);
    }
    return null;
  }

  async create(car: ICar) {
    const carODM = new CarODM();
    const newCar = await carODM.create(car);
    return this.createCarDomain(newCar);
  }

  async findAll() {
    const carODM = new CarODM();
    const showCars = await carODM.findAll();
    return showCars.map((car) => this.createCarDomain(car));
  }

  async findById(id: string) {
    if (!isValidObjectId(id)) throw new HttpException(422, 'Invalid mongo id');

    const carODM = new CarODM();
    const showCarById = await carODM.findById(id);
    
    if (!showCarById) throw new HttpException(404, 'Car not found');
    return this.createCarDomain(showCarById);
  }
}

export default CarService;