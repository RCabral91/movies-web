/* eslint-disable camelcase */
export type CategoryType = {
  id: number;
  name: string;
  slug: string;
  pivot: {
    movie_id: number;
    category_id: number;
  };
};
