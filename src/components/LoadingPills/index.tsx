import LoadingPill from './LoadingPill';

interface ILoadingPillProps {
  show: boolean;
  amount?: number;
}

const LoadingPills: React.FC<ILoadingPillProps> = ({ show, amount = 12 }) =>
  show ? (
    <div className="container">
      <div className="row row-cols-4 my-3">
        {[...Array(amount)].map((_, i) => (
          // eslint-disable-next-line react/no-array-index-key
          <div key={i} className="col">
            <LoadingPill />
          </div>
        ))}
      </div>
    </div>
  ) : null;

export default LoadingPills;
