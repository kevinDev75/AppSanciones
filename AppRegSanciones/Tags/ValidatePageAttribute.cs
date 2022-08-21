using Newtonsoft.Json;
using Sanciones.Entidades.GEN;
using Sanciones.Utilities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Routing;

namespace AppMercurial.Tags
{
    public class ValidatePageAttribute : ActionFilterAttribute
    {
        //public readonly ILoginService _ILoginService = new LoginService();

        public override void OnActionExecuting(ActionExecutingContext filterContext)
        {
            base.OnActionExecuting(filterContext);

            var controllerName = filterContext.ActionDescriptor.ControllerDescriptor.ControllerName;
            var ActionName = filterContext.ActionDescriptor.ActionName;

            User user = new User()
            {
                CIP = SessionHelper.GetValueSession(Settings.Session.CIP).ToString(),
                IdUser = SessionHelper.GetUser().ToString()
            };

            //var response = _ILoginService.GetMenu(user);
            //var data = JsonConvert.DeserializeObject<List<ModelMenu>>(response.data.ToString());
            //var filter = data.Where(x => x.Control == controllerName && x.View == ActionName);

            //if (!filter.Any())
            //{
            //    filterContext.Result = new RedirectToRouteResult(new RouteValueDictionary(new
            //    {
            //        controller = "Home",
            //        action = "Main"
            //    }));
            //}
            filterContext.Result = new RedirectToRouteResult(new RouteValueDictionary(new
            {
                controller = "Home",
                action = "Index"
            }));
        }

    }
}