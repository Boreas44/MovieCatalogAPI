import { useEffect, useMemo, useState } from 'react';

const initialForm = {
  title: '',
  posterUrl: '',
  description: '',
  director: '',
  actors: '',
  releaseYear: '',
  genre: '',
  imdbRating: '',
};

function App() {
  const [movies, setMovies] = useState([]);
  const [form, setForm] = useState(initialForm);
  const [selectedId, setSelectedId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [activeMovieId, setActiveMovieId] = useState(null);

  const isEditing = useMemo(() => selectedId !== null, [selectedId]);

  async function loadMovies() {
    setLoading(true);
    setMessage('');
    try {
      const response = await fetch('/api/movies');
      const data = await response.json();
      setMovies(data);
      if (data.length > 0) {
        setActiveMovieId((current) => current ?? data[0].id);
      } else {
        setActiveMovieId(null);
      }
    } catch {
      setMessage('Filmler yuklenemedi. API ayakta mi kontrol et.');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadMovies();
  }, []);

  function resetForm() {
    setForm(initialForm);
    setSelectedId(null);
  }

  const activeMovie = useMemo(
    () => movies.find((movie) => movie.id === activeMovieId) ?? null,
    [movies, activeMovieId]
  );

  function mapMovieToPayload(movieForm) {
    return {
      title: movieForm.title,
      posterUrl: movieForm.posterUrl,
      description: movieForm.description,
      director: movieForm.director,
      actors: movieForm.actors
        .split(',')
        .map((actor) => actor.trim())
        .filter(Boolean),
      releaseYear: Number(movieForm.releaseYear),
      genre: movieForm.genre,
      imdbRating: Number(movieForm.imdbRating),
    };
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setMessage('');

    const payload = mapMovieToPayload(form);
    const requestInit = {
      method: isEditing ? 'PUT' : 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(isEditing ? { id: selectedId, ...payload } : payload),
    };

    const path = isEditing ? `/api/movies/${selectedId}` : '/api/movies';

    try {
      const response = await fetch(path, requestInit);
      if (!response.ok) {
        throw new Error('Istek basarisiz.');
      }
      setMessage(isEditing ? 'Film guncellendi.' : 'Film eklendi.');
      resetForm();
      loadMovies();
    } catch {
      setMessage('Islem sirasinda hata olustu.');
    }
  }

  function handleEdit(movie) {
    setActiveMovieId(movie.id);
    setSelectedId(movie.id);
    setForm({
      title: movie.title,
      posterUrl: movie.posterUrl ?? '',
      description: movie.description ?? '',
      director: movie.director,
      actors: movie.actors.join(', '),
      releaseYear: String(movie.releaseYear),
      genre: movie.genre,
      imdbRating: String(movie.imdbRating),
    });
  }

  async function handleDelete(id) {
    setMessage('');
    try {
      const response = await fetch(`/api/movies/${id}`, { method: 'DELETE' });
      if (!response.ok) {
        throw new Error('Silme basarisiz.');
      }
      if (selectedId === id) {
        resetForm();
      }
      if (activeMovieId === id) {
        setActiveMovieId(null);
      }
      setMessage('Film silindi.');
      loadMovies();
    } catch {
      setMessage('Silme sirasinda hata olustu.');
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-100 via-slate-200 to-slate-300 px-4 py-8 text-slate-900">
      <div className="mx-auto w-full max-w-7xl rounded-[2rem] border border-slate-200/80 bg-white/95 p-5 shadow-[0_24px_70px_rgba(30,41,59,0.22)] backdrop-blur">
        <div className="mx-auto mb-4 h-1.5 w-28 rounded-full bg-slate-300" />
        <header className="mb-6 rounded-2xl border border-blue-200 bg-gradient-to-r from-blue-500 via-blue-400 to-sky-400 p-6 text-white">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <p className="bg-gradient-to-r from-white via-slate-100 to-blue-100 bg-clip-text text-xs uppercase tracking-[0.25em] text-transparent">
                Movie Catalog
              </p>
              <h1 className="mt-2 bg-gradient-to-r from-white via-slate-100 to-blue-100 bg-clip-text text-2xl font-bold text-transparent">
                Movie Library
              </h1>
            </div>
            <a
              href="https://github.com/Boreas44/MovieCatalogAPI"
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-w-[380px] items-center justify-center gap-3 rounded-full border-2 border-black/70 bg-black px-8 py-3.5 text-lg text-white shadow-lg transition hover:bg-zinc-900"
            >
              <svg viewBox="0 0 24 24" aria-hidden="true" className="h-8 w-8 fill-current">
                <path d="M12 2C6.48 2 2 6.58 2 12.25c0 4.53 2.87 8.37 6.84 9.73.5.1.68-.22.68-.49 0-.24-.01-1.04-.01-1.88-2.78.62-3.37-1.22-3.37-1.22-.45-1.18-1.11-1.49-1.11-1.49-.91-.64.07-.63.07-.63 1 .07 1.53 1.06 1.53 1.06.9 1.58 2.35 1.12 2.92.86.09-.67.35-1.12.63-1.38-2.22-.26-4.56-1.15-4.56-5.12 0-1.13.39-2.06 1.03-2.79-.1-.26-.45-1.31.1-2.73 0 0 .84-.28 2.75 1.06A9.3 9.3 0 0 1 12 7.2c.85 0 1.71.12 2.51.35 1.9-1.34 2.74-1.06 2.74-1.06.55 1.42.2 2.47.1 2.73.64.73 1.03 1.66 1.03 2.79 0 3.98-2.34 4.85-4.57 5.11.36.32.68.95.68 1.92 0 1.39-.01 2.5-.01 2.84 0 .27.18.6.69.49A10.22 10.22 0 0 0 22 12.25C22 6.58 17.52 2 12 2Z" />
              </svg>
              BTBS498 TASK 3 GitHub Linki
            </a>
          </div>
        </header>

        <section className="mb-4 rounded-2xl border border-blue-200 bg-white p-3">
          {activeMovie ? (
            <div className="grid gap-3 lg:grid-cols-[260px_1fr]">
              <img
                src={activeMovie.posterUrl || 'https://placehold.co/600x900/111111/FACC15?text=No+Poster'}
                alt={`${activeMovie.title} poster`}
                className="h-[300px] w-full rounded-xl object-cover lg:h-[360px]"
                onError={(event) => {
                  event.currentTarget.src = 'https://placehold.co/600x900/111111/FACC15?text=Poster+Error';
                }}
              />
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h2 className="text-xl font-bold text-slate-900">{activeMovie.title}</h2>
                  <span className="rounded-full border border-blue-300 bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
                    {activeMovie.genre || 'Tur girilmedi'}
                  </span>
                </div>
                <p className="mt-3 text-slate-700">
                  <span className="font-semibold text-slate-900">Yonetmen:</span> {activeMovie.director}
                </p>
                <p className="mt-1 text-slate-700">
                  <span className="font-semibold text-slate-900">Oyuncular:</span>{' '}
                  {activeMovie.actors?.join(', ') || '-'}
                </p>
                <p className="mt-3 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-700">
                  {activeMovie.description || 'Bu film icin aciklama eklenmedi.'}
                </p>
                <div className="mt-4 flex flex-wrap gap-2 text-sm">
                  <span className="rounded-md border border-slate-500 bg-slate-100 px-3 py-1 text-slate-800">
                    Yil: {activeMovie.releaseYear}
                  </span>
                  <span className="rounded-md border border-slate-500 bg-slate-100 px-3 py-1 text-slate-800">
                    IMDb: {activeMovie.imdbRating}
                  </span>
                  <span className="rounded-md border border-slate-500 bg-slate-100 px-3 py-1 text-slate-800">
                    ID: {activeMovie.id}
                  </span>
                </div>
              </div>
            </div>
          ) : (
            <p className="text-slate-600">Gosterilecek film yok.</p>
          )}
        </section>

        <section className="mb-4 rounded-[1.75rem] border border-blue-100 bg-white p-4 text-slate-900 shadow-[0_14px_40px_rgba(59,130,246,0.14)] backdrop-blur-md">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
            <h3 className="bg-gradient-to-r from-blue-700 to-slate-700 bg-clip-text text-xl font-bold text-transparent">
              Film Formu
            </h3>
            <div className="flex gap-2">
              <button
                type="submit"
                form="movie-form"
                className="rounded-full bg-blue-500 px-4 py-2 font-semibold text-white shadow-sm transition hover:bg-blue-600 active:scale-[0.98]"
              >
                {isEditing ? 'Guncelle' : 'Ekle'}
              </button>
              <button
                type="button"
                className="rounded-full border border-slate-300 px-4 py-2 text-slate-700 transition hover:bg-slate-100 active:scale-[0.98]"
                onClick={resetForm}
              >
                Temizle
              </button>
            </div>
          </div>

          <form id="movie-form" className="grid gap-2.5 rounded-3xl border border-slate-200 bg-slate-50/80 p-3 md:grid-cols-2 xl:grid-cols-4" onSubmit={handleSubmit}>
            <input
              className="rounded-xl border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-500"
              placeholder="Film adi"
              value={form.title}
              onChange={(event) => setForm({ ...form, title: event.target.value })}
              required
            />
            <input
              className="rounded-xl border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-500"
              placeholder="Poster URL"
              value={form.posterUrl}
              onChange={(event) => setForm({ ...form, posterUrl: event.target.value })}
              required
            />
            <textarea
              className="rounded-xl border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-500 md:col-span-2 xl:col-span-2"
              placeholder="Aciklama (Turkce yazabilirsin)"
              rows={3}
              value={form.description}
              onChange={(event) => setForm({ ...form, description: event.target.value })}
              required
            />
            <input
              className="rounded-xl border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-500"
              placeholder="Yonetmen"
              value={form.director}
              onChange={(event) => setForm({ ...form, director: event.target.value })}
              required
            />
            <input
              className="rounded-xl border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-500"
              placeholder="Oyuncular (virgulle ayir)"
              value={form.actors}
              onChange={(event) => setForm({ ...form, actors: event.target.value })}
              required
            />
            <div className="grid grid-cols-2 gap-2.5 md:col-span-2 xl:col-span-1">
              <input
                className="rounded-xl border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-500"
                placeholder="Yil"
                type="number"
                value={form.releaseYear}
                onChange={(event) => setForm({ ...form, releaseYear: event.target.value })}
                required
              />
              <input
                className="rounded-xl border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-500"
                placeholder="IMDB"
                step="0.1"
                type="number"
                value={form.imdbRating}
                onChange={(event) => setForm({ ...form, imdbRating: event.target.value })}
                required
              />
            </div>
            <input
              className="rounded-xl border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-500 md:col-span-2 xl:col-span-1"
              placeholder="Tur (Orn: Sci-Fi, Drama)"
              value={form.genre}
              onChange={(event) => setForm({ ...form, genre: event.target.value })}
              required
            />
          </form>

          {message && <p className="mt-4 text-sm font-medium text-slate-700">{message}</p>}
        </section>

        <section className="rounded-2xl border border-blue-200 bg-white p-4 shadow-xl">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-lg font-semibold text-blue-700">Filmler</h3>
            <button
              className="rounded-full border border-blue-400 px-3 py-1 text-sm text-blue-700 transition hover:bg-blue-500 hover:text-white active:scale-[0.98]"
              onClick={loadMovies}
            >
              Yenile
            </button>
          </div>

          {loading ? (
            <p className="text-slate-600">Yukleniyor...</p>
          ) : (
            <div className="grid gap-2.5 md:grid-cols-2 xl:grid-cols-3">
              {movies.map((movie) => (
                <article
                  key={movie.id}
                  className={`rounded-xl border p-2.5 text-zinc-100 transition ${
                    movie.id === activeMovieId
                      ? 'border-blue-400 bg-blue-50'
                      : 'border-slate-200 bg-slate-50'
                  }`}
                  onClick={() => setActiveMovieId(movie.id)}
                >
                  <div className="flex gap-3">
                    <img
                      src={movie.posterUrl || 'https://placehold.co/600x900/111111/FACC15?text=No+Poster'}
                      alt={`${movie.title} poster`}
                      className="h-36 w-24 shrink-0 rounded-lg bg-zinc-950 object-contain p-1"
                      onError={(event) => {
                        event.currentTarget.src =
                          'https://placehold.co/600x900/111111/FACC15?text=Poster+Error';
                      }}
                    />
                    <div className="min-w-0 flex-1">
                      <div className="mb-2 flex items-center justify-between gap-2">
                        <h4 className="truncate text-base font-semibold text-blue-700">{movie.title}</h4>
                        <span className="text-xs text-slate-500">#{movie.id}</span>
                      </div>
                      <p className="text-xs text-slate-700">
                        <strong>Yonetmen:</strong> {movie.director}
                      </p>
                      <p className="mt-1 inline-block rounded bg-blue-100 px-2 py-1 text-xs font-semibold text-blue-700">
                        {movie.genre || 'Tur girilmedi'}
                      </p>
                      <p className="mt-2 text-xs text-slate-600">
                        Yil: {movie.releaseYear} | IMDb: {movie.imdbRating}
                      </p>
                      <p className="mt-2 line-clamp-2 text-xs text-slate-600">
                        {movie.description || 'Aciklama yok.'}
                      </p>
                      <div className="mt-3 flex gap-2">
                        <button
                          className="rounded-full bg-blue-500 px-2.5 py-1 text-xs font-semibold text-white transition hover:bg-blue-600 active:scale-[0.98]"
                          onClick={(event) => {
                            event.stopPropagation();
                            handleEdit(movie);
                          }}
                        >
                          Düzenle
                        </button>
                        <button
                          className="rounded-full border border-red-400 px-2.5 py-1 text-xs text-red-300 transition hover:bg-red-500 hover:text-white active:scale-[0.98]"
                          onClick={(event) => {
                            event.stopPropagation();
                            handleDelete(movie.id);
                          }}
                        >
                          Sil
                        </button>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}

export default App;
