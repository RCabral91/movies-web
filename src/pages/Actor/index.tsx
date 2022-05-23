import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ActorInfo from '../../components/ActorInfo';
import Container from '../../components/Container';
import { Footer } from '../../components/Footer';
import { Header } from '../../components/Header';
import PageTitle from '../../components/PageTitle';
import Wrapper from '../../components/Wrapper';
import { useActors } from '../../hooks/ActorsContext';
import { setTitle } from '../../utils/title';

const Actor: React.FC = () => {
  const { actor, getActor } = useActors();
  const { slug } = useParams();

  useEffect(() => {
    getActor(slug ?? '');
    window.scrollTo(0, 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setTitle(`${actor?.name ?? 'Loading...'} | Your actor`);
  }, [actor]);

  return (
    <Wrapper>
      <Header />
      <Container>
        <div className="d-flex text-white mt-3">
          <PageTitle
            title={actor?.name ?? 'Carregando...'}
            subtitle="Actor"
            url="/actors"
          />
        </div>
        {actor && <ActorInfo contents={actor} />}
      </Container>
      <Footer />
    </Wrapper>
  );
};

export default Actor;
