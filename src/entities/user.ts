import { Beer } from './beer';

export type User = {
  id: string;
  email: string;
  password: string;
  beers: Beer[];
};

/**
 1 - n  User -> n // Beer -> 1
 n - m  User -> n // Beer -> n
Relacion


OTRA MANERA
UserBeer = {
  userID
  beerID
}

 */
