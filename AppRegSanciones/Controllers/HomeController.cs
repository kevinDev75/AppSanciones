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

        [HttpPost]
        public JsonResult GetUsuario()
        {
            var response = _UsuarioBl.GetUsuario();

            return Json(new
            {
                response
            }, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult GetFechaActual()
        {
            var response = DateTime.Now.ToShortDateString();

            return Json(new
            {
                response
            }, JsonRequestBehavior.AllowGet);
        }

        public ActionResult MenuLayout()
        {
            var response = _UsuarioBl.GetListAccesos();

            return PartialView("_MenuLayout", response.data);
        }

        [HttpGet]
        public JsonResult GetListPrivilegios()
        {
            var response = _UsuarioBl.GetListPrivilegios();

            return Json(new
            {
                response
            }, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult GetListRolesSinAsignarAUsuario(GetRolFlt oGetRolFlt)
        {
            var response = _UsuarioBl.GetListRolesSinAsignarAUsuario(oGetRolFlt.id_usuario);

            return Json(new
            {
                response
            }, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult GetListRolesAsignadosAUsuario(GetRolFlt oGetRolFlt)
        {
            var response = _UsuarioBl.GetListRolesAsignadosAUsuario(oGetRolFlt.id_usuario);

            return Json(new
            {
                response
            }, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult SaveRolUsuario(SaveRolUsuarioFlt oSaveRolUsuarioFlt)
        {
            var response = _UsuarioBl.SaveRolUsuario(oSaveRolUsuarioFlt);

            return Json(new
            {
                response
            }, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult DeleteRolUsuario(DeleteRolUsuarioFlt oDeleteRolUsuarioFlt)
        {
            var response = _UsuarioBl.DeleteRolUsuario(oDeleteRolUsuarioFlt);

            return Json(new
            {
                response
            }, JsonRequestBehavior.AllowGet);
        }



    }
}