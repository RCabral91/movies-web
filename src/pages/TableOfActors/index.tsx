import { useEffect } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useAuth } from '../../hooks/AuthContext';
import Container from '../../components/Container';
import { Footer } from '../../components/Footer';
import { Header } from '../../components/Header';
import Wrapper from '../../components/Wrapper';
import PageTitle from '../../components/PageTitle';
import Pagination from '../../components/Pagination';
import { setTitle } from '../../utils/title';
import AdminNav from '../../components/AdminNav';
import { useActors } from '../../hooks/ActorsContext';
import { SearchInput } from '../../components/SearchInput';

const TableOfActors: React.FC = () => {
  const { actors, getActors, deleteActor, pageCount, currentPage } =
    useActors();
  const { user, isLoading } = useAuth();

  useEffect(() => {
    getActors();
    setTitle('Actors');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSearch = (searchText: string): void => {
    getActors(1, searchText);
  };

  const handlePageChange = (event: { selected: number }): Promise<void> =>
    getActors(event.selected + 1);

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
        <AdminNav />
        <div className="d-flex align-items-center text-white mb-4 justify-content-between">
          <PageTitle
            title={'Actors' ?? 'Carregando...'}
            subtitle="Admin"
            url="/admin"
          />
        </div>
        <div className="row">
          <div className="col" />
          <div className="col" />
          <div className="col d-flex justify-content-end">
            <SearchInput
              onSearch={handleSearch}
              placeholder="Search your favorite movie..."
            />
          </div>
        </div>
        <table className="table text-white">
          <thead>
            <tr>
              <th scope="col" style={{ width: '65px' }}>
                #
              </th>
              <th scope="col">
                Actors
                <Link to="/actors/add" className="btn btn-primary btn-sm ms-3">
                  Add
                </Link>
              </th>
              <th scope="col" className="text-end" style={{ width: '65px' }}>
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(actors) &&
              actors.map(actor => {
                return (
                  <tr key={actor.id}>
                    <th scope="row">{actor.id}</th>
                    <td>{actor.name}</td>
                    <td className="text-end d-flex">
                      <Link
                        to={`/admin/actors/${actor.slug}/edit`}
                        type="button"
                        className="btn btn-primary btn-sm me-1 my-1"
                      >
                        Edit
                      </Link>
                      /
                      <button
                        type="button"
                        className="btn btn-primary btn-sm ms-1 my-1"
                        onClick={() => deleteActor(actor.name)}
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
        {pageCount > 1 && (
          <Pagination
            className="m-5"
            forcePage={currentPage - 1}
            pageCount={pageCount}
            onPageChange={handlePageChange}
          />
        )}
      </Container>
      <Footer />
    </Wrapper>
  );
};

export default TableOfActors;
