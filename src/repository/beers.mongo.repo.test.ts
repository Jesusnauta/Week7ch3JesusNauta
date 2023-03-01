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

  describe('When i use create', () => {
    test('Then it should create a new Beer', async () => {
      (BeerModel.find as jest.Mock).mockResolvedValue('[{"id": "1"}]');

      expect(BeerModel.create).toHaveBeenCalled();
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
      (BeerModel.findByIdAndRemove as jest.Mock).mockResolvedValue({
        id: '1',
      });
    });

    test('Then if it has an object to delete, the readFile function should be called', async () => {
      await repo.destroy('1');
      expect(BeerModel.findByIdAndRemove).toHaveBeenCalled();
    });
  });
});
