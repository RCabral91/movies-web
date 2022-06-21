import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';
import { MainPage } from '../../components/MainPage';
import Wrapper from '../../components/Wrapper';

export const Home: React.FC = () => (
  <Wrapper>
    <Header />
    <MainPage />
    <Footer />
  </Wrapper>
);
