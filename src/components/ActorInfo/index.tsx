import { ActorType } from '../../@types/Actor';
import MovieCard from '../MovieCard';
import { Cover, ImgCard } from './styles';

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
          </div>
          <p className="fs-4">
            <small className="fw-bold">Movies:</small>
          </p>
          <Cover className="d-flex m-3">
            {Array.isArray(contents?.movies) &&
              contents?.movies.map(movie => <MovieCard movie={movie} />)}
          </Cover>
        </div>
      </div>
    </div>
  );
};

export default ActorInfo;
