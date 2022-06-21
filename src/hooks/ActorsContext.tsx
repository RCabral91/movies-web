/* eslint-disable camelcase */
import { AxiosError } from 'axios';
import {
  createContext,
  useCallback,
  useState,
  useContext,
  useMemo,
  ReactNode,
} from 'react';
import { ActorType } from '../@types/Actor';
import { CategoryType } from '../@types/Category';
import { Api } from '../services/Api';

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
  getActors: (
    page?: number,
    searchText?: string,
    orderBy?: string,
    order?: string
  ) => Promise<void>;
  addingActor: (
    name: string,
    picture: string,
    birth_date: string,
    birth_place: string,
    biography: string
  ) => Promise<boolean>;
  editActor: (
    slug: string,
    name: string,
    picture: string,
    birth_date: string,
    birth_place: string,
    biography: string
  ) => Promise<boolean>;
  deleteActor: (slug: string) => Promise<boolean>;
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
  const [categories] = useState<CategoryType[]>([]);
  const [isLoading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const getActor = useCallback(async (slug: string): Promise<void> => {
    setErrorMessage(null);
    try {
      setLoading(true);
      const response = await Api.get(`/actors/${slug}`);
      setActor(response?.data);
      setLoading(false);
    } catch (e) {
      setActor(null);
      setErrorMessage('Error');
    } finally {
      setLoading(false);
    }
  }, []);

  const getActors = useCallback(
    async (
      page = 1,
      searchText = '',
      orderBy = 'name',
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

  const addingActor = useCallback(
    async (
      name: string,
      picture: string,
      birth_date: string,
      birth_place: string,
      biography: string
    ): Promise<boolean> => {
      setErrorMessage(null);
      try {
        setLoading(true);
        await Api.post('/actors', {
          name,
          picture,
          birth_date,
          birth_place,
          biography,
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

  const editActor = useCallback(
    async (
      slug: string,
      name: string,
      picture: string,
      birth_date: string,
      birth_place: string,
      biography: string
    ): Promise<boolean> => {
      setErrorMessage(null);
      try {
        setLoading(true);
        await Api.patch(`/actors/${slug}`, {
          name,
          picture,
          birth_date,
          birth_place,
          biography,
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

  const deleteActor = useCallback(
    async (slug: string): Promise<boolean> => {
      setErrorMessage(null);
      try {
        setLoading(true);
        await Api.delete(`/actors/${slug}`);
        await getActors();
        setLoading(false);
        return true;
      } catch (e: unknown) {
        const error = e as AxiosError;
        setLoading(false);
        setErrorMessage(error?.response?.data?.message);
        return false;
      }
    },
    [getActors]
  );

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
      addingActor,
      editActor,
      deleteActor,
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
      addingActor,
      editActor,
      deleteActor,
    ]
  );

  return (
    <ActorsContext.Provider value={providerValue}>
      {children}
    </ActorsContext.Provider>
  );
};
