interface ICardProps {
  url: string;
}

export const Card: React.FC<ICardProps> = ({ url }) => {
  return (
    <div className="card">
      <a href={url} title="Movies">
        <img src="." className="card-img-top" alt="Movies" />
      </a>
      <div className="card-body">
        <p className="card-text">Check out your favorites movies.</p>
      </div>
    </div>
  );
};
