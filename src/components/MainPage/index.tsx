import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { setTitle } from '../../utils/title';
import fotoFilmeCard from '../../assets/fotoFilmeCard.jpg';
import fotoAtorCard from '../../assets/fotoAtorCard.jpg';
import { ImgCard } from './styles';
import Wrapper from '../Wrapper';

export const MainPage: React.FC = () => {
  useEffect(() => {
    setTitle('Top Movies | The best movies are here');
    window.scrollTo(0, 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Wrapper>
      <div className="container">
        <div className="row row-cols-1 row-cols-lg-2 g-2 m-4 stretch-items- justify-content-center">
          <div className="col">
            <div className="h-100 w-100 text-center d-flex pt-3 color-white">
              <div className="card-body d-flex flex-column">
                <div className="card text-center">
                  <ImgCard style={{ backgroundImage: `url(${fotoFilmeCard})` }}>
                    <Link to="/movies" title="Movies" />
                  </ImgCard>
                  <div className="card-body">
                    <h5 className="card-title">Check out the best movies.</h5>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col">
            <div className="h-100 w-100 text-center d-flex flex-column pt-3 color-white">
              <div className="card-body d-flex flex-column">
                <div className="card text-center h-100">
                  <ImgCard style={{ backgroundImage: `url(${fotoAtorCard})` }}>
                    <Link to="/actors" title="Movies" />
                  </ImgCard>
                  <div className="card-body">
                    <h5 className="card-text">
                      Know more about your favorite actor.
                    </h5>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};
