import { Model, Schema, model, models, isValidObjectId, UpdateQuery } from 'mongoose';
import HttpException from '../exceptions/HttpException';

const invalidObjectIdMsg = 'Invalid mongo id';

abstract class AbstractODM<T> {
  private schema: Schema<T>;
  private _model: Model<T>;
  private modelName: string;

  constructor(schema: Schema<T>, modelName: string) {
    this.schema = schema;
    this.modelName = modelName;
    this._model = models[this.modelName] || model(this.modelName, this.schema);
  }

  protected get model(): Model<T> {
    return this._model;
  }

  public async create(obj: T): Promise<T> {
    return this._model.create({ ...obj });
  }

  public async findAll(): Promise<T[]> {
    return this._model.find();
  }

  public async findById(id: string): Promise<T | null> {
    if (!isValidObjectId(id)) throw new HttpException(422, invalidObjectIdMsg);
    return this.model.findOne({ _id: id });
  }

  public async update(_id: string, obj: T): Promise<T | null> {
    if (!isValidObjectId(_id)) throw new HttpException(422, invalidObjectIdMsg);
    return this._model.findByIdAndUpdate(
      { _id },
      { ...obj } as UpdateQuery<T>,
    );
  }

  public async delete(_id: string): Promise<T | null> {
    if (!isValidObjectId(_id)) throw new HttpException(422, invalidObjectIdMsg);
    return this._model.findByIdAndDelete(_id);
  }
}

export default AbstractODM;