using Dapper;
using Sanciones.Entidades.GEN;
using Sanciones.Entidades.RSL;
using Sanciones.Entidades.VM;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;

namespace Sanciones.Data
{
    public class UsuarioDa
    {
        private string cadenaConexion;
        public UsuarioDa()
        {
            cadenaConexion = ConfigurationManager.ConnectionStrings["conexionBD"].ConnectionString;
        }

        public UsuarioVm GetUsuario(int id_usuario)
        {
            UsuarioVm Entity = null;

            try
            {
                using (IDbConnection db = new SqlConnection(cadenaConexion))
                {
                    db.Open();
                    var parametros = new DynamicParameters();
                    parametros.Add("@id_usuario", id_usuario);

                    Entity = db.Query<UsuarioVm>("SP_USUARIO_SEL_01", param: parametros, commandType: CommandType.StoredProcedure).FirstOrDefault();
                    db.Close();
                    db.Dispose();
                }
            }
            catch (Exception ex)
            {

            }
            return Entity;
        }

        public List<GetAccesosRsl> GetListAccesos(int id_usuario)
        {
            List<GetAccesosRsl> ListEntityRsl = new List<GetAccesosRsl>();

            try
            {
                using (IDbConnection db = new SqlConnection(cadenaConexion))
                {
                    db.Open();
                    var parametros = new DynamicParameters();
                    parametros.Add("@id_usuario", id_usuario);
                    
                    ListEntityRsl = db.Query<GetAccesosRsl>("SP_ROL_ACCESO_SEL_01", param: parametros, commandType: CommandType.StoredProcedure).ToList();
                    db.Close();
                    db.Dispose();
                }
            }
            catch (Exception ex)
            {

            }
            return ListEntityRsl;
        }

        public List<GetPrivilegiosRsl> GetListPrivilegios(int id_usuario)
        {
            List<GetPrivilegiosRsl> ListEntityRsl = new List<GetPrivilegiosRsl>();

            try
            {
                using (IDbConnection db = new SqlConnection(cadenaConexion))
                {
                    db.Open();
                    var parametros = new DynamicParameters();
                    parametros.Add("@id_usuario", id_usuario);

                    ListEntityRsl = db.Query<GetPrivilegiosRsl>("SP_ROL_PRIVILEGIO_SEL_01", param: parametros, commandType: CommandType.StoredProcedure).ToList();
                    db.Close();
                    db.Dispose();
                }
            }
            catch (Exception ex)
            {

            }
            return ListEntityRsl;
        }



    }
}
