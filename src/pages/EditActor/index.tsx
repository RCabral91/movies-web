/* eslint-disable react/jsx-props-no-spreading */
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import ReactTags, { Tag } from 'react-tag-autocomplete';
import Container from '../../components/Container';
import { Footer } from '../../components/Footer';
import { Header } from '../../components/Header';
import PageTitle from '../../components/PageTitle';
import Wrapper from '../../components/Wrapper';
import AdminNav from '../../components/AdminNav';
import { setTitle } from '../../utils/title';
import { useActors } from '../../hooks/ActorsContext';
import { useMovies } from '../../hooks/MoviesContext';

type FormDataType = {
  name: string;
  picture?: string;
  birth_date?: string;
  birth_place?: string;
  biography?: string;
};

const EditActor: React.FC = () => {
  const { errorMessage, actor, isLoading, getActor, editActor } = useActors();
  const { movies, getMovies } = useMovies();
  const { handleSubmit, register, setValue } = useForm<FormDataType>();
  const { slug } = useParams();
  const navigate = useNavigate();

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
        await editActor(
          slug ?? '',
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
    [editActor, navigate, slug]
  );

  useEffect(() => {
    setTitle(`${!isLoading ? actor?.name : 'Loading...'} | Your actor`);
    setValue('name', actor?.name ?? '');
    setValue('picture', actor?.picture ?? '');
    setValue('birth_date', actor?.birth_date ?? '');
    setValue('birth_place', actor?.birth_place ?? '');
    setValue('biography', actor?.biography ?? '');
  }, [actor, isLoading, setValue]);

  useEffect(() => {
    if (slug) getActor(slug);
    getMovies();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getActor, slug]);

  return (
    <Wrapper>
      <Header />
      <Container>
        <AdminNav />
        <div className="mt-5">
          <PageTitle
            title={actor?.name ?? 'Carregando...'}
            subtitle="All actors"
            url="/admin/actors"
          />
        </div>
        <form className="text-center mt-5" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <input className="form-control" type="text" {...register('name')} />
          </div>
          <div className="mt-4">
            <input
              className="form-control"
              type="text"
              placeholder="Actor`s Pic"
              {...register('picture')}
            />
          </div>
          <div className="mt-4">
            <div>
              <input
                className="form-control"
                placeholder="Actor's birth date"
                type="date"
                {...register('birth_date')}
              />
            </div>
            <div className="mt-4">
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
                placeholder="Actor's biography"
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

export default EditActor;
