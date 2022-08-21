using AppMercurial.Tags;
using Sanciones.Logica;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace AppRegSanciones.Controllers
{
    public class HomeController : Controller
    {
        public readonly UsuarioBl _UsuarioBl;

        public HomeController()
        {
            _UsuarioBl = new UsuarioBl();
        }

        [Autenticado]
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult About()
        {
            ViewBag.Message = "Your application description page.";

            return View();
        }

        public ActionResult Contact()
        {
            ViewBag.Message = "Your contact page.";

            return View();
        }

        [HttpPost]
        public JsonResult GetUsuario()
        {
            var response = _UsuarioBl.GetUsuario();

            return Json(new
            {
                response
            }, JsonRequestBehavior.AllowGet);
        }



    }
}