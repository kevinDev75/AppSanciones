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
            ApiResponse response = new ApiResponse("OK", string.Empty);

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
            ApiResponse response = new ApiResponse("OK", string.Empty);

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

        public ApiResponse GetListPapeletaInfraccion(GetListPapeletaInfraccionFlt request)
        {
            ApiResponse response = new ApiResponse("OK", string.Empty);
            List<GetListPapeletaRsl> ListEntity = new List<GetListPapeletaRsl>();

            try
            {
                //GetListPapeletaInfraccionFlt request = JsonConvert.DeserializeObject<GetListPapeletaInfraccionFlt>(stringJson);
                var oSancionDa = new SancionDa();
                ListEntity = oSancionDa.GetListPapeletaInfraccion(request);
                response.data = ListEntity;
            }
            catch (Exception ex)
            {
                ListEntity = null;
                response.status = "Error";
                response.msg = ex.Message;
            }
            return response;
        }

        public ApiResponse GetSearchSanciones(GetSearchInfraccionFlt request)
        {
            ApiResponse response = new ApiResponse("OK", string.Empty);
            List<GetSearchInfraccionRsl> ListEntity = new List<GetSearchInfraccionRsl>();

            try
            {
                //GetListPapeletaInfraccionFlt request = JsonConvert.DeserializeObject<GetListPapeletaInfraccionFlt>(stringJson);
                var oSancionDa = new SancionDa();
                ListEntity = oSancionDa.GetSearchSanciones(request);
                response.data = ListEntity;
            }
            catch (Exception ex)
            {
                ListEntity = null;
                response.status = "Error";
                response.msg = ex.Message;
            }
            return response;
        }

       public ApiResponse GetListTipoSancion( )
        {
            ApiResponse response = new ApiResponse("OK", string.Empty);
            List<TipoSancionRsl> ListEntity = new List<TipoSancionRsl>();

            try
            {
                //GetListPapeletaInfraccionFlt request = JsonConvert.DeserializeObject<GetListPapeletaInfraccionFlt>(stringJson);
                var oSancionDa = new SancionDa();
                ListEntity = oSancionDa.GetListTipoSancion();
                response.data = ListEntity;
            }
            catch (Exception ex)
            {
                ListEntity = null;
                response.status = "Error";
                response.msg = ex.Message;
            }
            return response;
        }

        public ApiResponse SaveRegistroInfraccion(string stringJson)
        {
            ApiResponse response = new ApiResponse("OK", string.Empty);

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

        public ApiResponse GetListRegistroInfraccion(string cip_sancionado)
        {
            ApiResponse response = new ApiResponse("OK", string.Empty);
            List<GetListRegistroInfraccionRsl> ListEntity = new List<GetListRegistroInfraccionRsl>();

            try
            {
                var oSancionDa = new SancionDa();
                ListEntity = oSancionDa.GetListRegistroInfraccion(cip_sancionado);
                response.data = ListEntity;
            }
            catch (Exception ex)
            {
                ListEntity = null;
                response.status = "Error";
                response.msg = ex.Message;
            }
            return response;
        }

        public ApiResponse GetSearchSancionador(GetSearchSancionadorFlt request)
        {
            ApiResponse response = new ApiResponse("OK", string.Empty);
            List<GetListCadetesRsl> ListEntity = new List<GetListCadetesRsl>();

            try
            {
                var oCadetesDa = new CadetesDa();
                ListEntity = oCadetesDa.GetListCadetes();
                ListEntity = ListEntity.Where(x => x.Nivel > 1).ToList(); //Omitimos a los aspirantes
                if(request.CIP != null && request.CIP.Length > 0)
                {
                    ListEntity = ListEntity.Where(x => x.CIP == request.CIP).ToList();
                }
                else if(request.nombres_completos != null && request.nombres_completos.Length > 0)
                {
                    ListEntity = ListEntity.FindAll(
                            delegate (GetListCadetesRsl current)
                            {
                                return current.nombre_completo.Contains(request.nombres_completos);
                            }
                        );
                }
                response.data = ListEntity;
            }
            catch (Exception ex)
            {
                ListEntity = null;
                response.status = "Error";
                response.msg = ex.Message;
            }
            return response;
        }



    }
}
