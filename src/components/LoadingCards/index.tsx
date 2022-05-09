import LoadingCard from './LoadingCard';

interface ILoadingCardsProps {
  show: boolean;
  amount?: number;
}

const LoadingCards: React.FC<ILoadingCardsProps> = ({ show, amount = 6 }) =>
  show ? (
    <div className="container">
      <div className="row row-cols-4 g-3">
        {[...Array(amount)].map(() => (
          <div key={amount} className="col">
            <LoadingCard />
          </div>
        ))}
      </div>
    </div>
  ) : null;

export default LoadingCards;
