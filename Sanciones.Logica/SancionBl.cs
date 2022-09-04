using Newtonsoft.Json;
using Sanciones.Data;
using Sanciones.Entidades;
using Sanciones.Entidades.FLT;
using Sanciones.Entidades.RSL;
using Sanciones.Utilities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sanciones.Logica
{
    public class SancionBl
    {
        public ApiResponse SavePapeletaInfraccion(SavePapeletaFlt saveEntity)
        {
            ApiResponse response = new ApiResponse("OK", string.Empty);

            try
            {
                var oSancionDa = new SancionDa();
                oSancionDa.SavePapeletaInfraccion(saveEntity);
                response.msg = Constant.success_insert;
            }
            catch (Exception ex)
            {
                response.status = "Error";
                response.msg = ex.Message;
            }
            return response;
        }

        public ApiResponse UpdateEstadoPapeletaInfraccion(UpdatePapeletaInfraccionFlt saveEntity)
        {
            ApiResponse response = new ApiResponse("OK", string.Empty);

            try
            {
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

        public ApiResponse getActualPuntajeInfracciones(GetListPapeletaInfraccionFlt request)
        {
            ApiResponse response = new ApiResponse("OK", string.Empty);
            GetListPuntaje ListEntity = new GetListPuntaje();

            try
            {
                //GetListPapeletaInfraccionFlt request = JsonConvert.DeserializeObject<GetListPapeletaInfraccionFlt>(stringJson);
                var oSancionDa = new SancionDa();




                ListEntity = oSancionDa.getActualPuntajeInfracciones(request);
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

        public ApiResponse GetListPapeletaInfraccion(GetListPapeletaInfraccionFlt request)
        {
            ApiResponse response = new ApiResponse("OK", string.Empty);
            List<GetListPapeletaRsl> ListEntity = new List<GetListPapeletaRsl>();

            try
            {
                //GetListPapeletaInfraccionFlt request = JsonConvert.DeserializeObject<GetListPapeletaInfraccionFlt>(stringJson);
                var oSancionDa = new SancionDa();

                if (!string.IsNullOrEmpty(request.cip_sancionador) && request.cip_sancionador.Split('-').Count() > 0)
                {
                    var codsancionador = request.cip_sancionador.Split('-')[0].ToString();
                    request.cip_sancionador = codsancionador.Trim();
                }



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

        public ApiResponse GetListPapeletaInfraccionParaAprobar()
        {
            GetListPapeletaInfraccionParaAprobarFlt request;
            ApiResponse response = new ApiResponse("OK", string.Empty);
            List<GetListPapeletaRsl> ListEntity = new List<GetListPapeletaRsl>();

            try
            {
                var oSancionDa = new SancionDa();
                var oUsuarioBl = new UsuarioBl();

                //Traer la lista para aprobar por parte del sancionador
                request = new GetListPapeletaInfraccionParaAprobarFlt()
                {
                    cip_sancionador = SessionHelper.GetValueSession(Settings.Session.CIP).ToString(),
                    id_estado_papeleta = 1 //PROCESADO
                };
                ListEntity = oSancionDa.GetListPapeletaInfraccionParaAprobar(request);

                bool PermisoTraerListaSancionesParaEjecutar = oUsuarioBl.ExistsPrivilegio(1);
                if (PermisoTraerListaSancionesParaEjecutar)
                {
                    request = new GetListPapeletaInfraccionParaAprobarFlt()
                    {
                        cip_sancionador = null,
                        id_estado_papeleta = 2 //APROBADO POR EL SANCIONADOR
                    };
                    var lista = oSancionDa.GetListPapeletaInfraccionParaAprobar(request);
                    if (lista.Count > 0)
                    {
                        ListEntity.AddRange(lista);
                    }
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

        public ApiResponse GetListTipoSancion()
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

        public ApiResponse SaveRegistroInfraccion(SaveRegistroInfraccionFlt saveEntity)
        {
            ApiResponse response = new ApiResponse("OK", string.Empty);

            try
            {
                var oSancionDa = new SancionDa();

                var oUpdatePapeletaInfraccionFlt = new UpdatePapeletaInfraccionFlt()
                {
                    id_papeleta_infraccion_disc = saveEntity.id_papeleta_infraccion_disc,
                    id_estado_papeleta = 3,
                    Nota = saveEntity.Nota
                };
                oSancionDa.UpdateEstadoPapeletaInfraccion(oUpdatePapeletaInfraccionFlt);
                oSancionDa.SaveRegistroInfraccion(saveEntity);
            }
            catch (Exception ex)
            {
                response.status = "Error";
                response.msg = ex.Message;
            }
            return response;
        }

        public ApiResponse SaveRegistroInfraccionMaestro(GetSearchInfraccionFlt saveEntity)
        {
            ApiResponse response = new ApiResponse("OK", string.Empty);

            try
            {
                var oSancionDa = new SancionDa();
                oSancionDa.SaveRegistroInfraccionMaestro(saveEntity);

                //registrar demeritos puntajes
                foreach (getInsertDemeritoFlt item in saveEntity.listDemeritado)
                {
                    oSancionDa.SaveRegistroInfraccionDemerito(item);
                }
            }
            catch (Exception ex)
            {
                response.status = "Error";
                response.msg = ex.Message;
            }
            return response;
        }

        public ApiResponse UpdateInfraccionXID (GetSearchInfraccionFlt saveEntity)
        {
            ApiResponse response = new ApiResponse("OK", string.Empty);

            try
            {
                var oSancionDa = new SancionDa();
                oSancionDa.UpdateInfraccionXID(saveEntity);

                //registrar demeritos puntajes
                foreach (getInsertDemeritoFlt item in saveEntity.listDemeritado)
                {
                    oSancionDa.UpdateInfraccionDemeritadoXID(item);
                }
            }
            catch (Exception ex)
            {
                response.status = "Error";
                response.msg = ex.Message;
            }
            return response;
        }
        public ApiResponse getInfraccionDetailxID(GetSearchInfraccionFlt saveEntity)
        {
            ApiResponse response = new ApiResponse("OK", string.Empty);
            GetSearchInfraccionRsl ListEntity = new GetSearchInfraccionRsl();
            try
            {
                var oSancionDa = new SancionDa();
                ListEntity = oSancionDa.getInfraccionDetailxID(saveEntity);
                response.data = ListEntity;

            }
            catch (Exception ex)
            {
                response.status = "Error";
                response.msg = ex.Message;
            }
            return response;
        }

        public ApiResponse getPuntajesxInfraccionxID(GetSearchInfraccionFlt oGetListPapeletaInfraccionFlt)
        {
            ApiResponse response = new ApiResponse("OK", string.Empty);
            List<getInsertDemeritoRsl> ListEntity = new List<getInsertDemeritoRsl>();

            try
            {
                var oSancionDa = new SancionDa();
                ListEntity = oSancionDa.getPuntajesxInfraccionxID(oGetListPapeletaInfraccionFlt);
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
                if (request.CIP != null && request.CIP.Length > 0)
                {
                    ListEntity = ListEntity.Where(x => x.CIP == request.CIP).ToList();
                }
                else if (request.nombres_completos != null && request.nombres_completos.Length > 0)
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
