import {
  HydratedDocument,
  Model,
  Schema,
  // UpdateQuery,
  isValidObjectId,
  model,
  models,
} from 'mongoose';

abstract class AbstractODM<T> {
  protected model: Model<T>;
  protected schema: Schema;
  protected modelName: string;

  constructor(schema: Schema, modelName: string) {
    this.schema = schema;
    this.modelName = modelName;
    this.model = models[this.modelName] || model(this.modelName, this.schema);
  }

  public async create(obj: T): Promise<T> {
    return this.model.create({ ...obj });
  }

  public async findById(_id: string): Promise<HydratedDocument<T> | null> {
    if (!isValidObjectId(_id)) throw Error('Invalid mongo id');
    return this.model.findById({ _id });
  }

  public async findAll(): Promise<HydratedDocument<T>[]> {
    return this.model.find({});
  }

  // public async update(_id: string, obj: Partial<T>): Promise<T | null> {
  //   if (!isValidObjectId(_id)) throw Error('Invalid Mongo id');

  //   return this.model.findByIdAndUpdate(
  //     { _id },
  //     { ...obj } as UpdateQuery<T>,
  //     { new: true },
  //   );
  // }
}

export default AbstractODM;