/* eslint-disable react/jsx-props-no-spreading */
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { RiAddLine } from 'react-icons/ri';
import ReactTags, { Tag } from 'react-tag-autocomplete';
import Container from '../../components/Container';
import { Footer } from '../../components/Footer';
import { Header } from '../../components/Header';
import PageTitle from '../../components/PageTitle';
import Wrapper from '../../components/Wrapper';
import AdminNav from '../../components/AdminNav';
import { useActors } from '../../hooks/ActorsContext';
import { useMovies } from '../../hooks/MoviesContext';

type FormDataType = {
  name: string;
  picture?: string;
  birth_date?: string;
  birth_place?: string;
  biography?: string;
};

const AddActor: React.FC = () => {
  const { addingActor, errorMessage } = useActors();
  const { movies, getMovies } = useMovies();
  const { handleSubmit, register } = useForm<FormDataType>();
  const navigate = useNavigate();

  useEffect(() => {
    getMovies();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const suggestions: Tag[] = useMemo(
    () => movies.map(movie => ({ id: movie.id, name: movie.title })),
    [movies]
  );

  const [tags, setTags] = useState<Tag[]>([]);

  const onDelete = useCallback(
    (tagIndex: number) => {
      setTags(tags.filter((_, i) => i !== tagIndex));
    },
    [tags]
  );

  const onAddition = useCallback(
    (newTag: Tag) => {
      setTags([...tags, newTag]);
    },
    [tags]
  );

  const onSubmit = useCallback(
    async (data: FormDataType) => {
      if (
        await addingActor(
          data.name,
          data.picture ?? '',
          data.birth_date ?? '',
          data.birth_place ?? '',
          data.biography ?? ''
        )
      ) {
        navigate('/admin/actors');
      }
    },
    [addingActor, navigate]
  );

  return (
    <Wrapper>
      <Header />
      <Container>
        <AdminNav />
        <div className="mt-5">
          <PageTitle
            title="Add a new Actor"
            subtitle="All actors"
            url="/admin/actors"
          />
        </div>
        <form
          className="row row-cols-1 align-items-center justify-content-center text-center mt-5"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="col">
            <input
              className="form-control"
              placeholder="Actor`s name"
              type="text"
              {...register('name')}
              required
            />
          </div>
          <div className="mt-4">
            <input
              className="form-control"
              type="text"
              placeholder="Actor`s Pic"
              {...register('picture')}
            />
          </div>
          <div className="col mt-4">
            <input
              className="form-control"
              placeholder="Actor's birth date"
              type="date"
              {...register('birth_date')}
            />
          </div>
          <div className="col mt-4">
            <input
              className="form-control"
              placeholder="Actor's birth place"
              type="text"
              {...register('birth_place')}
            />
          </div>
          <div className="my-3">
            <textarea
              className="form-control"
              placeholder="Biography"
              inputMode="text"
              {...register('biography')}
            />
          </div>
          <div className="my-3 form-control">
            <ReactTags
              tags={tags}
              suggestions={suggestions}
              onDelete={onDelete}
              onAddition={onAddition}
            />
          </div>

          <div className="col mt-4">
            {errorMessage && <p className="text-danger">{errorMessage}</p>}
            <button type="submit" className="btn btn-primary text-white">
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

export default AddActor;
