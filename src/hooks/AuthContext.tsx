import {
  createContext,
  useCallback,
  useState,
  useContext,
  useMemo,
  ReactNode,
  useEffect,
} from 'react';
import { UserType } from '../@types/User';
import { Api } from '../services/Api';

// Aqui é definida a Interface com os tipos de dados de tudo que será disponibilizado "para fora" do Provider
interface IAuthContextProps {
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  user: UserType | null;
  isLoading: boolean;
}

interface IAuthProviderProps {
  children: ReactNode;
}

// Aqui é definido o Context (não precisa entender, é sempre exatamente assim)
export const AuthContext = createContext<IAuthContextProps>(
  {} as IAuthContextProps
);

// O useBanners() é o que você vai chamar dentro dos componentes pra acessar o conteúdo interno do Provider. Exemplo:

export const useAuth = (): IAuthContextProps => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be within AuthProvider');
  }

  return context;
};

// Aqui são definidas as variáveis de State e as funções do Provider
export const AuthProvider: React.FC<IAuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<UserType | null>(null);
  const [isLoading, setLoading] = useState(true);

  const getUser = useCallback(async (): Promise<void> => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      if (!token) {
        setUser(null);
        return;
      }

      const response = await Api.get('/user');
      setUser(response?.data as UserType);
    } catch (e) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  const login = useCallback(
    async (email: string, password: string): Promise<void> => {
      try {
        setLoading(true);

        const response = await Api.post('/login', { email, password });
        localStorage.setItem('token', response?.data?.token);

        getUser();
      } catch (e) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    },
    [getUser]
  );

  useEffect(() => {
    getUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const logout = useCallback((): void => {
    localStorage.removeItem('token');

    setUser(null);
  }, []);

  // Aqui são definidas quais informações estarão disponíveis "para fora" do Provider
  const providerValue = useMemo(
    () => ({
      login,
      logout,
      user,
      isLoading,
    }),
    [login, logout, user, isLoading]
  );

  return (
    <AuthContext.Provider value={providerValue}>
      {children}
    </AuthContext.Provider>
  );
};
