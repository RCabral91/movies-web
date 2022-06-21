import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/AuthContext';
import { SubMenu } from './styles';

const AdminNav: React.FC = () => {
  const { logout } = useAuth();

  return (
    <SubMenu>
      <div className="d-flex justify-content-between border-bottom mb-4">
        <ul className="text-white d-flex">
          <li className="list-style-none">
            <Link to="/admin/actors">Actors +</Link>
          </li>
          <li className="list-style-none">
            <Link to="/admin/categories">Categories +</Link>
          </li>
          <li className="list-style-none">
            <Link to="/admin/movies">Movies +</Link>
          </li>
        </ul>
        <div>
          <button
            type="button"
            onClick={logout}
            className="btn btn-primary btn-sm"
          >
            Logout
          </button>
        </div>
      </div>
    </SubMenu>
  );
};

export default AdminNav;
