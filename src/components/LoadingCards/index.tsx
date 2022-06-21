import LoadingCard from './LoadingCard';

interface ILoadingCardsProps {
  show: boolean;
  amount?: number;
}

const LoadingCards: React.FC<ILoadingCardsProps> = ({ show, amount = 6 }) =>
  show ? (
    <div className="container">
      <div className="row row-cols-4 g-3">
        {[...Array(amount)].map((_, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <div key={index} className="col">
            <LoadingCard />
          </div>
        ))}
      </div>
    </div>
  ) : null;

export default LoadingCards;
