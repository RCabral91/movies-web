// eslint-disable-next-line import/no-cycle
import { ActorType } from './Actor';
import { CategoryType } from './Category';

/* eslint-disable camelcase */
export type MovieType = {
  id?: number;
  slug: string;
  title: string;
  description?: string;
  director?: string;
  year?: number;
  duration?: number;
  score?: number;
  cover?: string;
  trailer?: string;
  created_at?: string;
  updated_at?: string;
  pivot?: {
    movie_id: number;
    actor_id: number;
    order: number;
  };
  categories?: CategoryType[];
  actors?: ActorType[];
};
