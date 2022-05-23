/* eslint-disable react/jsx-props-no-spreading */
import { Link, Navigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useCallback } from 'react';
import { SignInBox } from './styles';
import { useAuth } from '../../hooks/AuthContext';

type FormDataType = {
  email: string;
  password: string;
};

const SignIn: React.FC = () => {
  const { register, handleSubmit } = useForm<FormDataType>();
  const { login, user, isLoading } = useAuth();

  const onSubmit = useCallback(
    (data: FormDataType) => {
      login(data.email, data.password);
    },
    [login]
  );

  if (isLoading) {
    return <h1>Loading...</h1>;
  }
  if (user) {
    return <Navigate to="/admin" replace />;
  }

  return (
    <>
      <h1 className="text-center p-5">
        <Link to="/" className="text-decoration-none text-white">
          TOP MOVIES
        </Link>
      </h1>
      <SignInBox>
        <div className="container p-5">
          <h2 className="text-white text-center mb-4">Login</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-floating mb-3">
              <input
                type="email"
                className="form-control"
                placeholder="name@example.com"
                {...register('email')}
              />
              {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
              <label htmlFor="floatingInput">Email address</label>
              <div id="emailHelp" className="form-text">
                We`ll never share your email with anyone else.
              </div>
            </div>

            <div className="form-floating">
              <input
                type="password"
                className="form-control"
                placeholder="Password"
                {...register('password')}
              />
              {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
              <label htmlFor="floatingPassword">Password</label>
            </div>
            <button type="submit" className="mt-5 btn btn-primary btn-lg">
              Submit
            </button>
          </form>
        </div>
      </SignInBox>
    </>
  );
};

export default SignIn;
