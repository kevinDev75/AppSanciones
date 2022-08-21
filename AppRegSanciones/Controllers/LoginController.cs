using Newtonsoft.Json;
using Sanciones.Entidades;
using Sanciones.Entidades.GEN;
using Sanciones.Entidades.VM;
using Sanciones.Logica;
using Sanciones.Utilities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace AppRegSanciones.Controllers
{
    public class LoginController : Controller
    {
        public readonly LoginBl _LoginBl;

        public LoginController()
        {
            _LoginBl = new LoginBl();
        }

        // GET: Login
        public ActionResult Index()
        {
            return View();
        }

        [HttpPost]
        public ActionResult Login(LoginRequest loginRequest)
        {
            var apiResponse = new ApiResponse("OK", "");

            try
            {
                //var encrypted_text = Encryptor.Encrypt(loginRequest.password);
                //var decrypted_text = Encryptor.Decrypt("PRL6/Sbwq8g=");
                //loginRequest.password = encrypted_text;
                apiResponse = _LoginBl.Authenticate(loginRequest);

                if (apiResponse.status == "OK" && apiResponse.data != null)
                {
                    var oUsuarioVm = (UsuarioVm) apiResponse.data;
                    User UserResponse = new Sanciones.Entidades.GEN.User() { 
                        IdUser = oUsuarioVm.id_usuario.ToString(),
                        CIP = oUsuarioVm.nombre_usuario
                    };

                    if (UserResponse != null)

                        SessionHelper.AddUserToSession(
                            UserResponse.IdUser,
                            UserResponse.CIP);
                }

            }
            catch (Exception ex)
            {
                apiResponse.status = "ERROR";
                apiResponse.msg = ex.Message;
            }
            return Json(apiResponse);
        }

        [HttpPost]
        public ActionResult SingOut()
        {
            SessionHelper.DestroyUserSession();
            //return RedirectToAction("Index", "Home");
            return Json(new
            {

            },
                JsonRequestBehavior.AllowGet);

        }


    }
}