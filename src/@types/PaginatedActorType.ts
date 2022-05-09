import { ActorType } from './Actor';
import { MetaType } from './Meta';

export type PaginatedActorType = {
  data: ActorType[];
  meta: MetaType[];
};
