import { Link } from 'react-router-dom';
import { AiFillStar } from 'react-icons/ai';
import { MovieType } from '../../@types/Movie';
import { Categories } from '../Categories';
import { ImgCard } from './styles';

interface IMovieCardProps {
  movie: MovieType;
}

const MovieCard: React.FC<IMovieCardProps> = ({ movie }) => {
  return (
    <div className="card w-100 text-center mb-3">
      <Link to={`/movies/${movie?.slug}`}>
        <ImgCard
          className="picture"
          style={{
            backgroundImage: `url(${movie?.cover})`,
          }}
        />
      </Link>
      <div className="mt-3">
        <Categories categories={movie?.categories} color="white" size="md" />
      </div>
      <div className="card-body d-flex flex-column">
        <h5 className="card-title mt-auto">
          {movie.score ? (
            <>
              <AiFillStar className="text-warning me-2" />
              {movie.score}
            </>
          ) : (
            'Upcoming movie'
          )}
        </h5>
      </div>
    </div>
  );
};

export default MovieCard;
