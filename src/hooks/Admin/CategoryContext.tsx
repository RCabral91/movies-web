import {
  createContext,
  useCallback,
  useState,
  useContext,
  useMemo,
  ReactNode,
} from 'react';
import { ActorType } from '../../@types/Actor';
import { CategoryType } from '../../@types/Category';
import { Api } from '../../services/Api';

// Aqui é definida a Interface com os tipos de dados de tudo que será disponibilizado "para fora" do Provider
interface IActorsContextProps {
  actor: ActorType | null;
  actors: ActorType[];
  category: CategoryType | null;
  categories: CategoryType[];
  isLoading: boolean;
  currentPage: number;
  pageCount: number;
  errorMessage: string | null;
  setCategory: (slug: CategoryType) => void;
  getActor: (slug: string) => Promise<void>;
  getActors: (page?: number, searchText?: string) => Promise<void>;
  // getMoviesByCategory: (slug: string) => Promise<void>;
}

interface IActorsProviderProps {
  children: ReactNode;
}

// Aqui é definido o Context (não precisa entender, é sempre exatamente assim)
export const ActorsContext = createContext<IActorsContextProps>(
  {} as IActorsContextProps
);

// O useBanners() é o que você vai chamar dentro dos componentes pra acessar o conteúdo interno do Provider. Exemplo:
/*
  const { banners, getBanners } = useBanners();
*/
export const useActors = (): IActorsContextProps => {
  const context = useContext(ActorsContext);

  if (!context) {
    throw new Error('useActors must be within ActorsProvider');
  }

  return context;
};

// Aqui são definidas as variáveis de State e as funções do Provider
export const ActorsProvider: React.FC<IActorsProviderProps> = ({
  children,
}) => {
  const [actor, setActor] = useState<ActorType | null>(null);
  const [actors, setActors] = useState<ActorType[]>([]);
  const [pageCount, setPageCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [category, setCategory] = useState<CategoryType | null>(null);
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [isLoading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const getActor = useCallback(async (slug: string): Promise<void> => {
    setLoading(true);
    Api.get(`/actors/${slug}`)
      .then(response => setActor(response.data))
      .catch(() => setActor(null))
      .finally(() => setLoading(false));
  }, []);

  const getActors = useCallback(
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
        const response = await Api.get('/actors', { params });

        setActors(response?.data?.data);
        setPageCount(response?.data?.meta?.last_page);
      } catch (e) {
        if (e instanceof Error) setErrorMessage(e.message);
      } finally {
        setLoading(false);
      }
    },
    []
  );

  // const getMoviesByCategory = useCallback(
  //   async (slug: string): Promise<void> => {
  //     setLoading(true);
  //     Api.get(`/movies/categories/${slug}`)
  //       .then(response => {
  //         setMovies(response.data.collection);
  //         const categoryToFind = categories.find(c => c.slug === slug);
  //         setCategory(categoryToFind ?? null);
  //         setAlreadyGot(false);
  //       })
  //       .catch(() => {
  //         setMovies([]);
  //         setCategory(null);
  //       })
  //       .finally(() => setLoading(false));
  //   },
  //   [categories]
  // );

  // Aqui são definidas quais informações estarão disponíveis "para fora" do Provider
  const providerValue = useMemo(
    () => ({
      actor,
      actors,
      category,
      categories,
      isLoading,
      errorMessage,
      currentPage,
      pageCount,
      setCategory,
      getActor,
      getActors,
      // getActorsByCategory,
    }),
    [
      actor,
      actors,
      category,
      categories,
      isLoading,
      errorMessage,
      currentPage,
      pageCount,
      setCategory,
      getActor,
      getActors,
      // getActorsByCategory,
    ]
  );

  return (
    <ActorsContext.Provider value={providerValue}>
      {children}
    </ActorsContext.Provider>
  );
};
