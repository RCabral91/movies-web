import { CategoryType } from './Category';
import { MetaType } from './Meta';

export type PaginatedCategoryType = {
  data: CategoryType[];
  meta: MetaType[];
};
