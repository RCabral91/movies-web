import { useEffect } from 'react';
import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';
import Container from '../../components/Container';
import { SearchInput } from '../../components/SearchInput';
import { setTitle } from '../../utils/title';
import PageTitle from '../../components/PageTitle';
import Pagination from '../../components/Pagination';
import LoadingCards from '../../components/LoadingCards';
import LoadingGate from '../../components/LoadingGate';
import ActorCard from '../../components/ActorCard';
import { useActors } from '../../hooks/ActorsContext';

const Actors: React.FC = () => {
  const { actors, currentPage, pageCount, isLoading, getActors } = useActors();

  useEffect(() => {
    getActors();
    setTitle('All your actors');
    window.scrollTo(0, 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSearch = (searchText: string): void => {
    getActors(1, searchText);
  };

  const handlePageChange = (event: { selected: number }): Promise<void> =>
    getActors(event.selected + 1);

  return (
    <>
      <Header />
      <LoadingGate
        waitFor={isLoading === false}
        meanwhile={<LoadingCards show amount={3} />}
      />
      <Container>
        <div className="row pt-3 pt-md-4 pb-4">
          <div className="col-md-6">
            <div className="d-flex text-white align-items-center mb-4 mb-md-0">
              <PageTitle title="Actors" />
            </div>
          </div>
          <div className="d-flex col-md-6 g-3">
            <div className="me-3" />
            <div className="flex-grow-1">
              <SearchInput
                onSearch={handleSearch}
                placeholder="Find your favorite actor..."
              />
            </div>
          </div>
        </div>

        {isLoading ? (
          <p>Loading</p>
        ) : (
          <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 ps-2">
            {actors.map(actor => {
              return (
                <div
                  key={actor.slug}
                  className="col align-items-stretch d-flex"
                >
                  <ActorCard actor={actor} />
                </div>
              );
            })}
          </div>
        )}

        {pageCount > 1 && (
          <Pagination
            forcePage={currentPage - 1}
            pageCount={pageCount}
            onPageChange={handlePageChange}
          />
        )}
      </Container>
      <Footer />
    </>
  );
};

export default Actors;
