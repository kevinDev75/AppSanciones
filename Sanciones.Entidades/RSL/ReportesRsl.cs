using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sanciones.Entidades.RSL
{
    public class ReportesRsl
    {
        public string codigo_infraccion { get; set; }

        public string des_infraccion { get; set; }

        public string des_breve_sancion { get; set; }
            
        public string des_clasif_inf_fundamento { get; set; }

        public string des_clasif_inf_gravedad { get; set; }
        public int cantidad { get; set; }
    }

    public class ReportesSancionadorRsl
    {
        public string nombre_completo { get; set; }
        public string CIP { get; set; }
        public string ape_paterno { get; set; }
        public string ape_materno { get; set; }
        public string nombres { get; set; }
        public string des_grado { get; set; }
        public string des_cargo { get; set; }
        public string des_breve_sancion { get; set; }
        public int cant_tipo_sancion { get; set; }
        public string nom_estado { get; set; }
        public int cantidad_estado { get; set; }
        public int cantidad { get; set; }
        
    }
}
