import { useCallback, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import Container from '../../components/Container';
import { Footer } from '../../components/Footer';
import { Header } from '../../components/Header';
import PageTitle from '../../components/PageTitle';
import Wrapper from '../../components/Wrapper';
import { useCategories } from '../../hooks/Admin/CategoryContext';
import AdminNav from '../../components/AdminNav';
import { setTitle } from '../../utils/title';

type FormDataType = {
  name: string;
};

const EditCategory: React.FC = () => {
  const { errorMessage, category, isLoading, getCategory, editCategory } =
    useCategories();
  const { handleSubmit, register, setValue } = useForm<FormDataType>();
  const { slug } = useParams();
  const navigate = useNavigate();

  const onSubmit = useCallback(
    async (data: FormDataType) => {
      if (await editCategory(slug ?? '', data.name)) {
        navigate('/admin/categories');
      }
    },
    [editCategory, navigate, slug]
  );

  useEffect(() => {
    setTitle(`${!isLoading ? category?.name : 'Loading...'} | Your category`);
    setValue('name', category?.name ?? '');
  }, [category, isLoading, setValue]);

  useEffect(() => {
    if (slug) getCategory(slug);
  }, [getCategory, slug]);

  return (
    <Wrapper>
      <Header />
      <Container>
        <AdminNav />
        <div className="mt-5">
          <PageTitle
            title={category?.name ?? 'Carregando...'}
            subtitle="All categories"
            url="/admin/categories"
          />
        </div>
        <form
          className="row row-cols-1 align-items-center justify-content-center text-center mt-5"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="col">
            <input
              type="text"
              // eslint-disable-next-line react/jsx-props-no-spreading
              {...register('name')}
            />
          </div>
          <div className="col mt-4">
            {errorMessage && <p className="text-danger">{errorMessage}</p>}
            <button
              type="submit"
              className="btn btn-primary align-items-center text-white"
            >
              <span>Edit</span>
            </button>
          </div>
        </form>
      </Container>
      <Footer />
    </Wrapper>
  );
};

export default EditCategory;
