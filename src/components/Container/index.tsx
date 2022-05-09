import { ReactNode } from 'react';

interface IContainerProps {
  className?: string;
  children: ReactNode;
}

const Container: React.FC<IContainerProps> = ({ className, children }) => (
  <div className={`container flex-grow-1 ${className ?? ''}`}>{children}</div>
);

export default Container;
