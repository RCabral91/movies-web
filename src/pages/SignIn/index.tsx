import { Link } from 'react-router-dom';
import { SignInBox } from './styles';

const SignIn: React.FC = () => {
  return (
    <>
      <Link to="/" className="text-decoration-none text-center p-5 text-white">
        <h1>TOP MOVIES</h1>
      </Link>
      <SignInBox>
        <div className="container">
          <h2 className="text-white text-center mb-4">Login</h2>
          <div className="form-floating mb-3">
            <input
              type="email"
              className="form-control"
              id="floatingInput"
              placeholder="name@example.com"
            />
            {/* <label htmlFor="floatingInput">Email address</label> */}
            <div id="emailHelp" className="form-text">
              We`ll never share your email with anyone else.
            </div>
          </div>
          <div className="form-floating">
            <input
              type="password"
              className="form-control"
              id="floatingPassword"
              placeholder="Password"
            />
            {/* <label htmlFor="floatingPassword">Password</label> */}
          </div>
          <button type="submit" className="mt-5 btn btn-primary btn-lg">
            Submit
          </button>
        </div>
      </SignInBox>
    </>
  );
};

export default SignIn;
