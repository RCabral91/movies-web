import { ActorsProvider } from './hooks/ActorsContext';
import { CategoriesProvider } from './hooks/Admin/CategoryContext';
import { AuthProvider } from './hooks/AuthContext';
import { MoviesProvider } from './hooks/MoviesContext';
import { Routes } from './Routes';
import { GlobalStyle } from './styles/global';

const App: React.FC = () => {
  return (
    <>
      <MoviesProvider>
        <ActorsProvider>
          <AuthProvider>
            <CategoriesProvider>
              <Routes />
            </CategoriesProvider>
          </AuthProvider>
        </ActorsProvider>
      </MoviesProvider>
      <GlobalStyle />
    </>
  );
};

export default App;
