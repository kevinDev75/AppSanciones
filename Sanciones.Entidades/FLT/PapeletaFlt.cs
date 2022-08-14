using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sanciones.Entidades.FLT
{
    class PapeletaFlt
    {
    }

    public class SavePapeletaFlt
    {
        public long id_papeleta_infraccion_disc { get; set; }
        public string codigo_papeleta_infraccion_disc { get; set; }
        public string cip_sancionador { get; set; }
        public string cip_sancionado { get; set; }
        public string codigo_infraccion { get; set; }
        public int id_estado_papeleta { get; set; }
        public string Nota { get; set; }
    }
}
