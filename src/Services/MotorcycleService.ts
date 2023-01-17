import Motorcycle from '../Domains/Motorcycle';
import HttpException from '../exceptions/HttpException';
import IMotorcycle from '../Interfaces/IMotorcycle';
import MotorcycleODM from '../Models/MotorcycleODM';

class MotorcycleService {
  private createMotorcycleDomain(motorcycle: IMotorcycle | null): Motorcycle | null {
    if (motorcycle) {
      return new Motorcycle(motorcycle);
    }
    return null;
  }

  async create(motorcycle: IMotorcycle) {
    const motorcycleODM = new MotorcycleODM();
    const newCar = await motorcycleODM.create(motorcycle);
    return this.createMotorcycleDomain(newCar);
  }

  async findAll() {
    const motorcycleODM = new MotorcycleODM();
    const showMotorcycle = await motorcycleODM.findAll();
    return showMotorcycle.map((motorcycle) => this.createMotorcycleDomain(motorcycle));
  }

  async findById(id: string) {
    const motorcycleODM = new MotorcycleODM();
    const showBikeById = await motorcycleODM.findById(id);

    if (!showBikeById) throw new HttpException(404, 'Motorcycle not found');
    return this.createMotorcycleDomain(showBikeById);
  }

  async findByIdAndUpdate(id: string, motorcycle: IMotorcycle) {
    const motorcycleODM = new MotorcycleODM();
    const motorcycleUpdate = await motorcycleODM.update(id, motorcycle);

    if (!motorcycleUpdate) throw new HttpException(404, 'Motorcycle not found');
    return this.createMotorcycleDomain(motorcycleUpdate);
  }
}

export default MotorcycleService;
