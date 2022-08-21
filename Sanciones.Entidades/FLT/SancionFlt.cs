using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sanciones.Entidades.FLT
{
    public class SancionFlt
    {

      
    }
    public class GetSearchInfraccionFlt
    {
        public string codigo_infraccion { get; set; }

        public string des_infraccion { get; set; }

        public int id_tipo_sancion { get; set; }

    }
    public class GetSearchSancionadorFlt
    {
        public string CIP { get; set; }

        public string nombres_completos { get; set; }

    }
}
