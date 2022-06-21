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
import { SearchInput } from '../../components/SearchInput';
import { useMovies } from '../../hooks/MoviesContext';

const TableOfMovies: React.FC = () => {
  const { movies, getMovies, deleteMovie, pageCount, currentPage } =
    useMovies();
  const { user, isLoading } = useAuth();

  useEffect(() => {
    getMovies();
    setTitle('Movies');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSearch = (searchText: string): void => {
    getMovies(1, searchText);
  };

  const handlePageChange = (event: { selected: number }): Promise<void> =>
    getMovies(event.selected + 1);

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
            title={'Movies' ?? 'Carregando...'}
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
                Movies
                <Link to="/movies/add" className="btn btn-primary btn-sm ms-3">
                  Add
                </Link>
              </th>
              <th scope="col" className="text-end" style={{ width: '65px' }}>
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(movies) &&
              movies.map(movie => {
                return (
                  <tr key={movie.id}>
                    <th scope="row">{movie.id}</th>
                    <td>{movie.title}</td>
                    <td className="text-end d-flex">
                      <Link
                        to={`/admin/movies/${movie.slug}/edit`}
                        type="button"
                        className="btn btn-primary btn-sm me-1 my-1"
                      >
                        Edit
                      </Link>
                      /
                      <button
                        type="button"
                        className="btn btn-primary btn-sm ms-1 my-1"
                        onClick={() => deleteMovie(movie.slug)}
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

export default TableOfMovies;
