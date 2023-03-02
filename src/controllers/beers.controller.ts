import { Response, Request, NextFunction } from 'express';
import { Repo } from '../repository/repo.interface.js';
import { Beer } from '../entities/beer.js';
import createDebug from 'debug';
import { RequestPlus } from '../interceptors/logged.js';
import { User } from '../entities/user.js';
import { HTTPError } from '../errors/errors.js';
const debug = createDebug('W6:controller');
export class BeersController {
  // eslint-disable-next-line no-useless-constructor
  constructor(public repo: Repo<Beer>, public repoUsers: Repo<User>) {}

  async getAll(_req: Request, resp: Response, next: NextFunction) {
    try {
      debug('getAll');
      const data = await this.repo.query();
      resp.json({
        results: data,
      });
    } catch (error) {
      next(error);
    }
  }

  async get(req: Request, resp: Response, next: NextFunction) {
    try {
      debug('get');
      const data = await this.repo.queryId(req.params.id);
      resp.json({
        results: [data],
      });
    } catch (error) {
      next(error);
    }
  }

  async post(req: RequestPlus, resp: Response, next: NextFunction) {
    try {
      debug('post');
      const userId = req.info?.id;
      if (!userId) throw new HTTPError(404, 'Not found', 'Not found user Id');
      const actualUser = await this.repoUsers.queryId(userId);
      req.body.owner = req.info?.id; // Validamos que el owner usa su token
      const newBeer = await this.repo.create(req.body);

      // Opcion bidireccionalidad

      actualUser.beers.push(newBeer);

      this.repoUsers.update(actualUser);

      resp.json({
        results: [newBeer],
      });
    } catch (error) {
      next(error);
    }
  }

  async patch(req: Request, resp: Response, next: NextFunction) {
    try {
      debug('patch');
      req.body.id = req.params.id ? req.params.id : req.body.id;
      const data = await this.repo.update(req.body);
      resp.json({
        results: [data],
      });
    } catch (error) {
      next(error);
    }
  }

  async delete(req: Request, resp: Response, next: NextFunction) {
    try {
      debug('delete');
      await this.repo.destroy(req.params.id);
      resp.json({
        results: [],
      });
    } catch (error) {
      next(error);
    }
  }
}
