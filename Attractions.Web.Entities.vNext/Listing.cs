using System;
using System.Collections.Generic;
namespace Attractions.Web.Entities
{
    public class Listing
    {
        public Int64 ListingId { get; set; }
        public string Title { get; set; }
        public string ShortDescription { get; set; }
        public string LongDescription { get; set; }
        public Locale Locale { get; set; }
        public int? UserRating { get; set; }
        public int? Ranking { get; set; }
        public int? PromoRank { get; set; }
        public int? Views { get; set; }
        public Location Location { get; set; } // This is google place_id
        public Category Category { get; set; }
        public IEnumerable<UsageType> UsageTypes { get; set; }
        public Status Status { get; set; }
    }
}