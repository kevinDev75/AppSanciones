using Newtonsoft.Json;
using Sanciones.Data;
using Sanciones.Entidades;
using Sanciones.Entidades.FLT;
using Sanciones.Entidades.RSL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sanciones.Logica
{
    public class CadetesBl
    {
        public ApiResponse SaveCadete(SaveCadeteFlt saveEntity)
        {
            ApiResponse response = new ApiResponse("OK", string.Empty);

            try
            {
                //SaveCadeteFlt saveEntity = JsonConvert.DeserializeObject<SaveCadeteFlt>(stringJson);
                var oCadetesDa = new CadetesDa();
                oCadetesDa.SaveCadete(saveEntity);
            }
            catch (Exception ex)
            {
                response.status = "Error";
                response.msg = ex.Message;
            }
            return response;
        }

        public ApiResponse GetListCadetes()
        {
            ApiResponse response = new ApiResponse("OK", string.Empty);
            List<GetListCadetesRsl> ListEntity = new List<GetListCadetesRsl>();

            try
            {
                var oCadetesDa = new CadetesDa();
                ListEntity = oCadetesDa.GetListCadetes();
                response.data = ListEntity;
            }
            catch (Exception ex)
            {
                response.status = "Error";
                response.msg = ex.Message;
            }
            return response;
        }

        public ApiResponse GetListGrado()
        {
            ApiResponse response = new ApiResponse("OK", string.Empty);
            List<GradoRsl> ListEntity = new List<GradoRsl>();

            try
            {
                var oCadetesDa = new CadetesDa();
                ListEntity = oCadetesDa.GetListGrado();
                response.data = ListEntity;
            }
            catch (Exception ex)
            {
                response.status = "Error";
                response.msg = ex.Message;
            }
            return response;
        }

        public ApiResponse GetListCargo()
        {
            ApiResponse response = new ApiResponse("OK", string.Empty);
            List<CargoRsl> ListEntity = new List<CargoRsl>();

            try
            {
                var oCadetesDa = new CadetesDa();
                ListEntity = oCadetesDa.GetListCargo();
                response.data = ListEntity;
            }
            catch (Exception ex)
            {
                response.status = "Error";
                response.msg = ex.Message;
            }
            return response;
        }

        public ApiResponse GetDatosCadete(string cip)
        {
            ApiResponse response = new ApiResponse("OK", string.Empty);
            List<GetListCadetesRsl> ListEntity = new List<GetListCadetesRsl>();

            try
            {
                var oCadetesDa = new CadetesDa();
                ListEntity = oCadetesDa.GetListCadetes();
                response.data = ListEntity.Where(x => x.CIP == cip).FirstOrDefault();
            }
            catch (Exception ex)
            {
                response.status = "Error";
                response.msg = ex.Message;
            }
            return response;
        }


    }
}
