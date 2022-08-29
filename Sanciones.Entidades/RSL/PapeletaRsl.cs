using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sanciones.Entidades.RSL
{
    class PapeletaRsl
    {
    }

    public class GetListPapeletaRsl
    {
        public long id_papeleta_infraccion_disc { get; set; }
        public string codigo_papeleta_infraccion_disc { get; set; }
        public string fecha_registro_sancionado { get; set; }
        public string fecha_aprobacion_sancionador { get; set; }
        public string cip_sancionador { get; set; }
        public string cadete_sancionador { get; set; }
        public string cip_sancionado { get; set; }
        public string cadete_sancionado { get; set; }
        public string codigo_infraccion { get; set; }
        public string des_infraccion { get; set; }
        public int id_estado_papeleta { get; set; }
        public string Nota { get; set; }
        public string nom_estado { get; set; }
        public int id_tipo_sancion { get; set; }
        public string des_breve_sancion { get; set; }
        public string des_grado_sancionado { get; set; }
        public string des_grado_sancionador { get; set; }
    }



}
