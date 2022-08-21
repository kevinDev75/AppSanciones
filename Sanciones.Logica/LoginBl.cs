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
    public class LoginBl
    {

        public ApiResponse Authenticate(LoginRequest loginRequest)
        {
            ApiResponse apiResponse;
            try
            {
                var oLoginDa = new LoginDa();
                var oUsuarioVm = oLoginDa.Authenticate(loginRequest);
                if(oUsuarioVm != null)
                {
                    apiResponse = new ApiResponse("OK", Constant.success_select);
                    apiResponse.data = oUsuarioVm;
                }
                else
                {
                    apiResponse = new ApiResponse("ERROR", "Usuario o contraseña incorrectos.");
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
