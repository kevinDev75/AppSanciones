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
    class CadetesBl
    {
        public ApiResponse SaveCadete(string stringJson)
        {
            ApiResponse response = new ApiResponse("Ok", string.Empty);

            try
            {
                SaveCadeteFlt saveEntity = JsonConvert.DeserializeObject<SaveCadeteFlt>(stringJson);
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

        public List<GetListCadetesRsl> GetListCadetes()
        {
            List<GetListCadetesRsl> ListEntity = new List<GetListCadetesRsl>();

            try
            {
                var oCadetesDa = new CadetesDa();
                ListEntity = oCadetesDa.GetListCadetes();
            }
            catch (Exception ex)
            {
                ListEntity = null;
            }
            return ListEntity;
        }


    }
}
