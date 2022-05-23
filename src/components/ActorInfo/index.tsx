import { ActorType } from '../../@types/Actor';
import MovieCard from '../MovieCard';
import { ImgCard } from './styles';

interface IActorInfoProps {
  contents?: ActorType;
}

const ActorInfo: React.FC<IActorInfoProps> = ({ contents }) => {
  return (
    <div className="card mb-3">
      <div className="row d-flex g-0">
        <div className="col-md-4">
          <ImgCard>
            <img
              src={`${contents?.picture}`}
              className="position  img-fluid rounded-start"
              alt={contents?.name}
            />
          </ImgCard>
        </div>
        <div className="col-md-8">
          <div className="card-body">
            <h2 className="card-title fw-bold mb-4">
              {contents?.name}, {contents?.birth_date}, {contents?.birth_place}
            </h2>
            <p className="card-text fs-4">
              <small className="fw-bold">Biography: </small>
              {contents?.biography}
            </p>

            <p className="fs-4">
              <small className="fw-bold">Movies:</small>
            </p>
            <div className="container mt-3">
              <div className="row row-cols-1 row-cols-md-1 row-cols-lg-3">
                {Array.isArray(contents?.movies) &&
                  contents?.movies.map(movie => (
                    <div className="col">
                      <MovieCard movie={movie} />
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

export default ActorInfo;
