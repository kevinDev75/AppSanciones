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
    public class LoginDa
    {
        private string cadenaConexion;
        public LoginDa()
        {
            cadenaConexion = ConfigurationManager.ConnectionStrings["conexionBD"].ConnectionString;
        }

        public UsuarioVm Authenticate(LoginRequest loginRequest)
        {
            UsuarioVm Entity = null;

            try
            {
                using (IDbConnection db = new SqlConnection(cadenaConexion))
                {
                    db.Open();
                    var parametros = new DynamicParameters();
                    parametros.Add("@nombre_usuario", loginRequest.username);
                    parametros.Add("@pass_usuario", loginRequest.password);

                    Entity = db.Query<UsuarioVm>("SP_VALIDAR_USUARIO_LOGIN", param: parametros, commandType: CommandType.StoredProcedure).FirstOrDefault();
                    db.Close();
                    db.Dispose();
                }
            }
            catch (Exception ex)
            {

            }
            return Entity;
        }

    }
}
