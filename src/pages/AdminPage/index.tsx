import { useEffect } from 'react';
import { Link, Navigate } from 'react-router-dom';
import Container from '../../components/Container';
import { Footer } from '../../components/Footer';
import { Header } from '../../components/Header';
import Wrapper from '../../components/Wrapper';
import { useAuth } from '../../hooks/AuthContext';
import { setTitle } from '../../utils/title';
import { Transaction } from './styles';

const AdminPage: React.FC = () => {
  const { user, logout, isLoading } = useAuth();

  useEffect(() => {
    setTitle('Admin');
  }, []);

  if (isLoading) {
    return <h1>Loading...</h1>;
  }
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <Wrapper>
      <Header />
      <Container>
        <div className="text-center m-5">
          <h1 className="text-white">Seja bem-vindo, {user.name}</h1>
          <button
            type="button"
            onClick={logout}
            className="btn btn-primary btn-sm"
          >
            Logout
          </button>
        </div>
        <Transaction className="row">
          <div className="text-white my-5 text-center">
            <h2>Choose one option below to update.</h2>
          </div>
          <div className="col d-flex text-center">
            <div className="m-5 col-4 card-body">
              <h2>
                <Link
                  className="text-white text-decoration-none"
                  to="/admin/actors"
                >
                  Actors
                </Link>
              </h2>
            </div>
            <div className="m-5 col-4 card-body">
              <h2>
                <Link
                  className="text-white text-decoration-none"
                  to="/admin/categories"
                >
                  Categories
                </Link>
              </h2>
            </div>
            <div className="m-5 col-4 card-body">
              <h2>
                <Link
                  className="text-white text-decoration-none"
                  to="/admin/movies"
                >
                  Movies
                </Link>
              </h2>
            </div>
          </div>
        </Transaction>
      </Container>
      <Footer />
    </Wrapper>
  );
};

export default AdminPage;
