using Newtonsoft.Json;
using Sanciones.Data;
using Sanciones.Entidades;
using Sanciones.Entidades.GEN;
using Sanciones.Utilities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sanciones.Logica
{
    public class UsuarioBl
    {
        public ApiResponse GetUsuario()
        {
            ApiResponse apiResponse;
            try
            {
                int IdUsuario;
                IdUsuario = SessionHelper.GetUser();

                var oUsuarioDa = new UsuarioDa();
                var oUsuarioVm = oUsuarioDa.GetUsuario(IdUsuario);
                if (oUsuarioVm != null)
                {
                    oUsuarioVm.CIP = SessionHelper.GetValueSession(Settings.Session.CIP).ToString();
                    apiResponse = new ApiResponse("OK", Constant.success_select);
                    apiResponse.data = oUsuarioVm;
                }
                else
                {
                    apiResponse = new ApiResponse("ERROR", Constant.error_select);
                }
            }
            catch (Exception ex)
            {
                apiResponse = new ApiResponse("ERROR", ex.Message);
            }
            return apiResponse;

        }

    }
}
