using MovieLibraryAPI.Models;

namespace MovieLibraryAPI.Services;

public class MovieService : IMovieService
{
    private readonly List<Movie> _movies =
    [
        new Movie
        {
            Id = 1,
            Title = "Seven",
            PosterUrl = "https://image.tmdb.org/t/p/w500/6yoghtyTpznpBik8EngEmJskVUO.jpg",
            Description = "Iki dedektifin yedi olumcul gunaha gore cinayet isleyen bir seri katilin pesindeki karanlik ve gerilim dolu hikayesini anlatir.",
            Director = "David Fincher",
            Genre = "Crime, Thriller",
            ReleaseYear = 1995,
            ImdbRating = 8.6,
            Actors = ["Brad Pitt", "Morgan Freeman", "Gwyneth Paltrow"]
        },
        new Movie
        {
            Id = 2,
            Title = "Fight Club",
            PosterUrl = "https://image.tmdb.org/t/p/w500/pB8BM7pdSp6B6Ih7QZ4DrQ3PmJK.jpg",
            Description = "Hayatindan bunalmis bir adamin gizemli bir karakterle tanisip siradisi bir yer alti kulubu kurmasiyla kontrolunu kaybettigi sureci anlatir.",
            Director = "David Fincher",
            Genre = "Drama",
            ReleaseYear = 1999,
            ImdbRating = 8.8,
            Actors = ["Brad Pitt", "Edward Norton", "Helena Bonham Carter"]
        },
        new Movie
        {
            Id = 3,
            Title = "Ironman",
            PosterUrl = "https://image.tmdb.org/t/p/w500/78lPtwv72eTNqFW9COBYI0dWDJa.jpg",
            Description = "Dahi mucit Tony Stark'in kacirildiktan sonra gelistirdigi zirh ile kahramana donusmesini ve yeni bir sorumluluk ustlenmesini konu alir.",
            Director = "Jon Favreau",
            Genre = "Action, Sci-Fi",
            ReleaseYear = 2008,
            ImdbRating = 7.9,
            Actors = ["Robert Downey Jr.", "Gwyneth Paltrow", "Jeff Bridges"]
        },
        new Movie
        {
            Id = 4,
            Title = "Charlies Angels",
            PosterUrl = "https://i.ebayimg.com/images/g/DbgAAOSwv-Rl2NcD/s-l1200.jpg",
            Description = "Uc yetenekli ajan, gizli gorevlerde yuksek teknoloji ve cesur operasyonlarla adaleti saglamaya calisir.",
            Director = "McG",
            Genre = "Action, Comedy",
            ReleaseYear = 2000,
            ImdbRating = 5.6,
            Actors = ["Cameron Diaz", "Drew Barrymore", "Lucy Liu"]
        },
        new Movie
        {
            Id = 5,
            Title = "I Am Legend",
            PosterUrl = "https://image.tmdb.org/t/p/w500/iPDkaSdKk2jRLTM65UOEoKtsIZ8.jpg",
            Description = "Kuresel bir salgin sonrasi New York'ta yalniz kalan bir bilim insaninin hayatta kalma ve tedavi bulma mucadelesini anlatir.",
            Director = "Francis Lawrence",
            Genre = "Sci-Fi, Thriller",
            ReleaseYear = 2007,
            ImdbRating = 7.2,
            Actors = ["Will Smith", "Alice Braga", "Charlie Tahan"]
        },
        new Movie
        {
            Id = 6,
            Title = "Titanic",
            PosterUrl = "https://image.tmdb.org/t/p/w500/9xjZS2rlVxm8SFx8kPC3aIGCOYQ.jpg",
            Description = "Farkli dunyalardan gelen iki gencin Titanic yolculugunda buyuk bir aska tutulmasini ve facianin ortasinda hayatta kalma savasini isler.",
            Director = "James Cameron",
            Genre = "Romance, Drama",
            ReleaseYear = 1997,
            ImdbRating = 7.9,
            Actors = ["Leonardo DiCaprio", "Kate Winslet", "Billy Zane"]
        },
        new Movie
        {
            Id = 7,
            Title = "Şirinler",
            PosterUrl = "https://upload.wikimedia.org/wikipedia/en/1/11/TheSmurfs2011Poster.jpg",
            Description = "Kotu buyucu Gargamel'den kacarken insanlarin dunyasina dusen Sirinler'in evlerine donme cabasini eglenceli bir dille anlatir.",
            Director = "Raja Gosnell",
            Genre = "Animation, Family",
            ReleaseYear = 2011,
            ImdbRating = 5.4,
            Actors = ["Neil Patrick Harris", "Jayma Mays", "Hank Azaria"]
        },
        new Movie
        {
            Id = 8,
            Title = "The Shawshank Redemption",
            PosterUrl = "https://image.tmdb.org/t/p/w500/q6y0Go1tsGEsmtFryDOJo3dEmqu.jpg",
            Description = "Masum oldugunu savunan bir mahkumun umudunu kaybetmeden yillarca suren ozgurluk arayisini etkileyici bir sekilde aktarir.",
            Director = "Frank Darabont",
            Genre = "Drama",
            ReleaseYear = 1994,
            ImdbRating = 9.3,
            Actors = ["Tim Robbins", "Morgan Freeman", "Bob Gunton"]
        },
        new Movie
        {
            Id = 9,
            Title = "The Godfather",
            PosterUrl = "https://image.tmdb.org/t/p/w500/3bhkrj58Vtu7enYsRolD1fZdja1.jpg",
            Description = "Corleone ailesinin guc, sadakat ve ihanet ekseninde sekillenen mafya dunyasini sinema tarihine damga vuran bir anlatimla sunar.",
            Director = "Francis Ford Coppola",
            Genre = "Crime, Drama",
            ReleaseYear = 1972,
            ImdbRating = 9.2,
            Actors = ["Marlon Brando", "Al Pacino", "James Caan"]
        },
        new Movie
        {
            Id = 10,
            Title = "The Dark Knight",
            PosterUrl = "https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
            Description = "Batman'in Gotham'i kaosa surukleyen Joker'e karsi verdigi savas, kahramanligin bedelini sorgulatan sert bir hikaye sunar.",
            Director = "Christopher Nolan",
            Genre = "Action, Crime",
            ReleaseYear = 2008,
            ImdbRating = 9.0,
            Actors = ["Christian Bale", "Heath Ledger", "Aaron Eckhart"]
        },
        new Movie
        {
            Id = 11,
            Title = "The Lord of the Rings: The Return of the King",
            PosterUrl = "https://image.tmdb.org/t/p/w500/rCzpDGLbOoPwLjy3OAm5NUPOTrC.jpg",
            Description = "Orta Dunya'nin kaderini belirleyecek son savasta dostluk, fedakarlik ve cesaretin zirveye ciktigi epik finali anlatir.",
            Director = "Peter Jackson",
            Genre = "Adventure, Fantasy",
            ReleaseYear = 2003,
            ImdbRating = 9.0,
            Actors = ["Elijah Wood", "Viggo Mortensen", "Ian McKellen"]
        },
        new Movie
        {
            Id = 12,
            Title = "Pulp Fiction",
            PosterUrl = "https://image.tmdb.org/t/p/w500/d5iIlFn5s0ImszYzBPb8JPIfbXD.jpg",
            Description = "Birbirine bagli suclu karakterlerin hikayelerini zaman cizgisiyle oynayarak anlatan, unutulmaz diyaloglariyla one cikan kult bir yapimdir.",
            Director = "Quentin Tarantino",
            Genre = "Crime, Drama",
            ReleaseYear = 1994,
            ImdbRating = 8.9,
            Actors = ["John Travolta", "Samuel L. Jackson", "Uma Thurman"]
        }
    ];

    public IEnumerable<Movie> GetAll()
    {
        EnsureDescriptions();
        return _movies;
    }

    public Movie? GetById(int id)
    {
        EnsureDescriptions();
        return _movies.FirstOrDefault(m => m.Id == id);
    }

    public Movie Add(Movie movie)
    {
        movie.Id = _movies.Count == 0 ? 1 : _movies.Max(m => m.Id) + 1;
        movie.Description = NormalizeDescription(movie);
        _movies.Add(movie);
        return movie;
    }

    public Movie? Update(int id, Movie movie)
    {
        var existingMovie = GetById(id);
        if (existingMovie is null)
        {
            return null;
        }

        existingMovie.Title = movie.Title;
        existingMovie.PosterUrl = movie.PosterUrl;
        existingMovie.Description = NormalizeDescription(movie);
        existingMovie.Director = movie.Director;
        existingMovie.Actors = movie.Actors;
        existingMovie.ReleaseYear = movie.ReleaseYear;
        existingMovie.Genre = movie.Genre;
        existingMovie.ImdbRating = movie.ImdbRating;
        return existingMovie;
    }

    public bool Delete(int id)
    {
        var movie = GetById(id);
        if (movie is null)
        {
            return false;
        }

        _movies.Remove(movie);
        return true;
    }

    private static string NormalizeDescription(Movie movie)
    {
        if (!string.IsNullOrWhiteSpace(movie.Description))
        {
            return movie.Description.Trim();
        }

        var title = string.IsNullOrWhiteSpace(movie.Title) ? "Bu film" : movie.Title.Trim();
        return $"{title}, izleyiciyi etkileyici atmosferi ve karakterleriyle surukleyici bir hikayeye davet eden bir yapimdir.";
    }

    private void EnsureDescriptions()
    {
        foreach (var movie in _movies.Where(m => string.IsNullOrWhiteSpace(m.Description)))
        {
            movie.Description = NormalizeDescription(movie);
        }
    }
}
