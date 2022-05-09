import { Cover } from './styles';

interface IMoviesProps {
  moviesCover: string;
}

const MoviesFromActor: React.FC<IMoviesProps> = ({ moviesCover }) => {
  return (
    <div className="overflow">
      <Cover style={{ backgroundImage: `url(${moviesCover})` }} />
    </div>
  );
};

export default MoviesFromActor;
