using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sanciones.Entidades.RSL
{
    class AccesoRsl
    {
    }

    public class GetAccesosRsl
    {
        public int id_acceso { get; set; }
        public string nom_acceso { get; set; }
        public int id_modulo { get; set; }
        public int num_nivel { get; set; }
        public int ind_sub_menu { get; set; }
        public string control { get; set; }
        public string view { get; set; }
        public string icon { get; set; }
    }
}
