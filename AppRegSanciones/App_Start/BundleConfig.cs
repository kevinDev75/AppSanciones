using System.Web;
using System.Web.Optimization;

namespace AppRegSanciones
{
    public class BundleConfig
    {
        // Para obtener más información sobre las uniones, visite https://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {

            BundleTable.EnableOptimizations = false;

            #region JS

            bundles.Add(new ScriptBundle("~/bundles/bootstrap").Include(
                 "~/Scripts/bootstrap/bootstrap.bundle.min.js"));

            bundles.Add(new ScriptBundle("~/bundles/bootstrap-notify").Include(
                        "~/Scripts/bootstrap-notify/bootstrap-notify.min.js"));

            bundles.Add(new ScriptBundle("~/bundles/jquery").Include(
                        "~/Scripts/jquery/jquery.min.js"));

            bundles.Add(new ScriptBundle("~/bundles/jquery-ui").Include(
                        "~/Scripts/jquery-ui/datepicker.js"));

            bundles.Add(new ScriptBundle("~/bundles/perfect-scrollbar").Include(
                        "~/Scripts/perfect-scrollbar/perfect-scrollbar.min.js"));

            bundles.Add(new ScriptBundle("~/bundles/moment").Include(
                        "~/Scripts/moment/min/moment.min.js"));

            bundles.Add(new ScriptBundle("~/bundles/peity").Include(
                        "~/Scripts/peity/jquery.peity.min.js"));

            bundles.Add(new ScriptBundle("~/bundles/bracket").Include(
                        "~/Scripts/bracket/bracket.js"));

            bundles.Add(new ScriptBundle("~/bundles/timepicker").Include(
                        "~/Scripts/timepicker/jquery.timepicker.min.js"));

            bundles.Add(new ScriptBundle("~/bundles/datatables.net").Include(
                       "~/Scripts/datatables.net/jquery.dataTables.min.js"));

            bundles.Add(new ScriptBundle("~/bundles/datatables.net-dt").Include(
                       "~/Scripts/datatables.net-dt/dataTables.dataTables.min.js"));

            bundles.Add(new ScriptBundle("~/bundles/datatables.net-responsive").Include(
                       "~/Scripts/datatables.net-responsive/dataTables.responsive.min.js"));

            bundles.Add(new ScriptBundle("~/bundles/datatables.net-responsive-dt").Include(
                       "~/Scripts/datatables.net-responsive-dt/responsive.dataTables.min.js"));

            bundles.Add(new ScriptBundle("~/bundles/jquery.steps").Include(
                        "~/Scripts/jquery.steps/jquery.steps.min.js"));

            bundles.Add(new ScriptBundle("~/bundles/parsleyjs").Include(
                        "~/Scripts/parsleyjs/parsley.min.js"));

            bundles.Add(new ScriptBundle("~/bundles/sweetalert").Include(
                        "~/Scripts/sweetalert/sweetalert2.min.js"));

            bundles.Add(new ScriptBundle("~/bundles/main").Include(
                      "~/Scripts/main/index.js"));

            bundles.Add(new ScriptBundle("~/bundles/layout").Include(
                      "~/Scripts/layout/index.js"));

            bundles.Add(new ScriptBundle("~/bundles/config").Include(
                        "~/Scripts/config/index.js",
                        "~/Scripts/moment/moment.js",
                        "~/Scripts/function/master.js"));

            bundles.Add(new ScriptBundle("~/bundles/function").Include(
                        "~/Scripts/function/index.js"));

            bundles.Add(new ScriptBundle("~/bundles/login").Include(
                        "~/Scripts/login/index.js"));

            bundles.Add(new ScriptBundle("~/bundles/login/slidercaptcha").Include(
                        "~/Scripts/login/longbow.slidercaptcha.min.js"));


            bundles.Add(new ScriptBundle("~/bundles/linq").Include(
                       "~/Scripts/linq.js/linq.js"));

            bundles.Add(new ScriptBundle("~/lib/select2").Include(
                       "~/lib/select2/js/select2.min.js"));

            bundles.Add(new ScriptBundle("~/lib/highlightjs").Include(
                       "~/lib/highlightjs/highlight.pack.min.js"));


            bundles.Add(new ScriptBundle("~/bundles/Manage").Include(
                     "~/Scripts/Manage/search.js"));

            bundles.Add(new ScriptBundle("~/bundles/createIncidence").Include(
                    "~/Scripts/Manage/createIncidence.js"));

            bundles.Add(new ScriptBundle("~/bundles/jquery.i18n").Include(
           "~/Scripts/jquery.i18n/jquery.i18n.js"));

            bundles.Add(new ScriptBundle("~/bundles/jquery.i18n.messagestore").Include(
                "~/Scripts/jquery.i18n/jquery.i18n.messagestore.js"));

            bundles.Add(new ScriptBundle("~/bundles/jquery.i18n.fallbacks").Include(
                "~/Scripts/jquery.i18n/jquery.i18n.fallbacks.js"));

            bundles.Add(new ScriptBundle("~/bundles/jquery.i18n.language").Include(
                "~/Scripts/jquery.i18n/jquery.i18n.language.js"));

            bundles.Add(new ScriptBundle("~/bundles/jquery.i18n.parser").Include(
                "~/Scripts/jquery.i18n/jquery.i18n.parser.js"));

            bundles.Add(new ScriptBundle("~/bundles/jquery.i18n.emitter").Include(
                "~/Scripts/jquery.i18n/jquery.i18n.emitter.js"));

            bundles.Add(new ScriptBundle("~/bundles/jquery.i18n.emitter.bidi").Include(
                "~/Scripts/jquery.i18n/jquery.i18n.emitter.bidi.js"));

            bundles.Add(new ScriptBundle("~/bundles/internationalization").Include(
                "~/Scripts/internationalization/index.js"));

            bundles.Add(new ScriptBundle("~/bundles/pdf/jquery-ui").Include(
                "~/Scripts/pdf/jquery-ui.js"));

            bundles.Add(new ScriptBundle("~/bundles/pdf/pdf-min").Include(
                "~/Scripts/pdf/pdf.min.js"));

            bundles.Add(new ScriptBundle("~/bundles/pdf/pdf-worker").Include(
                "~/Scripts/pdf/pdf.worker.js"));

            bundles.Add(new ScriptBundle("~/bundles/cadetes").Include(
                "~/Scripts/cadetes/index.js"));

            bundles.Add(new ScriptBundle("~/bundles/mantenimiento_cadete").Include(
                "~/Scripts/cadetes/mantenimiento_cadete.js"));

            #endregion


            #region CSS

            bundles.Add(new StyleBundle("~/css/ModalCreateIncidence").Include(
                 "~/css/modals/ModalCreateIncidence.css"));
            bundles.Add(new StyleBundle("~/css/RegistrarIncidence").Include(
                 "~/css/view/RegistrarIncidence.css"));

            

            bundles.Add(new StyleBundle("~/Content/fortawesome").Include(
                     "~/Content/fortawesome/all.min.css"));

            bundles.Add(new StyleBundle("~/Content/ionicons").Include(
                     "~/Content/ionicons/css/ionicons.min.css"));

            bundles.Add(new StyleBundle("~/lib/style-select2").Include(
                     "~/lib/select2/css/select2.min.css"));

            bundles.Add(new StyleBundle("~/lib/style-github").Include(
                     "~/lib/highlightjs/styles/github.css"));

            bundles.Add(new StyleBundle("~/Content/bracket").Include(
                     "~/Content/bracket.css"));

            bundles.Add(new StyleBundle("~/Content/timepicker").Include(
                     "~/Content/timepicker/jquery.timepicker.css"));

            bundles.Add(new StyleBundle("~/Content/datatables.net-dt").Include(
                     "~/Content/datatables.net-dt/css/jquery.dataTables.min.css"));

            bundles.Add(new StyleBundle("~/Content/datatables.net-responsive-dt").Include(
                     "~/Content/datatables.net-responsive-dt/responsive.dataTables.min.css"));

            bundles.Add(new StyleBundle("~/Content/sweetalert").Include(
                        "~/Content/sweetalert/sweetalert.css"));

            bundles.Add(new StyleBundle("~/Content/sweetalert-minimal").Include(
                        "~/Content/sweetalert/minimal.css"));

            bundles.Add(new StyleBundle("~/Content/Shared").Include(
                     "~/Content/Views/Shared/style.css"));

            bundles.Add(new StyleBundle("~/Content/Login").Include(
                     "~/Content/Views/Login/Index.css"));

            bundles.Add(new StyleBundle("~/Content/Login/slidercaptcha").Include(
                     "~/Content/Views/Login/slidercaptcha.css"));

            bundles.Add(new StyleBundle("~/Content/pdf/jquery-ui").Include(
                     "~/Content/pdf/jquery-ui.css"));

            #endregion
        }
    }
}
