public class Movie
{
    public int Id { get; set; }
    public string Title { get; set; }
    public string Director { get; set; }
    public List<string> Actors { get; set; } // Veya string olarak "Actor1, Actor2"
    public int ReleaseYear { get; set; }
    public string Genre { get; set; }
    public double ImdbRating { get; set; }
}