using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNet.Mvc;
using Attractions.Web.Entities.Model;
using Attractions.Web.Processor;
using System.Threading.Tasks;

namespace Attractions.Web.Controllers
{
    public class HomeController : Controller
    {
        IAttractionsProcessor attractionsProcessor;

        public HomeController(IAttractionsProcessor attractionsProcessor)
        {
            this.attractionsProcessor = attractionsProcessor;
        }
        public async Task<IActionResult> Index()
        {
            ViewData.Model = new AttractionsIndexModel();
            return View();
        }

        public async Task<JsonResult> AutocompleteLocations(string location)
        {
            return new JsonResult(await this.attractionsProcessor.GetLocations(location));
        }

        public IActionResult About()
        {
            ViewBag.Message = "Your application description page.";

            return View();
        }

        public IActionResult Contact()
        {
            ViewBag.Message = "Your contact page.";

            return View();
        }
    }
}