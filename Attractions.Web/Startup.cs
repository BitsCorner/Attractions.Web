using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(Attractions.Web.Startup))]
namespace Attractions.Web
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
