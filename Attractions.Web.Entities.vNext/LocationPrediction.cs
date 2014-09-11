using System;
using System.Collections.Generic;

namespace Attractions.Web.Entities
{
    public class Predictions
    {
        public IEnumerable<LocationPrediction> predictions { get; set; }
    }
    /// <summary>
    /// Summary description for LocationPrediction
    /// </summary>
    /// 
    public class LocationPrediction
    {
        public string description { get; set; }
        public string place_id { get; set; }
        public string reference { get; set; }
        public IEnumerable<string> types { get; set; }

        //description" : "Coquitlam, BC, Canada",
        // "matched_substrings" : [
        //    {
        //       "length" : 9,
        //       "offset" : 0
        //    }
        // ],
        // "place_id" : "ChIJn17CWsh4hlQRz3buLnZoV1k",
        // "reference" : "CjQtAAAAKkBvgSdRgv-pjlb-0EJwMwYRGoYONzMKIVOSHbcGF5Ln7F6wVXIv9SJdaF3hFk63EhBESYT3ONfcqKlHHPVOOQ2-GhSpzytEOMG2sNQm85wTYbsoAwh2dQ",
        // "terms" : [
        //    {
        //       "offset" : 0,
        //       "value" : "Coquitlam"
        //    },
        //    {
        //       "offset" : 11,
        //       "value" : "BC"
        //    },
        //    {
        //       "offset" : 15,
        //       "value" : "Canada"
        //    }
        // ],
        // "types" : [ "locality", "political", "geocode" ]

    }
}