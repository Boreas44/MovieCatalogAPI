using MovieLibraryAPI.Models;

namespace MovieLibraryAPI.Services;

public interface IMovieService
{
    IEnumerable<Movie> GetAll();
    Movie? GetById(int id);
    Movie Add(Movie movie);
    bool Update(int id, Movie movie);
    bool Delete(int id);
}
