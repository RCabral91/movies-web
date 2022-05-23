import { BrowserRouter, Routes as Switch, Route } from 'react-router-dom';
import Actor from './pages/Actor';
import Actors from './pages/Actors';
import MoviesByCategory from './pages/CategoriesMovies';
import { Home } from './pages/Home';
import Movie from './pages/Movie';
import Movies from './pages/Movies';
import SignIn from './pages/SignIn';
import TableOfCategories from './pages/TableOfCategories';

export const Routes: React.FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        {/* Home */}
        <Route path="/" element={<Home />} />

        {/* Movies */}
        <Route path="/movies" element={<Movies />} />
        <Route path="/movies/:slug" element={<Movie />} />
        <Route path="/categories/:slug/movies" element={<MoviesByCategory />} />

        {/* Actors */}
        <Route path="/actors" element={<Actors />} />
        <Route path="/actors/:slug" element={<Actor />} />

        {/* Sign In */}
        <Route path="/login" element={<SignIn />} />

        {/* Tables */}
        <Route path="/admin/categories" element={<TableOfCategories />} />
      </Switch>
    </BrowserRouter>
  );
};
