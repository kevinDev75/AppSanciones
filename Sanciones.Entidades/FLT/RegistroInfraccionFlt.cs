using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sanciones.Entidades.FLT
{
    class RegistroInfraccionFlt
    {
    }

    public class SaveRegistroInfraccionFlt
    {
        public long id_papeleta_infraccion_disc { get; set; }
        public string codigo_infraccion { get; set; }
        public string cip_sancionador { get; set; }
        public string cip_sancionado { get; set; }
        public int id_tipo_sancion { get; set; }
        public int cant_arresto_simple { get; set; }
        public int cant_arresto_rigor { get; set; }
        public string Nota { get; set; }
    }

}
