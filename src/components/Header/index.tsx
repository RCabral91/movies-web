import { Link } from 'react-router-dom';
import { FaBars } from 'react-icons/fa';
import { useState } from 'react';
import { Container, Content, Menu } from './styles';
import { useAuth } from '../../hooks/AuthContext';

export const Header: React.FC = () => {
  const [showMenu, setShowMenu] = useState(false);
  const { user } = useAuth();

  return (
    <>
      <Menu className={showMenu ? 'show' : ''}>
        <div>
          <div>
            <button
              type="button"
              className="btn-close btn-close-white"
              aria-label="Close"
              onClick={() => setShowMenu(false)}
            />
          </div>
          <div>
            <h4 className="text-center">Movies</h4>
            <ul>
              <li>
                <Link to="/categories/action/movies">Action</Link>
              </li>
              <li>
                <Link to="/categories/adventure/movies">Adventure</Link>
              </li>
              <li>
                <Link to="/categories/comedy/movies">Comedy</Link>
              </li>
              <li>
                <Link to="/categories/crime/movies">Crime</Link>
              </li>
              <li>
                <Link to="/categories/drama/movies">Drama</Link>
              </li>
              <li>
                <Link to="/categories/family/movies">Family</Link>
              </li>
              <li>
                <Link to="/categories/fantasy/movies">Fantasy</Link>
              </li>
              <li>
                <Link to="/categories/fiction/movies">Fiction</Link>
              </li>
              <li>
                <Link to="/categories/horror/movies">Horror</Link>
              </li>
              <li>
                <Link to="/categories/sci-fi/movies">Sci-Fi</Link>
              </li>
            </ul>
          </div>
        </div>
        <Link to="/actors">
          <h4 className="text-center mb-4">Know your favorites actors</h4>
        </Link>
        <div className="border-top">
          <h4 className="text-center mt-4">Admin Page</h4>
          <ul className="mt-4">
            <li>
              <Link to="/admin/actors">Actors</Link>
            </li>
            <li>
              <Link to="/admin/categories">Categories</Link>
            </li>
            <li>
              <Link to="/admin/movies">Movies</Link>
            </li>
          </ul>
        </div>
      </Menu>

      <Container>
        <Content className="container">
          <button type="button" onClick={() => setShowMenu(!showMenu)}>
            <FaBars className="fs-4" />
          </button>
          <Link to="/" className="text-decoration-none text-white">
            <h1>TOP MOVIES</h1>
          </Link>
          <Link className="text-decoration-none text-white pt-2" to="/login">
            <p className="m-0">{user ? `Olá, ${user.name}` : 'Login'}</p>
          </Link>
        </Content>
      </Container>
    </>
  );
};
