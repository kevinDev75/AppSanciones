using Dapper;
using Sanciones.Entidades.FLT;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sanciones.Data
{
    public class CadetesDa
    {
        private string cadenaConexion;
        public CadetesDa()
        {
            cadenaConexion = ConfigurationManager.ConnectionStrings["conexionBD"].ConnectionString;
        }

        public void SaveCadete(SaveCadeteFlt oSaveCadeteFlt)
        {
            try
            {
                using (IDbConnection db = new SqlConnection(cadenaConexion))
                {
                    var parametros = new DynamicParameters();
                    parametros.Add("@ape_paterno", oSaveCadeteFlt.ape_paterno);
                    parametros.Add("@ape_materno", oSaveCadeteFlt.ape_materno);
                    parametros.Add("@nombres", oSaveCadeteFlt.nombres);
                    parametros.Add("@id_grado", oSaveCadeteFlt.id_grado);
                    parametros.Add("@id_cargo", oSaveCadeteFlt.id_cargo);
                    parametros.Add("@puntaje_actual", oSaveCadeteFlt.puntaje_actual);
                    parametros.Add("@CIP", oSaveCadeteFlt.CIP);

                    db.Execute("SP_CADETES_INS_01", param: parametros, commandType: CommandType.StoredProcedure);
                    db.Close();
                    db.Dispose();
                }
            }
            catch (Exception ex)
            {
                throw;
            }
        }


    }
}
