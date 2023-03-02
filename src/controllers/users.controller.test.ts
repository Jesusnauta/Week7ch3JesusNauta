import { User } from '../entities/user';
import { Request, Response } from 'express';
import { Repo } from '../repository/repo.interface';
import { UsersController } from './users.controller';
import { Auth } from '../services/auth.js';

jest.mock('../services/auth.js'); // Copiamos y pegamos para no equivocarnos al mockear el modulo

describe('Given register method from usersController', () => {
  const mockRepo = {
    // Mockeamos las dos funciones que se estan ejecutando en usersController
    create: jest.fn(),
    search: jest.fn(),
  } as unknown as Repo<User>;
  const controller = new UsersController(mockRepo);

  const req = {
    body: {},
  } as Request;
  const resp = {
    status: jest.fn(),
    json: jest.fn(),
  } as unknown as Response;
  const next = jest.fn();

  describe('When there are NOT password in the body', () => {
    const req = {
      body: {
        email: 'test',
      },
    } as Request;
    test('Then next should been called', async () => {
      await controller.register(req, resp, next);
      expect(next).toHaveBeenCalled();
    });
  });

  describe('When there are NOT email in the body', () => {
    const req = {
      body: {
        password: 'test',
      },
    } as Request;
    test('Then next should been called', async () => {
      await controller.register(req, resp, next);
      expect(next).toHaveBeenCalled();
    });
  });
  describe('When all its Ok', () => {
    const req = {
      body: {
        email: 'test',
        password: 'test',
      },
    } as Request;
    test('Then json should been called', async () => {
      await controller.register(req, resp, next);
      expect(resp.json).toHaveBeenCalled();
    });
  });
});

describe('Given login method from usersController', () => {
  const mockRepo = {
    // Mockeamos las dos funciones que se estan ejecutando en usersController
    create: jest.fn(),
    search: jest.fn(),
  } as unknown as Repo<User>;

  const controller = new UsersController(mockRepo);

  const req = {
    body: {
      email: 'test',
      password: 'test',
    },
  } as Request;

  const resp = {
    status: jest.fn(),
    json: jest.fn(),
  } as unknown as Response;

  const next = jest.fn();

  Auth.compare = jest.fn().mockResolvedValue(true); // Mockear el metodo Auth

  describe('When all its OK', () => {
    (mockRepo.search as jest.Mock).mockReturnValue(['test']);

    test('Then json should be called', async () => {
      await controller.login(req, resp, next);
      expect(resp.json).toHaveBeenCalled();
    });
  });
});
