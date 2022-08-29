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
        public string codigo_papeleta_infraccion_disc { get; set; }
        public string cip_sancionador { get; set; }
        public string cip_sancionado { get; set; }
        public string codigo_infraccion { get; set; }
        public string Nota { get; set; }
    }

    public class UpdatePapeletaInfraccionFlt
    {
        public long id_papeleta_infraccion_disc { get; set; }
        public int id_estado_papeleta { get; set; }
        public string Nota { get; set; }
    }

    public class GetListPapeletaInfraccionFlt
    {
        public DateTime fecha_inicio { get; set; }
        public DateTime fecha_fin { get; set; }
        public string codigo_papeleta_infraccion_disc { get; set; }
        public string cip_sancionador { get; set; }
        public string cip_sancionado { get; set; }
        public int id_estado_papeleta { get; set; }
        public int id_mes { get; set; }
        
    }

    public class GetListPapeletaInfraccionParaAprobarFlt
    {
        public string cip_sancionador { get; set; }
        public int id_estado_papeleta { get; set; }
    }

}
