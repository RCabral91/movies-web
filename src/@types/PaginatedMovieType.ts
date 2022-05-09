import { MetaType } from './Meta';
import { MovieType } from './Movie';

export type PaginatedMovieType = {
  data: MovieType[];
  meta: MetaType[];
};
