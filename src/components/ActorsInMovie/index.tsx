import { Cover } from './styles';

interface IActorsProps {
  actorsPics: string;
}

const ActorsInMovie: React.FC<IActorsProps> = ({ actorsPics }) => {
  return (
    <div className="overflow">
      <Cover style={{ backgroundImage: `url(${actorsPics})` }} />
    </div>
  );
};

export default ActorsInMovie;
