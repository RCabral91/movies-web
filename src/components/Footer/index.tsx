import { FaYoutube, FaTwitter, FaInstagram, FaFacebook } from 'react-icons/fa';
import { FooterStyles } from './styles';

export const Footer: React.FC = () => {
  return (
    <FooterStyles>
      <div className="container text-white py-5 py-md-3">
        <div className="row">
          <div className="d-flex col-xl-6 mb-4 mb-xl-0">
            <div className="d-flex align-items-center justify-content-center justify-content-xl-start mb-2">
              <a
                href="https://www.facebook.com/"
                target="_blank"
                rel="noreferrer"
              >
                <FaFacebook className="me-3" />
                <span className="d-none d-md-inline">Facebook</span>
              </a>
              <a
                href="https://www.instagram.com/"
                target="_blank"
                rel="noreferrer"
              >
                <FaInstagram className="mx-3" />
                <span className="d-none d-md-inline">Instagram</span>
              </a>
              <a href="https://twitter.com/" target="_blank" rel="noreferrer">
                <FaTwitter className="mx-3" />
                <span className="d-none d-md-inline">Twitter</span>
              </a>
              <a
                href="https://www.youtube.com/"
                target="_blank"
                rel="noreferrer"
              >
                <FaYoutube className="mx-3" />
                <span className="d-none d-md-inline">Youtube</span>
              </a>
            </div>
          </div>

          <p className="mb-1 flex-shrink">
            <a href="/" title="Top Movies" rel="noreferrer">
              Top Movies
            </a>
          </p>
        </div>
      </div>
    </FooterStyles>
  );
};
