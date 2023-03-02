import { User } from './user';

export type Beer = {
  id: string;
  name: string;
  price: number;
  owner: User;
};
