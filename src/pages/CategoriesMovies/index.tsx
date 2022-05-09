import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';
import Container from '../../components/Container';
import PageTitle from '../../components/PageTitle';
import { SearchInput } from '../../components/SearchInput';
import LoadingGate from '../../components/LoadingGate';
import LoadingCards from '../../components/LoadingCards';
import { setTitle } from '../../utils/title';
import { useMovies } from '../../hooks/MoviesContext';
import MovieCard from '../../components/MovieCard';

const MoviesByCategory: React.FC = () => {
  const { movies, category, isLoading, getMovies, getMoviesByCategory } =
    useMovies();

  const { slug } = useParams();

  useEffect(() => {
    getMoviesByCategory(slug ?? '');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug]);

  useEffect(() => {
    setTitle(`${category?.name ?? 'Loading...'} | Category of movies`);
  }, [category]);

  const handleSearch = (searchText: string): void => {
    getMovies(1, searchText);
  };

  return (
    <>
      <Header />
      <LoadingGate
        waitFor={isLoading === false}
        meanwhile={<LoadingCards show amount={4} />}
      >
        <Container>
          <div className="row pt-3 pt-md-4 pb-4">
            <div className="col-md-6">
              <div className="d-flex align-items-center mb-4 mb-md-0">
                <PageTitle
                  title={category?.name ?? 'Carregando...'}
                  subtitle="Movies"
                  url="/movies"
                />
              </div>
            </div>
            <div className="d-flex col-md-6 g-3">
              <div className="flex-grow-1">
                <SearchInput
                  onSearch={handleSearch}
                  placeholder="Find your type of movie..."
                />
              </div>
            </div>
          </div>
          {isLoading ? (
            <p>Carregando</p>
          ) : (
            <div className="row row-cols-3 ps-2">
              {movies.map(movie => {
                return (
                  <div
                    key={movie.id}
                    className="col align-items-stretch d-flex"
                  >
                    <MovieCard movie={movie} />
                  </div>
                );
              })}
            </div>
          )}
        </Container>
      </LoadingGate>
      <Footer />
    </>
  );
};

export default MoviesByCategory;
