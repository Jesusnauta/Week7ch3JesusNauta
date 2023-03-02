import { Router } from 'express';
import { BeersController } from '../controllers/beers.controller.js';
import { BeersMongoRepo } from '../repository/beers.mongo.repo.js';
import { logged } from '../interceptors/logged.js';
import { authorized } from '../interceptors/authorized.js';
import { UsersMongoRepo } from '../repository/users.mongo.repo.js';

// eslint-disable-next-line new-cap
export const beersRouter = Router();
const repo = new BeersMongoRepo();
const repoUsers = new UsersMongoRepo();
const controller = new BeersController(repo, repoUsers);

beersRouter.get('/', logged, controller.getAll.bind(controller));
beersRouter.get('/:id', logged, controller.get.bind(controller));
beersRouter.post('/', logged, controller.post.bind(controller));
beersRouter.patch(
  '/:id',
  logged,
  authorized,
  controller.patch.bind(controller)
);
beersRouter.delete(
  '/:id',
  logged,
  authorized,
  controller.delete.bind(controller)
);
