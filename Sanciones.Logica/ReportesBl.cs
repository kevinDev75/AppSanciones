using Microsoft.Reporting.WebForms;
using Sanciones.Data;
using Sanciones.Entidades;
using Sanciones.Entidades.FLT;
using Sanciones.Entidades.RSL;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web;

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
                response.data = generarInfraccionesRpt(ListEntity);
                //response.data = ListEntity;
            }
            catch (Exception ex)
            {
                response.status = "Error";
                response.msg = ex.Message;
            }
            return response;
        }

        private string generarInfraccionesRpt(List<ReportesRsl> listDatos)
        {
            dynamic pathPdf = "";
            string patchreturn = "";
            try
            {
                ReportDataSource dsOBJ = new ReportDataSource();
                dsOBJ.Name = "DataSet1";
                dsOBJ.Value = listDatos;
                IEnumerable<ReportDataSource> datasets = new List<ReportDataSource> { dsOBJ };
                LocalReport localReport = new LocalReport();
                localReport.ReportPath = HttpContext.Current.Server.MapPath("~/Reportes/ReportInfracciones.rdlc");
                foreach (ReportDataSource datasource in datasets)
                {
                    localReport.DataSources.Add(datasource);
                }

                //Renderizado
                string deviceInfo = "<DeviceInfo><OutputFormat>PDF</OutputFormat></DeviceInfo>";
                Warning[] warnings;
                string[] streams;
                string mimeType;
                byte[] renderedBytes;
                string encoding;
                string fileNameExtension;

                string path = ConfigurationManager.AppSettings["RutaArchivo"];
                //string path = @"D:\Report\" + v_SPROCESO;
                pathPdf = (path  + "InfraccionesReporte.pdf");

                renderedBytes = localReport.Render("PDF", deviceInfo, out mimeType, out encoding, out fileNameExtension, out streams, out warnings);

                FileStream file = default(FileStream);

                if (!System.IO.Directory.Exists(path))
                {
                    System.IO.Directory.CreateDirectory(path);
                }

                file = new FileStream(pathPdf, FileMode.Create);
                file.Write(renderedBytes, 0, renderedBytes.Length);

                file.Close();
                file.Dispose();
                patchreturn = ConfigurationManager.AppSettings["RutaArchivoView"] + "InfraccionesReporte.pdf";

            }
            catch (Exception ex)
            {
                throw ex;
            }
            return patchreturn;
        }
    }
}
