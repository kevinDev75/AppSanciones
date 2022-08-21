using AppMercurial.Tags;
using Sanciones.Entidades.FLT;
using Sanciones.Logica;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace AppRegSanciones.Controllers
{
    public class CadeteController : Controller
    {
        public readonly CadetesBl _CadetesBl;

        public CadeteController()
        {
            _CadetesBl = new CadetesBl();
        }

        // GET: Cadete
        [Autenticado]
        public ActionResult Index()
        {
            return View();
        }

        [HttpPost]
        public JsonResult SaveCadete(SaveCadeteFlt saveEntity)
        {
            //var DataString = System.Web.HttpContext.Current.Request.Params.Get("JsonMaster").ToString();

            var response = _CadetesBl.SaveCadete(saveEntity);

            return Json(new
            {
                response
            }, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public JsonResult GetListCadetes()
        {
            var response = _CadetesBl.GetListCadetes();

            return Json(new
            {
                response
            }, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        [Autenticado]
        public ActionResult Registrar(string CIP)
        {
            ViewData["CIP"] = CIP;
            return View();
        }

        [HttpGet]
        public JsonResult GetListGrado()
        {
            var response = _CadetesBl.GetListGrado();

            return Json(new
            {
                response
            }, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public JsonResult GetListCargo()
        {
            var response = _CadetesBl.GetListCargo();

            return Json(new
            {
                response
            }, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public JsonResult GetDatosCadete(string cip)
        {
            var response = _CadetesBl.GetDatosCadete(cip);

            return Json(new
            {
                response
            }, JsonRequestBehavior.AllowGet);
        }


    }
}