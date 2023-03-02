import { Beer } from '../entities/beer';
import { BeerModel } from './beers.mongo.model';
import { BeersMongoRepo } from './beers.mongo.repo.js';

jest.mock('./beers.mongo.model.js');

describe('Given BeerMongoRepo', () => {
  const repo = new BeersMongoRepo();
  describe('When is called', () => {
    test('Then should be instantiated', () => {
      expect(repo).toBeInstanceOf(BeersMongoRepo);
    });
  });

  describe('When i use query', () => {
    test('Then should return the data', async () => {
      (BeerModel.find as jest.Mock).mockResolvedValue([]);
      const result = await repo.query();

      expect(BeerModel.find).toHaveBeenCalled();
      expect(result).toEqual([]);
    });
  });

  describe('When i use queryId', () => {
    beforeEach(async () => {
      (BeerModel.findById as jest.Mock).mockResolvedValue({ id: '1' });
    });
    test('Then should return the selected data', async () => {
      const result = await repo.queryId('1');
      expect(BeerModel.findById).toHaveBeenCalled();
      expect(result).toEqual({ id: '1' });
    });
  });

  describe('When the create method is used', () => {
    test('Then if it has an object to create, it should return the created object', async () => {
      (BeerModel.create as jest.Mock).mockResolvedValue({ name: 'test' });

      const result = await repo.create({ name: 'test' });
      expect(BeerModel.create).toHaveBeenCalled();
      expect(result).toEqual({ name: 'test' });
    });
  });

  describe('When the update method is used', () => {
    beforeEach(async () => {
      (BeerModel.findByIdAndUpdate as jest.Mock).mockResolvedValue({
        id: '2',
      });
    });

    test('Then if it has an object to update, it should return the updated object', async () => {
      const mockBeer = {
        id: '2',
        name: 'test',
      } as Partial<Beer>;

      const result = await repo.update(mockBeer);
      expect(BeerModel.find).toHaveBeenCalled();
      expect(result).toEqual({ id: '2' });
    });
  });

  describe('When the delete method is used', () => {
    beforeEach(async () => {
      (BeerModel.findByIdAndDelete as jest.Mock).mockResolvedValue({});
    });

    test('Then if it has an object to delete with its ID, the findByIdAndDelete function should be called', async () => {
      await repo.destroy('1');
      expect(BeerModel.findByIdAndDelete).toHaveBeenCalled();
    });

    test('Then if the findByIdAndDelete method resolve value to undefined, it should throw an Error', async () => {
      (BeerModel.findByIdAndDelete as jest.Mock).mockResolvedValue(null);
      expect(async () => repo.destroy('')).rejects.toThrow();
    });
  });
});
