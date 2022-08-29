using Newtonsoft.Json;
using Sanciones.Data;
using Sanciones.Entidades;
using Sanciones.Entidades.FLT;
using Sanciones.Entidades.GEN;
using Sanciones.Entidades.RSL;
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

        public ApiResponse GetListAccesos()
        {
            ApiResponse response = new ApiResponse("OK", string.Empty);
            List<GetAccesosRsl> ListEntity = new List<GetAccesosRsl>();

            try
            {
                int IdUsuario;
                IdUsuario = SessionHelper.GetUser();

                var oUsuarioDa = new UsuarioDa();
                ListEntity = oUsuarioDa.GetListAccesos(IdUsuario);
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

        public ApiResponse GetListPrivilegios()
        {
            ApiResponse response = new ApiResponse("OK", string.Empty);
            List<GetPrivilegiosRsl> ListEntity = new List<GetPrivilegiosRsl>();

            try
            {
                int IdUsuario;
                IdUsuario = SessionHelper.GetUser();

                var oUsuarioDa = new UsuarioDa();
                ListEntity = oUsuarioDa.GetListPrivilegios(IdUsuario);
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

        public bool ExistsPrivilegio(int id_privilegio) //Valida si existe tal permiso asignado al rol
        {
            bool resp = false;
            List<GetPrivilegiosRsl> ListEntity;

            try
            {
                int IdUsuario;
                IdUsuario = SessionHelper.GetUser();

                var oUsuarioDa = new UsuarioDa();
                ListEntity = oUsuarioDa.GetListPrivilegios(IdUsuario);
                var objPermiso = ListEntity.Where(x => x.id_privilegio == id_privilegio);
                if (objPermiso.Any())
                {
                    resp = true;
                }
            }
            catch (Exception ex)
            {
                resp = false;
            }
            return resp;
        }

        public ApiResponse GetListRolesSinAsignarAUsuario(int IdUsuario)
        {
            ApiResponse response = new ApiResponse("OK", string.Empty);
            List<GetRolesRsl> ListEntity = new List<GetRolesRsl>();

            try
            {
                //int IdUsuario;
                //IdUsuario = SessionHelper.GetUser();

                var oUsuarioDa = new UsuarioDa();
                ListEntity = oUsuarioDa.GetListRolesSinAsignarAUsuario(IdUsuario);
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

        public ApiResponse GetListRolesAsignadosAUsuario(int IdUsuario)
        {
            ApiResponse response = new ApiResponse("OK", string.Empty);
            List<GetRolesRsl> ListEntity = new List<GetRolesRsl>();

            try
            {
                //int IdUsuario;
                //IdUsuario = SessionHelper.GetUser();

                var oUsuarioDa = new UsuarioDa();
                ListEntity = oUsuarioDa.GetListRolesAsignadosAUsuario(IdUsuario);
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

        public ApiResponse SaveRolUsuario(SaveRolUsuarioFlt oSaveRolUsuarioFlt)
        {
            ApiResponse response = new ApiResponse("OK", string.Empty);

            try
            {
                //SaveCadeteFlt saveEntity = JsonConvert.DeserializeObject<SaveCadeteFlt>(stringJson);
                var oUsuarioDa = new UsuarioDa();
                oUsuarioDa.SaveRolUsuario(oSaveRolUsuarioFlt);
            }
            catch (Exception ex)
            {
                response.status = "Error";
                response.msg = ex.Message;
            }
            return response;
        }

        public ApiResponse DeleteRolUsuario(DeleteRolUsuarioFlt oDeleteRolUsuarioFlt)
        {
            ApiResponse response = new ApiResponse("OK", string.Empty);

            try
            {
                //SaveCadeteFlt saveEntity = JsonConvert.DeserializeObject<SaveCadeteFlt>(stringJson);
                var oUsuarioDa = new UsuarioDa();
                oUsuarioDa.DeleteRolUsuario(oDeleteRolUsuarioFlt);
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
