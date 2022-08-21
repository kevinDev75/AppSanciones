using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sanciones.Entidades.RSL
{
    class CadetesRsl
    {
    }

    public class GetListCadetesRsl
    {
        public string CIP { get; set; }
        public string ape_paterno { get; set; }
        public string ape_materno { get; set; }
        public string nombres { get; set; }
        public string nombre_completo { get; set; }
        public int id_grado { get; set; }
        public int id_cargo { get; set; }
        public int puntaje_actual { get; set; }
        public string des_grado { get; set; }
        public string des_cargo { get; set; }
    }


}
