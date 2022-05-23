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
  getCategories: (
    order_by?: string,
    order?: string,
    page?: number
  ) => Promise<void>;
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

  const getCategories = useCallback(
    // eslint-disable-next-line camelcase
    async (order_by?: string, order?: string, page = 1): Promise<void> => {
      const params: {
        per_page: number;
        page?: number;
        order_by?: string;
        order?: string;
      } = {
        per_page: 6,
        page,
        // eslint-disable-next-line camelcase
        order_by,
        order,
      };
      try {
        setLoading(true);
        setCurrentPage(page);
        setErrorMessage(null);

        const response = await Api.post(`/categories`, { params });
        setCategories(response?.data);
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

  //     const params: { per_page: number; page?: number } = {
  //       per_page: 5,
  //       page,
  //     };

  //     setCurrentPage(page);
  //     setLoading(true);
  //     setErrorMessage(null);

  //       const response = await Api.get('/categories', { params });

  //       setCategories(response?.data?.data);
  //       setPageCount(response?.data?.meta?.last_page);
  //     } catch (e) {
  //       if (e instanceof Error) setErrorMessage(e.message);
  //     } finally {
  //       setLoading(false);
  //     }
  //   },
  //   []
  // );

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
      getCategories,
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
      getCategories,
    ]
  );

  return (
    <CategoriesContext.Provider value={providerValue}>
      {children}
    </CategoriesContext.Provider>
  );
};
