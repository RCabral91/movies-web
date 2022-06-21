import { CategoryType } from '../../@types/Category';
import { CategoryOverflow, PillStyles } from './styles';

interface ICategoriesProps {
  categories?: CategoryType[];
  color?: 'white';
  size?: 'sm' | 'md' | 'lg';
}

export const Categories: React.FC<ICategoriesProps> = ({
  categories,
  color = 'primary',
  size = 'md',
}) => (
  <CategoryOverflow className="mb-4">
    <ul className="d-flex flex-nowrap flex-md-wrap m-0 list-unstyled">
      {categories?.map(category => (
        <li key={category.slug}>
          <PillStyles
            className={`btn btn-${color} btn-${size} me-2 mb-2`}
            title={category.name}
            to={`/categories/${category.slug}/movies`}
          >
            {category.name}
          </PillStyles>
        </li>
      ))}
    </ul>
  </CategoryOverflow>
);
