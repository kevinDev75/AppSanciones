using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sanciones.Entidades.RSL
{
    public class SancionRsl
    {

        
    }
    public class GetSearchInfraccionRsl
    {
        public string codigo_infraccion { get; set; }

        public string des_infraccion { get; set; }

        public int id_tipo_sancion { get; set; }
        public string des_breve_sancion { get; set; }

        public int id_clasif_inf_fundamento { get; set; }
        public string des_clasif_inf_fundamento { get; set; }

        public int id_clasif_inf_gravedad { get; set; }
        public string des_clasif_inf_gravedad { get; set; }
    }
}
