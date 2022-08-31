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
    public class ReportesController : Controller
    {

        public readonly ReportesBl _ReporteBl;

        public ReportesController()
        {
            _ReporteBl = new ReportesBl();
        }
        // GET: Reportes
        public ActionResult Index()
        {
            return View();
        }

        // GET: Reportes/Details/5
        public ActionResult Details(int id)
        {
            return View();
        }

        // GET: Reportes/Create
        public ActionResult Create()
        {
            return View();
        }

        // POST: Reportes/Create
        [HttpPost]
        public ActionResult Create(FormCollection collection)
        {
            try
            {
                // TODO: Add insert logic here

                return RedirectToAction("Index");
            }
            catch
            {
                return View();
            }
        }

        // GET: Reportes/Edit/5
        public ActionResult Edit(int id)
        {
            return View();
        }

        // POST: Reportes/Edit/5
        [HttpPost]
        public ActionResult Edit(int id, FormCollection collection)
        {
            try
            {
                // TODO: Add update logic here

                return RedirectToAction("Index");
            }
            catch
            {
                return View();
            }
        }

        // GET: Reportes/Delete/5
        public ActionResult Delete(int id)
        {
            return View();
        }

        // POST: Reportes/Delete/5
        [HttpPost]
        public ActionResult Delete(int id, FormCollection collection)
        {
            try
            {
                // TODO: Add delete logic here

                return RedirectToAction("Index");
            }
            catch
            {
                return View();
            }
        }
        [Autenticado]
        public ActionResult Infracciones()
        {
            return View();
        }
        [Autenticado]
        public ActionResult Sancionadores()
        {
            return View();
        }


        [HttpPost]
        public JsonResult getReporteListaInfracciones(GetListPapeletaInfraccionFlt request)
        {


            var response = _ReporteBl.getReporteListaInfracciones(request);

            return Json(new
            {
                response
            }, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        public JsonResult getReporteSancionador(GetListPapeletaInfraccionFlt request)
        {


            var response = _ReporteBl.getReporteSancionador(request);

            return Json(new
            {
                response
            }, JsonRequestBehavior.AllowGet);
        }

    }
}
