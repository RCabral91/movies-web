interface ILoadingGateProps {
  waitFor: boolean;
  meanwhile: React.ReactNode;
  children?: React.ReactNode;
}

const LoadingGate: React.FC<ILoadingGateProps> = ({
  waitFor,
  meanwhile,
  children,
}) => <> {waitFor ? children : meanwhile}</>;

export default LoadingGate;
