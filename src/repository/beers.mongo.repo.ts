import { Beer } from '../entities/beer';
import { HTTPError } from '../errors/errors.js';
import { Repo } from './repo.interface';
import { BeerModel } from './beers.mongo.model.js';
import createDebug from 'debug';
const debug = createDebug('W6:repo');

export class BeersMongoRepo implements Repo<Beer> {
  constructor() {
    debug('Instantiate');
  }

  async query(): Promise<Beer[]> {
    debug('query');
    const data = await BeerModel.find().populate('owner');
    return data;
  }

  async queryId(id: string): Promise<Beer> {
    debug('queryId');
    const data = await BeerModel.findById(id);
    if (!data) throw new HTTPError(404, 'Not found', 'Id not found in queryId');
    return data;
  }

  async search(query: { key: string; value: unknown }): Promise<Beer[]> {
    debug('search');
    const data = await BeerModel.find({ [query.key]: query.value });
    return data;
  }

  async create(info: Partial<Beer>): Promise<Beer> {
    debug('create');
    const data = await BeerModel.create(info);
    return data;
  }

  async update(info: Partial<Beer>): Promise<Beer> {
    debug('update');
    const data = await BeerModel.findByIdAndUpdate(info.id, info, {
      new: true,
    });
    if (!data) throw new HTTPError(404, 'Not found', 'Id not found in update');
    return data;
  }

  async destroy(id: string): Promise<void> {
    debug('destroy');
    const data = await BeerModel.findByIdAndDelete(id);
    if (!data)
      throw new HTTPError(404, 'Not found', 'Delete not posible: id not found');
  }
}
