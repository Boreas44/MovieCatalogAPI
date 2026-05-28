namespace MovieLibraryAPI.Models;

public class Movie
{
    public int Id { get; set; }
    public string Title { get; set; } = string.Empty;
    public string PosterUrl { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public string Director { get; set; } = string.Empty;
    public List<string> Actors { get; set; } = new();
    public int ReleaseYear { get; set; }
    public string Genre { get; set; } = string.Empty;
    public double ImdbRating { get; set; }
}
