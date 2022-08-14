using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sanciones.Entidades.FLT
{
    class CadeteFlt
    {
    }

    public class SaveCadeteFlt
    {
        public string CIP { get; set; }
        public string ape_paterno { get; set; }
        public string ape_materno { get; set; }
        public string nombres { get; set; }
        public int id_grado { get; set; }
        public int id_cargo { get; set; }
        public int puntaje_actual { get; set; }
    }
}
