import { MovieType } from '../../@types/Movie';
import { ImgCard } from './styles';
import ActorCard from '../ActorCard';

interface IMovieInfoProps {
  contents?: MovieType;
}

const MovieInfo: React.FC<IMovieInfoProps> = ({ contents }) => {
  return (
    <div className="card mb-3">
      <div className="row d-flex g-0">
        <div className="col-md-4">
          <ImgCard>
            <img
              src={`${contents?.cover}`}
              className="position  img-fluid rounded-start"
              alt={contents?.title}
            />
          </ImgCard>
        </div>
        <div className="col-md-8">
          <div className="card-body">
            <h3 className="card-title fw-bold mb-4">{contents?.title}</h3>
            <p className="card-text fs-4">
              <small className="fw-bold">Description: </small>
              {contents?.description}
            </p>
            <p className="card-text fs-4">
              <small className="fw-bold">Director: </small> {contents?.director}
            </p>
            <p className="card-text mb-5 fs-4">
              <small className="fw-bold">Duration: </small>{' '}
              {contents?.duration}m
            </p>
            <p className="card-text fs-4">
              <small className="fw-bold">Cast: </small>
            </p>
            <div className="container m-2">
              <div className="row row-cols-1 row-cols-sm-1 row-cols-lg-3">
                {Array.isArray(contents?.actors) &&
                  contents?.actors.map(actor => (
                    <div className="col d-flex">
                      <ActorCard actor={actor} />
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieInfo;
