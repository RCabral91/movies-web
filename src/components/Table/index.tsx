import { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useCategories } from '../../hooks/Admin/CategoryContext';
import { useAuth } from '../../hooks/AuthContext';

const Table: React.FC = () => {
  const { categories, getCategories } = useCategories();
  const { user, logout, isLoading } = useAuth();
  // useEffect(() => {
  //   getCategories();
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  if (isLoading) {
    return <h1>Loading...</h1>;
  }
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <>
      <h1 className="text-white">Logado como {user.name}</h1>
      <button type="button" onClick={logout} className="btn btn-primary">
        Deslogar
      </button>
      <table className="table">
        <thead>
          <tr>
            <th scope="col" style={{ width: '65px' }}>
              #
            </th>
            <th scope="col">Categories</th>
            <th scope="col" className="text-end" style={{ width: '65px' }}>
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {/* {Array.isArray(categories) &&
          categories.map(category => {
            return (
              <tr>
                <th scope="row">{category.id}</th>
                <td>{category.name}</td>
                <td className="text-end">...</td>
              </tr>
            );
          })} */}
        </tbody>
      </table>
    </>
  );
};

export default Table;
