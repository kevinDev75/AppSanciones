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
    public class SancionController : Controller
    {
        public readonly SancionBl _SancionBl;

        public SancionController()
        {
            _SancionBl = new SancionBl();
        }

        [HttpPost]
        public JsonResult SavePapeletaInfraccion(SavePapeletaFlt request)
        {
            var response = _SancionBl.SavePapeletaInfraccion(request);

            return Json(new
            {
                response
            }, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        public JsonResult SaveRegistroInfraccionMaestro(GetSearchInfraccionFlt request)
        {
            var response = _SancionBl.SaveRegistroInfraccionMaestro(request);

            return Json(new
            {
                response
            }, JsonRequestBehavior.AllowGet);
        }



        [HttpPost]
        public JsonResult UpdateEstadoPapeletaInfraccion(UpdatePapeletaInfraccionFlt request)
        {
            var response = _SancionBl.UpdateEstadoPapeletaInfraccion(request);

            return Json(new
            {
                response
            }, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult GetListPapeletaInfraccion(GetListPapeletaInfraccionFlt request)
        {


            var response = _SancionBl.GetListPapeletaInfraccion(request);

            return Json(new
            {
                response
            }, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult GetListPapeletaInfraccionParaAprobar()
        {
            var response = _SancionBl.GetListPapeletaInfraccionParaAprobar();

            return Json(new
            {
                response
            }, JsonRequestBehavior.AllowGet);
        }



        [HttpGet]
        public JsonResult GetListTipoSancion()
        {
            var response = _SancionBl.GetListTipoSancion();

            return Json(new
            {
                response
            }, JsonRequestBehavior.AllowGet);
        }


        [HttpPost]
        public JsonResult EjecutarSancionPapeleta(SaveRegistroInfraccionFlt request)
        {
            var response = _SancionBl.SaveRegistroInfraccion(request);

            return Json(new
            {
                response
            }, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public JsonResult GetListRegistroInfraccion(string cip_sancionado)
        {
            var response = _SancionBl.GetListRegistroInfraccion(cip_sancionado);

            return Json(new
            {
                response
            }, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult GetSearchSanciones(GetSearchInfraccionFlt request)
        {
            var response = _SancionBl.GetSearchSanciones(request);

            return Json(new
            {
                response
            }, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult getActualPuntajeInfracciones(GetListPapeletaInfraccionFlt request)
        {
            var response = _SancionBl.getActualPuntajeInfracciones(request);

            return Json(new
            {
                response
            }, JsonRequestBehavior.AllowGet);
        }


        [Autenticado]
        public ActionResult Registrar()
        {
            return View();
        }

        [Autenticado]
        public ActionResult AprobarInfracciones()
        {
            return View();
        }

        [HttpPost]
        public JsonResult GetSearchSancionador(GetSearchSancionadorFlt request)
        {
            var response = _SancionBl.GetSearchSancionador(request);

            return Json(new
            {
                response
            }, JsonRequestBehavior.AllowGet);
        }

        [Autenticado]
        public ActionResult ListarInfracciones()
        {
            return View();
        }



    }
}