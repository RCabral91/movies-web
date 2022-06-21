import { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { RiAddLine } from 'react-icons/ri';
import Container from '../../components/Container';
import { Footer } from '../../components/Footer';
import { Header } from '../../components/Header';
import PageTitle from '../../components/PageTitle';
import Wrapper from '../../components/Wrapper';
import { useCategories } from '../../hooks/Admin/CategoryContext';
import AdminNav from '../../components/AdminNav';

type FormDataType = {
  name: string;
};

const AddCategory: React.FC = () => {
  const { createCategory, errorMessage } = useCategories();
  const { handleSubmit, register } = useForm<FormDataType>();
  const navigate = useNavigate();

  const onSubmit = useCallback(
    async (data: FormDataType) => {
      if (await createCategory(data.name)) {
        navigate('/admin/categories');
      }
    },
    [createCategory, navigate]
  );

  return (
    <Wrapper>
      <Header />
      <Container>
        <AdminNav />
        <div className="mt-5">
          <PageTitle
            title="Add a new Category"
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
              placeholder="Category`s name"
              type="text"
              // eslint-disable-next-line react/jsx-props-no-spreading
              {...register('name')}
              required
            />
          </div>
          <div className="col mt-4">
            {errorMessage && <p className="text-danger">{errorMessage}</p>}
            <button
              type="submit"
              className="btn btn-primary align-items-center text-white"
            >
              <span>
                <RiAddLine />
              </span>
              <span>Add</span>
            </button>
          </div>
        </form>
      </Container>
      <Footer />
    </Wrapper>
  );
};

export default AddCategory;
