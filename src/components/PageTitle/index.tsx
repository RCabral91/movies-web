import { MdArrowBack } from 'react-icons/md';
import { Link } from 'react-router-dom';

interface IPageTitleProps {
  title: string;
  label?: string;
  subtitle?: string;
  url?: string;
}

const PageTitle: React.FC<IPageTitleProps> = ({
  title,
  subtitle,
  url = '/',
}) => {
  return (
    <div className="d-flex m-0">
      <Link className="fs-4 fw-bold text-white me-2" to={url}>
        <MdArrowBack />
      </Link>
      <div className="">
        {subtitle && (
          <Link to={url} className="text-decoration-none text-muted fs-6">
            {subtitle}
          </Link>
        )}
        <p className="text-decoration-none text-white fw-bold mb-4 fs-3">
          {title}
        </p>
      </div>
    </div>
  );
};

export default PageTitle;
