// eslint-disable-next-line import/no-cycle
import { MovieType } from './Movie';

/* eslint-disable camelcase */
export type ActorType = {
  id: number;
  name: string;
  slug?: string;
  picture?: string;
  biography?: string;
  birth_date?: string;
  birth_place?: string;
  created_at?: string;
  updated_at?: string;
  movies: MovieType[];
};
