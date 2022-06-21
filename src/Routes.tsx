import { BrowserRouter, Routes as Switch, Route } from 'react-router-dom';
import Actor from './pages/Actor';
import Actors from './pages/Actors';
import AddActor from './pages/AddActor';
import AddCategory from './pages/AddCategory';
import AddMovie from './pages/AddMovie';
import AdminPage from './pages/AdminPage';
import MoviesByCategory from './pages/CategoriesMovies';
import EditActor from './pages/EditActor';
import EditCategory from './pages/EditCategory';
import EditMovie from './pages/EditMovie';
import { Home } from './pages/Home';
import Movie from './pages/Movie';
import Movies from './pages/Movies';
import SignIn from './pages/SignIn';
import TableOfActors from './pages/TableOfActors';
import TableOfCategories from './pages/TableOfCategories';
import TableOfMovies from './pages/TableOfMovies';

export const Routes: React.FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        {/* Home */}
        <Route path="/" element={<Home />} />

        {/* Movies */}
        <Route path="/movies" element={<Movies />} />
        <Route path="/movies/:slug" element={<Movie />} />
        <Route path="/movies/add" element={<AddMovie />} />
        <Route path="/admin/movies/:slug/edit" element={<EditMovie />} />
        <Route path="/categories/:slug/movies" element={<MoviesByCategory />} />

        {/* Actors */}
        <Route path="/actors" element={<Actors />} />
        <Route path="/actors/:slug" element={<Actor />} />
        <Route path="/actors/add" element={<AddActor />} />
        <Route path="/admin/actors/:slug/edit" element={<EditActor />} />

        {/* Sign In */}
        <Route path="/login" element={<SignIn />} />

        {/* Admin */}
        <Route path="/admin" element={<AdminPage />} />

        {/* Tables */}
        <Route path="/admin/categories" element={<TableOfCategories />} />
        <Route path="/admin/actors" element={<TableOfActors />} />
        <Route path="/admin/movies" element={<TableOfMovies />} />

        {/* Categories */}
        <Route path="/categories" element={<AddCategory />} />
        <Route path="/admin/categories/:slug/edit" element={<EditCategory />} />
      </Switch>
    </BrowserRouter>
  );
};
