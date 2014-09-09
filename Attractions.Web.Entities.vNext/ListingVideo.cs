namespace Attractions.Web.Entities
{
    public class ListingVideo
    {
        public int ListingVideoId { get; set; }
        public string YouTubeUri { get; set; }
        public string ShortDescription { get; set; }
        public string LongDescription { get; set; }
        public Locale Locale { get; set; }
        public bool IsDefault { get; set; }
    }
}
