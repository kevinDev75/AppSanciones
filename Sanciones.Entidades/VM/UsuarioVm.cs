using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sanciones.Entidades.VM
{
    public class UsuarioVm
    {
        public int id_usuario { get; set; }
        public string nombre_usuario { get; set; }
        public string pass_usuario { get; set; }
        public string apellido_paterno { get; set; }
        public string apellido_materno { get; set; }
        public string nombre { get; set; }

        public string CIP { get; set; }
    }
}
