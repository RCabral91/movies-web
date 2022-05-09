import {
  createContext,
  useCallback,
  useState,
  useContext,
  useMemo,
  ReactNode,
} from 'react';
import { CategoryType } from '../@types/Category';
import { MovieType } from '../@types/Movie';
import { Api } from '../services/Api';

// Aqui é definida a Interface com os tipos de dados de tudo que será disponibilizado "para fora" do Provider
interface IMoviesContextProps {
  movie: MovieType | null;
  movies: MovieType[];
  category: CategoryType | null;
  categories: CategoryType[];
  isLoading: boolean;
  currentPage: number;
  pageCount: number;
  errorMessage: string | null;
  setCategory: (slug: CategoryType) => void;
  getMovie: (slug: string) => Promise<void>;
  getMovies: (page?: number, searchText?: string) => Promise<void>;
  getMoviesByCategory: (
    slug: string,
    page?: number,
    searchText?: string
  ) => Promise<void>;
}

interface IMoviesProviderProps {
  children: ReactNode;
}

// Aqui é definido o Context (não precisa entender, é sempre exatamente assim)
export const MoviesContext = createContext<IMoviesContextProps>(
  {} as IMoviesContextProps
);

// O useBanners() é o que você vai chamar dentro dos componentes pra acessar o conteúdo interno do Provider. Exemplo:
/*
  const { banners, getBanners } = useBanners();
*/
export const useMovies = (): IMoviesContextProps => {
  const context = useContext(MoviesContext);

  if (!context) {
    throw new Error('useMovies must be within MoviesProvider');
  }

  return context;
};

// Aqui são definidas as variáveis de State e as funções do Provider
export const MoviesProvider: React.FC<IMoviesProviderProps> = ({
  children,
}) => {
  const [movie, setMovie] = useState<MovieType | null>(null);
  const [movies, setMovies] = useState<MovieType[]>([]);
  const [pageCount, setPageCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [category, setCategory] = useState<CategoryType | null>(null);
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [isLoading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const getMovie = useCallback(async (slug: string): Promise<void> => {
    setLoading(true);
    Api.get(`/movies/${slug}`)
      .then(response => setMovie(response.data))
      .catch(() => setMovie(null))
      .finally(() => setLoading(false));
  }, []);

  const getMovies = useCallback(
    async (page = 1, searchText = ''): Promise<void> => {
      const params: { per_page: number; search?: string; page?: number } = {
        per_page: 6,
        page,
      };

      setLoading(true);
      setCurrentPage(page);

      setLoading(true);
      setErrorMessage(null);

      try {
        if (searchText) {
          params.search = searchText;
        }
        const response = await Api.get('/movies', { params });

        setMovies(response?.data?.data);
        setPageCount(response?.data?.meta?.last_page);
      } catch (e) {
        if (e instanceof Error) setErrorMessage(e.message);
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const getMoviesByCategory = useCallback(
    async (slug: string, page?: number, searchText?: string): Promise<void> => {
      setLoading(true);
      Api.get(`/categories/${slug}/movies`)
        .then(response => {
          setMovies(response?.data?.data);
        })
        .catch(() => {
          setMovies([]);
          setCategory(null);
        })
        .finally(() => setLoading(false));
    },
    []
  );

  // Aqui são definidas quais informações estarão disponíveis "para fora" do Provider
  const providerValue = useMemo(
    () => ({
      movie,
      movies,
      category,
      categories,
      isLoading,
      errorMessage,
      currentPage,
      pageCount,
      setCategory,
      getMovie,
      getMovies,
      getMoviesByCategory,
    }),
    [
      movie,
      movies,
      category,
      categories,
      isLoading,
      errorMessage,
      currentPage,
      pageCount,
      setCategory,
      getMovie,
      getMovies,
      getMoviesByCategory,
    ]
  );

  return (
    <MoviesContext.Provider value={providerValue}>
      {children}
    </MoviesContext.Provider>
  );
};
