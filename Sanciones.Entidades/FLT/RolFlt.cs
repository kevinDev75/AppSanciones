using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sanciones.Entidades.FLT
{
    class RolFlt
    {
    }

    public class GetRolFlt
    {
        public int id_usuario { get; set; }
    }

    public class SaveRolUsuarioFlt
    {
        public int id_rol { get; set; }
        public int id_usuario { get; set; }
    }

    public class DeleteRolUsuarioFlt
    {
        public int id_rol { get; set; }
        public int id_usuario { get; set; }
    }
}
