using Microsoft.AspNetCore.Mvc;
using MovieLibraryAPI.Models;

namespace MovieLibraryAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class MoviesController : ControllerBase
    {
        // Basit bir liste (geçici veritabanı görevi görür)
        private static List<Movie> _movies = new List<Movie>
        {
            new Movie { Id = 1, Title = "Inception", Director = "Christopher Nolan", Genre = "Sci-Fi", ReleaseYear = 2010, ImdbRating = 8.8 }
        };

        // 1. LİSTELEME (GET)
        [HttpGet]
        public IActionResult GetAll()
        {
            return Ok(_movies);
        }

        // 2. EKLEME (POST)
        [HttpPost]
        public IActionResult Create(Movie movie)
        {
            movie.Id = _movies.Count + 1;
            _movies.Add(movie);
            return Ok(movie);
        }
    }
}