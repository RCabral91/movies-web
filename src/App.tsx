import { ActorsProvider } from './hooks/ActorsContext';
import { MoviesProvider } from './hooks/MoviesContext';
import { Routes } from './Routes';
import { GlobalStyle } from './styles/global';

const App: React.FC = () => {
  return (
    <>
      <MoviesProvider>
        <ActorsProvider>
          <Routes />
        </ActorsProvider>
      </MoviesProvider>
      <GlobalStyle />
    </>
  );
};

export default App;
