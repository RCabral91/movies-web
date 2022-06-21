import { AxiosError } from 'axios';
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
  getMovies: (
    page?: number,
    searchText?: string,
    orderBy?: string,
    order?: string
  ) => Promise<void>;
  getMoviesByCategory: (
    slug: string,
    page?: number,
    searchText?: string
  ) => Promise<void>;
  addingMovie: (
    title: string,
    director?: string | undefined,
    year?: number | undefined,
    duration?: number | undefined,
    score?: number | undefined,
    cover?: string | undefined,
    trailer?: string | undefined,
    description?: string | undefined
  ) => Promise<boolean>;
  editMovie: (
    title: string,
    slug?: string | undefined,
    director?: string | undefined,
    year?: number | undefined,
    duration?: number | undefined,
    score?: number | undefined,
    cover?: string | undefined,
    trailer?: string | undefined,
    description?: string | undefined
  ) => Promise<boolean>;
  deleteMovie: (slug: string) => Promise<boolean>;
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
  const [categories] = useState<CategoryType[]>([]);
  const [isLoading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const getMovie = useCallback(async (slug: string): Promise<void> => {
    setErrorMessage(null);
    try {
      setLoading(true);
      const response = await Api.get(`/movies/${slug}`);
      setMovie(response?.data);
      setLoading(false);
    } catch (e) {
      setMovie(null);
      setErrorMessage('Error');
    } finally {
      setLoading(false);
    }
  }, []);

  const getMovies = useCallback(
    async (
      page = 1,
      searchText = '',
      orderBy = 'title',
      order = 'desc'
    ): Promise<void> => {
      const params: {
        per_page: number;
        search?: string;
        page?: number;
        orderBy?: string;
        order?: string;
      } = {
        per_page: 6,
        page,
        orderBy,
        order,
      };

      setLoading(true);
      setCurrentPage(page);
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
    async (slug: string): Promise<void> => {
      setLoading(true);
      Api.get(`/categories/${slug}/movies`)
        .then(response => setMovies(response?.data?.data))
        .catch(() => setMovies([]))
        .finally(() => setLoading(false));

      Api.get(`/categories/${slug}`)
        .then(response => setCategory(response?.data))
        .catch(() => setCategory(null))
        .finally(() => setLoading(false));
    },
    []
  );

  const addingMovie = useCallback(
    async (
      title: string,
      director?: string | undefined,
      year?: number | undefined,
      duration?: number | undefined,
      score?: number | undefined,
      cover?: string | undefined,
      trailer?: string | undefined,
      description?: string | undefined
    ): Promise<boolean> => {
      setErrorMessage(null);
      try {
        setLoading(true);
        await Api.post('/movies', {
          title,
          director,
          year,
          duration,
          score,
          cover,
          trailer,
          description,
        });
        setLoading(false);
        return true;
      } catch (e: unknown) {
        const error = e as AxiosError;
        setLoading(false);
        setErrorMessage(error?.response?.data?.message);
        return false;
      }
    },
    []
  );

  const editMovie = useCallback(
    async (
      title: string,
      slug?: string | undefined,
      director?: string | undefined,
      year?: number | undefined,
      duration?: number | undefined,
      score?: number | undefined,
      cover?: string | undefined,
      trailer?: string | undefined,
      description?: string | undefined
    ): Promise<boolean> => {
      setErrorMessage(null);
      try {
        setLoading(true);
        await Api.patch(`/movies/${slug}`, {
          title,
          director,
          year,
          duration,
          score,
          cover,
          trailer,
          description,
        });
        setLoading(false);
        return true;
      } catch (e: unknown) {
        const error = e as AxiosError;
        setLoading(false);
        setErrorMessage(error?.response?.data?.message);
        return false;
      }
    },
    []
  );

  const deleteMovie = useCallback(
    async (slug: string): Promise<boolean> => {
      setErrorMessage(null);
      try {
        setLoading(true);
        await Api.delete(`/movies/${slug}`);
        await getMovies();
        setLoading(false);
        return true;
      } catch (e: unknown) {
        const error = e as AxiosError;
        setLoading(false);
        setErrorMessage(error?.response?.data?.message);
        return false;
      }
    },
    [getMovies]
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
      addingMovie,
      editMovie,
      deleteMovie,
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
      addingMovie,
      editMovie,
      deleteMovie,
    ]
  );

  return (
    <MoviesContext.Provider value={providerValue}>
      {children}
    </MoviesContext.Provider>
  );
};
