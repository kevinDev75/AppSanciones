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
    public class ReportesBl
    {
        public ApiResponse getReporteListaInfracciones(GetListPapeletaInfraccionFlt oGetListPapeletaInfraccionFlt)
        {
            ApiResponse response = new ApiResponse("OK", string.Empty);
            List<ReportesRsl> ListEntity = new List<ReportesRsl>();

            try
            {
                var oCadetesDa = new ReportesDa();
                ListEntity = oCadetesDa.getReporteListaInfracciones(oGetListPapeletaInfraccionFlt);
                response.data = ListEntity;
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
