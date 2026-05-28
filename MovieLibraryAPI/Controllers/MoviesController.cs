using Microsoft.AspNetCore.Mvc;
using MovieLibraryAPI.Models;
using MovieLibraryAPI.Services;

namespace MovieLibraryAPI.Controllers;

[ApiController]
[Route("api/[controller]")]
public class MoviesController : ControllerBase
{
    private readonly IMovieService _movieService;

    public MoviesController(IMovieService movieService)
    {
        _movieService = movieService;
    }

    [HttpGet]
    public IActionResult GetAll()
    {
        return Ok(_movieService.GetAll());
    }

    [HttpGet("{id:int}")]
    public IActionResult GetById(int id)
    {
        var movie = _movieService.GetById(id);
        if (movie is null)
        {
            return NotFound();
        }

        return Ok(movie);
    }

    [HttpPost]
    public IActionResult Create([FromBody] Movie movie)
    {
        var createdMovie = _movieService.Add(movie);
        return CreatedAtAction(nameof(GetById), new { id = createdMovie.Id }, createdMovie);
    }

    [HttpPut("{id:int}")]
    public IActionResult Update(int id, [FromBody] Movie movie)
    {
        var updated = _movieService.Update(id, movie);
        if (!updated)
        {
            return NotFound();
        }

        return NoContent();
    }

    [HttpDelete("{id:int}")]
    public IActionResult Delete(int id)
    {
        var deleted = _movieService.Delete(id);
        if (!deleted)
        {
            return NotFound();
        }

        return NoContent();
    }
}
