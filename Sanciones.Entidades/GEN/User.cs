using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sanciones.Entidades.GEN
{
    public class User
    {
        public string IdUser { get; set; }
        public List<Rol> ListRoles { get; set; }
        public string CIP { get; set; }
    }
}
