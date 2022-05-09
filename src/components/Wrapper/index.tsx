interface WrapperProps {
  children: React.ReactNode;
}

const Wrapper: React.FC<WrapperProps> = ({ children }) => (
  <div className="d-flex flex-column min-vh-100">{children}</div>
);

export default Wrapper;
