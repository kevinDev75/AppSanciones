using Dapper;
using Sanciones.Entidades.FLT;
using Sanciones.Entidades.RSL;
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
    public class ReportesDa
    {
        private string cadenaConexion;
        public ReportesDa()
        {
            cadenaConexion = ConfigurationManager.ConnectionStrings["conexionBD"].ConnectionString;
        }

        public List<ReportesRsl> getReporteListaInfracciones(GetListPapeletaInfraccionFlt oGetListPapeletaInfraccionFlt)
        {
            List<ReportesRsl> ListEntityRsl = new List<ReportesRsl>();

            try
            {
                using (IDbConnection db = new SqlConnection(cadenaConexion))
                {
                    var parametros = new DynamicParameters();
                    parametros.Add("@fecha_inicio", oGetListPapeletaInfraccionFlt.fecha_inicio);
                    parametros.Add("@fecha_fin", oGetListPapeletaInfraccionFlt.fecha_fin);
                    db.Open();
                    ListEntityRsl = db.Query<ReportesRsl>("SP_REPORTE_SEL_MAYOR_INFR_SEL_01", param: parametros, commandType: CommandType.StoredProcedure).ToList();
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
