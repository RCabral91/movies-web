import { AxiosError } from 'axios';
import {
  createContext,
  useCallback,
  useState,
  useContext,
  useMemo,
  ReactNode,
} from 'react';
import { CategoryType } from '../../@types/Category';
import { Api } from '../../services/Api';

// Aqui é definida a Interface com os tipos de dados de tudo que será disponibilizado "para fora" do Provider
interface ICategoriesContextProps {
  category: CategoryType | null;
  categories: CategoryType[];
  isLoading: boolean;
  currentPage: number;
  pageCount: number;
  errorMessage: string | null;
  setCategory: (slug: CategoryType) => void;
  setCategories: (slug: CategoryType[]) => void;
  getCategory: (slug: string) => Promise<void>;
  getCategories: (
    page?: number,
    orderBy?: string,
    order?: string
  ) => Promise<void>;
  createCategory: (name: string) => Promise<boolean>;
  editCategory: (slug: string, name: string) => Promise<boolean>;
  deleteCategory: (slug: string) => Promise<boolean>;
}

interface ICategoriesProviderProps {
  children: ReactNode;
}

// Aqui é definido o Context (não precisa entender, é sempre exatamente assim)
export const CategoriesContext = createContext<ICategoriesContextProps>(
  {} as ICategoriesContextProps
);

// O useBanners() é o que você vai chamar dentro dos componentes pra acessar o conteúdo interno do Provider. Exemplo:
/*
  const { banners, getBanners } = useBanners();
*/
export const useCategories = (): ICategoriesContextProps => {
  const context = useContext(CategoriesContext);

  if (!context) {
    throw new Error('useCategories must be within CategoriesProvider');
  }

  return context;
};

// Aqui são definidas as variáveis de State e as funções do Provider
export const CategoriesProvider: React.FC<ICategoriesProviderProps> = ({
  children,
}) => {
  const [category, setCategory] = useState<CategoryType | null>(null);
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [pageCount, setPageCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [isLoading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const getCategory = useCallback(async (slug: string): Promise<void> => {
    setErrorMessage(null);
    try {
      setLoading(true);
      const response = await Api.get(`/categories/${slug}`);
      setCategory(response?.data);
      setLoading(false);
    } catch (e) {
      setCategory(null);
      setErrorMessage('Error');
    } finally {
      setLoading(false);
    }
  }, []);

  const getCategories = useCallback(
    async (page = 1, orderBy = 'id', order = 'desc'): Promise<void> => {
      const params: {
        page?: number;
        per_page: number;
        orderBy?: string;
        order?: string;
      } = {
        per_page: 6,
        page,
        orderBy,
        order,
      };
      try {
        setLoading(true);
        setCurrentPage(page);
        setErrorMessage(null);

        const response = await Api.get(`/categories`, { params });
        setCategories(response?.data?.data);
        setPageCount(response?.data?.meta?.last_page);
      } catch (e) {
        setCategories([]);
        setCategory(null);
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const createCategory = useCallback(async (name: string): Promise<boolean> => {
    setErrorMessage(null);
    try {
      setLoading(true);
      await Api.post('/categories', {
        name,
      });
      setLoading(false);
      return true;
    } catch (e: unknown) {
      const error = e as AxiosError;
      setLoading(false);
      setErrorMessage(error?.response?.data?.message);
      return false;
    }
  }, []);

  const editCategory = useCallback(
    async (slug: string, name: string): Promise<boolean> => {
      setErrorMessage(null);
      try {
        setLoading(true);
        await Api.patch(`/categories/${slug}`, { name });
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

  const deleteCategory = useCallback(
    async (slug: string): Promise<boolean> => {
      setErrorMessage(null);
      try {
        setLoading(true);
        await Api.delete(`/categories/${slug}`);
        await getCategories();
        setLoading(false);
        return true;
      } catch (e: unknown) {
        const error = e as AxiosError;
        setLoading(false);
        setErrorMessage(error?.response?.data?.message);
        return false;
      }
    },
    [getCategories]
  );

  // Aqui são definidas quais informações estarão disponíveis "para fora" do Provider
  const providerValue = useMemo(
    () => ({
      category,
      categories,
      isLoading,
      errorMessage,
      currentPage,
      pageCount,
      setCategory,
      setCategories,
      getCategory,
      getCategories,
      createCategory,
      editCategory,
      deleteCategory,
    }),
    [
      category,
      categories,
      isLoading,
      errorMessage,
      currentPage,
      pageCount,
      setCategory,
      setCategories,
      getCategory,
      getCategories,
      createCategory,
      editCategory,
      deleteCategory,
    ]
  );

  return (
    <CategoriesContext.Provider value={providerValue}>
      {children}
    </CategoriesContext.Provider>
  );
};
