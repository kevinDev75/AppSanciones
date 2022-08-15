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
    public class SancionBl
    {
        public ApiResponse SavePapeletaInfraccion(string stringJson)
        {
            ApiResponse response = new ApiResponse("Ok", string.Empty);

            try
            {
                SavePapeletaFlt saveEntity = JsonConvert.DeserializeObject<SavePapeletaFlt>(stringJson);
                var oSancionDa = new SancionDa();
                oSancionDa.SavePapeletaInfraccion(saveEntity);
            }
            catch (Exception ex)
            {
                response.status = "Error";
                response.msg = ex.Message;
            }
            return response;
        }

        public ApiResponse UpdateEstadoPapeletaInfraccion(string stringJson)
        {
            ApiResponse response = new ApiResponse("Ok", string.Empty);

            try
            {
                UpdatePapeletaInfraccionFlt saveEntity = JsonConvert.DeserializeObject<UpdatePapeletaInfraccionFlt>(stringJson);
                var oSancionDa = new SancionDa();
                oSancionDa.UpdateEstadoPapeletaInfraccion(saveEntity);
            }
            catch (Exception ex)
            {
                response.status = "Error";
                response.msg = ex.Message;
            }
            return response;
        }

        public List<GetListPapeletaRsl> GetListPapeletaInfraccion(string stringJson)
        {
            List<GetListPapeletaRsl> ListEntity = new List<GetListPapeletaRsl>();

            try
            {
                GetListPapeletaInfraccionFlt request = JsonConvert.DeserializeObject<GetListPapeletaInfraccionFlt>(stringJson);
                var oSancionDa = new SancionDa();
                ListEntity = oSancionDa.GetListPapeletaInfraccion(request);
            }
            catch (Exception ex)
            {
                ListEntity = null;
            }
            return ListEntity;
        }

        public ApiResponse SaveRegistroInfraccion(string stringJson)
        {
            ApiResponse response = new ApiResponse("Ok", string.Empty);

            try
            {
                SaveRegistroInfraccionFlt saveEntity = JsonConvert.DeserializeObject<SaveRegistroInfraccionFlt>(stringJson);
                var oSancionDa = new SancionDa();
                oSancionDa.SaveRegistroInfraccion(saveEntity);
            }
            catch (Exception ex)
            {
                response.status = "Error";
                response.msg = ex.Message;
            }
            return response;
        }

        public List<GetListRegistroInfraccionRsl> GetListRegistroInfraccion(string cip_sancionado)
        {
            List<GetListRegistroInfraccionRsl> ListEntity = new List<GetListRegistroInfraccionRsl>();

            try
            {
                var oSancionDa = new SancionDa();
                ListEntity = oSancionDa.GetListRegistroInfraccion(cip_sancionado);
            }
            catch (Exception ex)
            {
                ListEntity = null;
            }
            return ListEntity;
        }



    }
}
