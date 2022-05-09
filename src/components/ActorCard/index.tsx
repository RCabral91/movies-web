import { Link } from 'react-router-dom';
import { ImgCard } from './styles';
import { ActorType } from '../../@types/Actor';

interface IActorCardProps {
  actor: ActorType;
}

const ActorCard: React.FC<IActorCardProps> = ({ actor }) => {
  return (
    <div className="card w-100 text-center mb-3">
      <Link to={`/actors/${actor?.slug}`}>
        <ImgCard
          className="picture"
          style={{
            backgroundImage: `url(${actor?.picture})`,
          }}
        />
      </Link>
      <div className="card-body d-flex flex-column">
        <h4 className="card-title mt-auto">{actor.name}</h4>
      </div>
    </div>
  );
};

export default ActorCard;
