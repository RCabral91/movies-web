import { useEffect } from 'react';
import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';
import Container from '../../components/Container';
import { SearchInput } from '../../components/SearchInput';
import { setTitle } from '../../utils/title';
import { useMovies } from '../../hooks/MoviesContext';
import PageTitle from '../../components/PageTitle';
import MovieCard from '../../components/MovieCard';
import Pagination from '../../components/Pagination';
import LoadingCards from '../../components/LoadingCards';
import LoadingGate from '../../components/LoadingGate';

const Movies: React.FC = () => {
  const { movies, currentPage, pageCount, isLoading, getMovies } = useMovies();

  useEffect(() => {
    getMovies();
    setTitle('All your movies');
    window.scrollTo(0, 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSearch = (searchText: string): void => {
    getMovies(1, searchText);
  };

  const handlePageChange = (event: { selected: number }): Promise<void> =>
    getMovies(event.selected + 1);

  return (
    <>
      <Header />
      <LoadingGate
        waitFor={isLoading === false}
        meanwhile={<LoadingCards show amount={3} />}
      />
      <Container>
        <div className="row pt-3 pt-md-4 pb-4">
          <div className="col-md-6">
            <div className="d-flex text-white align-items-center mb-4 mb-md-0">
              <PageTitle title="Movies" />
            </div>
          </div>
          <div className="d-flex col-md-6 g-3">
            <div className="me-3" />
            <div className="flex-grow-1">
              <SearchInput
                onSearch={handleSearch}
                placeholder="Search your favorite movie..."
              />
            </div>
          </div>
        </div>

        {isLoading ? (
          <p>Loading</p>
        ) : (
          <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 ps-2">
            {movies.map(movie => {
              return (
                <div
                  key={movie.slug}
                  className="col align-items-stretch d-flex"
                >
                  <MovieCard movie={movie} />
                </div>
              );
            })}
          </div>
        )}

        {pageCount > 1 && (
          <Pagination
            forcePage={currentPage - 1}
            pageCount={pageCount}
            onPageChange={handlePageChange}
          />
        )}
      </Container>
      <Footer />
    </>
  );
};

export default Movies;
