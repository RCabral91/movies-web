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
import { useMovies } from '../../hooks/MoviesContext';
import { useActors } from '../../hooks/ActorsContext';

type FormDataType = {
  title: string;
  director?: string;
  year?: number;
  duration?: number;
  score?: number;
  cover?: string;
  trailer?: string;
  description?: string;
};

const EditMovie: React.FC = () => {
  const { errorMessage, movie, isLoading, getMovie, editMovie } = useMovies();
  const { actors, getActors } = useActors();
  const { handleSubmit, register, setValue } = useForm<FormDataType>();
  const { slug } = useParams();
  const navigate = useNavigate();

  const suggestions: Tag[] = useMemo(
    () => actors.map(actor => ({ id: actor.id, name: actor.name })),
    [actors]
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
        await editMovie(
          data.title,
          slug ?? '',
          data.director,
          data.year,
          data.duration,
          data.score,
          data.cover,
          data.trailer,
          data.description
        )
      ) {
        navigate('/admin/movies');
      }
    },
    [editMovie, navigate, slug]
  );

  useEffect(() => {
    setTitle(`${!isLoading ? movie?.title : 'Loading...'} | Your movie`);
    setValue('title', movie?.title ?? '');
    setValue('director', movie?.director);
    setValue('year', movie?.year);
    setValue('duration', movie?.duration);
    setValue('score', movie?.score);
    setValue('cover', movie?.cover);
    setValue('trailer', movie?.trailer);
    setValue('description', movie?.description);
  }, [movie, isLoading, setValue]);

  useEffect(() => {
    if (slug) getMovie(slug);
    getActors();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getMovie, slug]);

  return (
    <Wrapper>
      <Header />
      <Container>
        <AdminNav />
        <div className="mt-5">
          <PageTitle
            title={movie?.title ?? 'Carregando...'}
            subtitle="All movies"
            url="/admin/movies"
          />
        </div>
        <form
          className="row row-cols-1 align-items-center justify-content-center text-center mt-5"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="col">
            <input
              className="form-control"
              type="text"
              {...register('title')}
            />
          </div>

          <div className="mt-4">
            <div>
              <input
                className="form-control"
                placeholder="Movie's Director"
                type="text"
                {...register('director')}
              />
            </div>

            <div className="mt-4">
              <input
                className="form-control"
                placeholder="Movie's year"
                type="number"
                {...register('year')}
              />
            </div>

            <div className="mt-4">
              <input
                className="form-control"
                placeholder="Movie's duration"
                type="number"
                {...register('duration')}
              />
            </div>

            <div className="mt-4">
              <input
                className="form-control"
                placeholder="Movie's score"
                type="number"
                {...register('score')}
              />
            </div>

            <div className="mt-4">
              <input
                className="form-control"
                placeholder="Movie's cover"
                type="text"
                {...register('cover')}
              />
            </div>

            <div className="mt-4">
              <input
                className="form-control"
                placeholder="Movie's trailer"
                type="text"
                {...register('trailer')}
              />
            </div>
          </div>

          <div className="my-3">
            <textarea
              className="form-control"
              placeholder="Description"
              inputMode="text"
              {...register('description')}
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

export default EditMovie;
