using System;
using System.Web;
using System.Web.Security;

namespace Sanciones.Utilities
{
    public class SessionHelper
    {
        public static bool ExistUserInSession()
        {
            //FormsAuthentication.SignOut();
            //HttpContext.Current.Session.Clear();
            //HttpContext.Current.Session.Abandon();

            //HttpContext.Current.Response.Cookies.Remove(FormsAuthentication.FormsCookieName);
            //HttpContext.Current.Response.Cache.SetExpires(DateTime.Now.AddSeconds(-1));
            //HttpCookie cookie = HttpContext.Current.Request.Cookies[FormsAuthentication.FormsCookieName];
            //if (cookie != null)
            //{
            //    cookie.Expires = DateTime.Now.AddDays(-1);
            //    HttpContext.Current.Response.Cookies.Add(cookie);

            //foreach (var cookie in HttpContext.Current.Request.Cookies.AllKeys)
            //{
            //    HttpContext.Current.Request.Cookies.Remove(cookie);
            //}
            //foreach (var cookie in HttpContext.Current.Response.Cookies.AllKeys)
            //{
            //    HttpContext.Current.Response.Cookies.Remove(cookie);
            //}
            //HttpContext.Current.Response.Cookies[FormsAuthentication.FormsCookieName].Expires = DateTime.Now.AddDays(-1);
            //HttpContext.Current.Response.Cookies.Remove(FormsAuthentication.FormsCookieName);

            //var sad = HttpContext.Current.User.Identity.Name;

            //FormsAuthentication.SignOut();
            //HttpContext.Current.Session.Abandon();
            //HttpContext.Current.Response.Cookies["Cookie"].Expires = DateTime.Now.AddDays(-1);
            //// clear authentication cookie
            //HttpCookie cookie1 = new HttpCookie(FormsAuthentication.FormsCookieName, "");
            //cookie1.HttpOnly = true;
            //cookie1.Expires = DateTime.Now.AddYears(-1);
            //HttpContext.Current.Response.Cookies.Add(cookie1);

            //// clear session cookie (not necessary for your current problem but i would recommend you do it anyway)
            //SessionStateSection sessionStateSection = (SessionStateSection)WebConfigurationManager.GetSection("system.web/sessionState");
            //HttpCookie cookie2 = new HttpCookie(sessionStateSection.CookieName, "");
            //cookie2.Expires = DateTime.Now.AddYears(-1);
            //HttpContext.Current.Response.Cookies.Add(cookie2);


            return HttpContext.Current.User.Identity.IsAuthenticated;
        }
        public static void DestroyUserSession()
        {
            FormsAuthentication.SignOut();

            DestroyValueSession(Settings.Session.CIP);
            FormsAuthentication.SignOut();
        }
        public static int GetUser()
        {
            int user_id = 0;
            if (HttpContext.Current.User != null && HttpContext.Current.User.Identity is FormsIdentity)
            {
                FormsAuthenticationTicket ticket = ((FormsIdentity)HttpContext.Current.User.Identity).Ticket;
                if (ticket != null)
                {
                    user_id = Convert.ToInt32(ticket.UserData);
                }
            }
            return user_id;
        }
        public static void AddUserToSession(string IdUsuario, string CIP)
        {
            bool persist = true;
            var cookie = FormsAuthentication.GetAuthCookie("usuario", persist);

            cookie.Name = FormsAuthentication.FormsCookieName;
            cookie.Expires = DateTime.Now.AddHours(Int32.Parse(Settings.GetKey(Settings.KEY.timeSession)));

            var ticket = FormsAuthentication.Decrypt(cookie.Value);
            var newTicket = new FormsAuthenticationTicket(ticket.Version, ticket.Name, ticket.IssueDate, ticket.Expiration, ticket.IsPersistent, IdUsuario);

            cookie.Value = FormsAuthentication.Encrypt(newTicket);
            HttpContext.Current.Response.Cookies.Add(cookie);

            //Session Values
            CreateValueSession(Settings.Session.CIP, CIP);
        }

        public static void CreateValueSession(Settings.Session session, string value)
        {
            if (HttpContext.Current.Request.Cookies[session.ToString()] == null)
            {
                HttpCookie cookie = new HttpCookie(session.ToString())
                {
                    Value = value,
                    Expires = DateTime.Now.AddHours(Int32.Parse(Settings.GetKey(Settings.KEY.timeSession)))
                };
                HttpContext.Current.Response.Cookies.Add(cookie);
            }
            else
            {
                HttpContext.Current.Response.Cookies[session.ToString()].Value = value;
                HttpContext.Current.Response.Cookies[session.ToString()].Expires = DateTime.Now.AddHours(Int32.Parse(Settings.GetKey(Settings.KEY.timeSession)));
            }
        }
        public static void DestroyValueSession(Settings.Session session)
        {
            System.Web.HttpContext.Current.Request.Cookies.Remove(session.ToString());
        }
        public static Object GetValueSession(Settings.Session session)
        {
            try
            {
                if (HttpContext.Current.Request.Cookies[session.ToString()] != null)
                {
                    return HttpContext.Current.Request.Cookies[session.ToString()].Value;
                }
                return "-1";
            }
            catch
            {
                return "-1";
            }
        }

    }
}
