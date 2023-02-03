import Car from '../Domains/Car';
import HttpException from '../exceptions/HttpException';
import ICar from '../Interfaces/ICar';
import CarODM from '../Models/CarODM';

const notFound = 'Car not found';

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
    const carODM = new CarODM();
    const showCarById = await carODM.findById(id);
    
    if (!showCarById) throw new HttpException(404, notFound);
    return this.createCarDomain(showCarById);
  }

  async findByIdAndUpdate(id: string, car: ICar) {
    const carODM = new CarODM();
    const carUpdate = await carODM.update(id, car);

    if (!carUpdate) throw new HttpException(404, notFound);
    return this.createCarDomain(carUpdate);
  }

  async findByIdAndDelete(id: string) {
    const carODM = new CarODM();
    const carDelete = await carODM.delete(id);

    if (!carDelete) throw new HttpException(404, notFound);
    return this.createCarDomain(carDelete);
  }
}

export default CarService;