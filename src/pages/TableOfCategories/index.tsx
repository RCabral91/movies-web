import { useEffect } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useCategories } from '../../hooks/Admin/CategoryContext';
import { useAuth } from '../../hooks/AuthContext';
import Container from '../../components/Container';
import { Footer } from '../../components/Footer';
import { Header } from '../../components/Header';
import Wrapper from '../../components/Wrapper';
import PageTitle from '../../components/PageTitle';
import Pagination from '../../components/Pagination';
import { setTitle } from '../../utils/title';
import AdminNav from '../../components/AdminNav';

const TableOfCategories: React.FC = () => {
  const { categories, getCategories, deleteCategory, pageCount, currentPage } =
    useCategories();
  const { user, isLoading } = useAuth();

  useEffect(() => {
    getCategories();
    setTitle('Categories');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handlePageChange = (event: { selected: number }): Promise<void> =>
    getCategories(event.selected + 1);

  if (isLoading) {
    return <h1>Loading...</h1>;
  }
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <Wrapper>
      <Header />
      <Container>
        <AdminNav />
        <div className="d-flex align-items-center text-white mb-4 justify-content-between">
          <PageTitle
            title={'Categories' ?? 'Carregando...'}
            subtitle="Admin"
            url="/admin"
          />
        </div>
        <table className="table text-white">
          <thead>
            <tr>
              <th scope="col" style={{ width: '65px' }}>
                #
              </th>
              <th scope="col">
                Categories
                <Link to="/categories" className="btn btn-primary btn-sm ms-3">
                  Add
                </Link>
              </th>
              <th scope="col" className="text-end" style={{ width: '65px' }}>
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(categories) &&
              categories.map(category => {
                return (
                  <tr key={category.id}>
                    <th scope="row">{category.id}</th>
                    <td>{category.name}</td>
                    <td className="text-end d-flex">
                      <Link
                        to={`/admin/categories/${category.slug}/edit`}
                        type="button"
                        className="btn btn-primary btn-sm me-1 my-1"
                      >
                        Edit
                      </Link>
                      /
                      <button
                        type="button"
                        className="btn btn-primary btn-sm ms-1 my-1"
                        onClick={() => deleteCategory(category.name)}
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
        {pageCount > 1 && (
          <Pagination
            className="m-3"
            forcePage={currentPage - 1}
            pageCount={pageCount}
            onPageChange={handlePageChange}
          />
        )}
      </Container>
      <Footer />
    </Wrapper>
  );
};

export default TableOfCategories;
