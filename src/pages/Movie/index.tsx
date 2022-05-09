import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Container from '../../components/Container';
import { Footer } from '../../components/Footer';
import { Header } from '../../components/Header';
import MovieInfo from '../../components/MovieInfo';
import PageTitle from '../../components/PageTitle';
import { useMovies } from '../../hooks/MoviesContext';
import { setTitle } from '../../utils/title';

const Movie: React.FC = () => {
  const { movie, getMovie } = useMovies();
  const { slug } = useParams();

  useEffect(() => {
    getMovie(slug ?? '');
    window.scrollTo(0, 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setTitle(`${movie?.title ?? 'Loading...'} | Your movie`);
  }, [movie]);

  return (
    <>
      <Header />
      <Container>
        <div className="d-flex text-white mt-3">
          <PageTitle
            title={movie?.title ?? 'Carregando...'}
            subtitle="Movie"
            url="/movies"
          />
        </div>
        {movie && <MovieInfo contents={movie} />}
      </Container>
      <Footer />
    </>
  );
};

export default Movie;
