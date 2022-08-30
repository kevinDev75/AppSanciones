using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sanciones.Entidades.RSL
{
    public class RegistroInfraccionRsl
    {
        
    }

    public class GetListRegistroInfraccionRsl
    {
        public long id_reg_infraccion { get; set; }
        public long id_papeleta_infraccion_disc { get; set; }
        public string fecha { get; set; }
        public string cadete_sancionador { get; set; }
        public string grado_sancionador { get; set; }
        public string cadete_sancionado { get; set; }
        public string grado_sancionado { get; set; }
        public string codigo_infraccion { get; set; }
        public string des_infraccion { get; set; }
        public string Nota { get; set; }
        public int puntaje_anterior { get; set; }
        public int puntaje_demerito { get; set; }
        public int puntaje_posterior { get; set; }
        public int cant_arresto_simple { get; set; }
        public int cant_arresto_rigor { get; set; }
    }

    public class GetListPuntaje
    {
        public string cip_sancionado { get; set; }
        public int puntaje_anterior { get; set; }
        public int puntaje_demerito { get; set; }
        public int puntaje_posterior { get; set; }
        public int cant_arresto_simple { get; set; }
        public int cant_arresto_rigor { get; set; }
    
    }
}
