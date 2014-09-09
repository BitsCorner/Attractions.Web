namespace Attractions.Web.Entities
{
    public class ListingPicture
    {
        public int ListingPictureId { get; set; }
        public string Thumbnail { get; set; }
        public string Poster { get; set; }
        public string Original { get; set; }
        public string ShortDescription { get; set; }
        public string LongDescription { get; set; }
        public bool IsDefault { get; set; }
        public Locale Locale { get; set; }
    }
}
