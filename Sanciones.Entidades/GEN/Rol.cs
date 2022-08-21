using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sanciones.Entidades.GEN
{
    public class Rol
    {
        public int IdRol { get; set; }
        public string Description { get; set; }
    }

    public class RolAccesoRsl
    {
        public int IdRol { get; set; }
        public int IdAcceso { get; set; }
        public string NombreAcceso { get; set; }
        public string Descripcion { get; set; }
        public int NumNivel { get; set; }
        public int EstadoAcceso { get; set; }
        public int IndSubMenu { get; set; }
        public string Control { get; set; }
        public string View { get; set; }
        public int Orden { get; set; }
        public string Icon { get; set; }
    }

    public class RolPrivilegioRsl
    {
        public int IdRol { get; set; }
        public int IdPrivilegio { get; set; }
        public string DesPrivilegio { get; set; }
        public string Descripcion { get; set; }
    }

    public class PrivilegioRsl
    {
        public int IdPrivilegio { get; set; }
        public string DesPrivilegio { get; set; }
        public string Descripcion { get; set; }
    }

    public class RolPrivilegioFlt
    {
        public int IdRol { get; set; }
        public int IdPrivilegio { get; set; }
    }
    public class GetRolAccesoRsl
    {
        public int IdAcceso { get; set; }
        public string Acceso { get; set; }
        public int IndSubMenu { get; set; }
    }

    public class RolAccesoFlt
    {
        public int IdRol { get; set; }
        public int IdAcceso { get; set; }
        public int IdUsuario { get; set; }
        public int IndSubMenu { get; set; }
    }

    public class GetListRolesRsl
    {
        public int IdRol { get; set; }
        public string NomRol { get; set; }
        public bool Estado { get; set; }
    }

    public class SaveRolFlt
    {
        public int IdRol { get; set; }
        public string NomRol { get; set; }
        public bool Estado { get; set; }
        public int IdUsuarioAccion { get; set; }
    }


}
