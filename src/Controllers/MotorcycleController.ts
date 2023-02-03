import { Request, Response, NextFunction } from 'express';
import IMotorcycle from '../Interfaces/IMotorcycle';
import MotorcycleService from '../Services/MotorcycleService';

class MotorcycleController {
  private req: Request;
  private res: Response;
  private next: NextFunction;
  private service: MotorcycleService;

  constructor(req: Request, res: Response, next: NextFunction) {
    this.req = req;
    this.res = res;
    this.next = next;
    this.service = new MotorcycleService();
  }

  public async create() {
    const motorcycle: IMotorcycle = {
      ...this.req.body,
    };

    try {
      const newMotorcycle = await this.service.create(motorcycle);
      return this.res.status(201).json(newMotorcycle);
    } catch (error) {
      this.next(error);
    }
  }

  public async findAll() {
    try {
      const showMotorcycle = await this.service.findAll();
      return this.res.status(200).json(showMotorcycle);
    } catch (error) {
      this.next(error);
    }
  }

  public async findById() {
    const { id } = this.req.params;
    try {
      const showBikeById = await this.service.findById(id);
      return this.res.status(200).json(showBikeById);
    } catch (error) {
      this.next(error);
    }
  }

  public async findByIdAndUpdate() {
    const { id } = this.req.params;
    const motorcycle = this.req.body;
    try {
      await this.service.findByIdAndUpdate(id, motorcycle);

      const showBikeById = await this.service.findById(id);

      return this.res.status(200).json(showBikeById);
    } catch (error) {
      this.next(error);
    }
  }

  public async findByIdAndDelete() {
    const { id } = this.req.params;
    try {
      await this.service.findByIdAndDelete(id);

      return this.res.status(200).end();
    } catch (error) {
      this.next(error);
    }
  }
}

export default MotorcycleController;
