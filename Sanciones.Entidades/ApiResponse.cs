using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sanciones.Entidades
{
    public class ApiResponse
    {
        public ApiResponse(string _Status, string _Message)
        {
            this.status = _Status;
            this.msg = _Message;
        }
        public string status { get; set; }
        public object data { get; set; }
        public string msg { get; set; }
    }
}
