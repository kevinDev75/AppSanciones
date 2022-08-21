using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sanciones.Utilities
{
    public sealed class Constant
    {
        // --
        public const string success_insert = "Registro almacenado en el sistema con exito";
        public const string error_insert = "No fue posible guardar el registro ingresado, verificar";
        // --
        public const string success_select = "Retornando lista de registros encontrados";
        public const string error_select = "No se encontraron registros en el sistema";
        // --
        public const string success_update = "Edicion del registro exitosa";
        public const string error_update = "No fue posible editar el registro seleccionado, verificar";
        // --
        public const string success_delete = "Registro eliminado con exito del sistema";
        public const string error_delete = "No fue posible eliminar el registro seleccionado, verificar";
        // --
        public const string error_server = "Error en el servidor";
    }

    public sealed class Settings
    {
        public static string GetKey(KEY key)
        {
            return ConfigurationManager.AppSettings[key.ToString()].Trim();
        }
        public enum KEY
        {
            Username,
            Password,
            timeCookies,
            timeSession
        }
        public enum Session
        {
            CIP
        }
    }
}
