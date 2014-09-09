using Newtonsoft.Json;
using System;

namespace Attractions.Web.Utility
{
    /// <summary>
    /// Summary description for KnockoutHelper
    /// </summary>
    public class KnockoutHelper
    {
	    public KnockoutHelper(){
	    }

        public static string CreateKnockoutContext()
        {
            return @"<script>$(document).ready(function () {{                                                                        
                                 if (portalViewModel.PageData != null){{
                                    portalViewModel.PageData.Data = ko.mapping.fromJS(viewModelJs);
                                    if (portalViewModel.PageData.DataLoaded != null){{
                                        portalViewModel.PageData.DataLoaded();
                                    }}
                                 }}
                                 ko.applyBindings(portalViewModel, null);
                            }});</script>";
        }

        public static string MapPageData<T>(T model)
        {
            var json = JsonConvert.SerializeObject(model);
            var jsOutpug = @"<script>
                                 var viewModelJs = {0};                                            
                                 portalViewModel.PageData.Data = ko.mapping.fromJS(viewModelJs);        
                            </script>";
            return string.Format(jsOutpug, json);

        }

    }
}