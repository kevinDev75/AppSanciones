using Dapper;
using Sanciones.Entidades.FLT;
using Sanciones.Entidades.RSL;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;

namespace Sanciones.Data
{
    public class SancionDa
    {
        private string cadenaConexion;
        public SancionDa()
        {
            cadenaConexion = ConfigurationManager.ConnectionStrings["conexionBD"].ConnectionString;
        }

        public void SavePapeletaInfraccion(SavePapeletaFlt oSavePapeletaFlt)
        {
            try
            {
                using (IDbConnection db = new SqlConnection(cadenaConexion))
                {
                    db.Open();
                    var parametros = new DynamicParameters();
                    parametros.Add("@cip_sancionador", oSavePapeletaFlt.cip_sancionador);
                    parametros.Add("@cip_sancionado", oSavePapeletaFlt.cip_sancionado);
                    parametros.Add("@codigo_infraccion", oSavePapeletaFlt.codigo_infraccion);
                    parametros.Add("@Nota", oSavePapeletaFlt.Nota);

                    db.Execute("SP_PAPELETA_INFRACCION_DISCIPLINARIA_INS_01", param: parametros, commandType: CommandType.StoredProcedure);
                    db.Close();
                    db.Dispose();
                }
            }
            catch (Exception ex)
            {
                throw;
            }
        }

        public void UpdateInfraccionXID(GetSearchInfraccionFlt oSavePapeletaFlt)
        {
            try
            {
                using (IDbConnection db = new SqlConnection(cadenaConexion))
                {
                    db.Open();
                    var parametros = new DynamicParameters();
                    parametros.Add("@codigo_infraccion", oSavePapeletaFlt.codigo_infraccion);
                    parametros.Add("@id_tipo_sancion", oSavePapeletaFlt.id_tipo_sancion);
                    parametros.Add("@id_clasif_inf_gravedad", oSavePapeletaFlt.id_clasif_inf_gravedad);
                    parametros.Add("@id_clasif_inf_fundamento", oSavePapeletaFlt.id_clasif_inf_fundamento);
                    parametros.Add("@des_infraccion", oSavePapeletaFlt.des_infraccion);

                    db.Execute("SP_UPDATE_INFRACCION_SEL_XID_01", param: parametros, commandType: CommandType.StoredProcedure);
                    db.Close();
                    db.Dispose();
                }
            }
            catch (Exception ex)
            {
                throw;
            }
        }
        
        public void UpdateInfraccionDemeritadoXID(getInsertDemeritoFlt oSavePapeletaFlt)
        {
            try
            {
                using (IDbConnection db = new SqlConnection(cadenaConexion))
                {
                    db.Open();
                    var parametros = new DynamicParameters();
                    parametros.Add("@codigo_infraccion", oSavePapeletaFlt.codigo_infraccion);
                    parametros.Add("@id_grado", oSavePapeletaFlt.id_grado);
                    parametros.Add("@id_tipo_sancion", oSavePapeletaFlt.id_tipo_sancion);
                    parametros.Add("@puntaje_demerito", oSavePapeletaFlt.puntaje_demerito);
                    

                    db.Execute("SP_UPDATE_REL_PUNTAJE_X_GRADO_SEL_01", param: parametros, commandType: CommandType.StoredProcedure);
                    db.Close();
                    db.Dispose();
                }
            }
            catch (Exception ex)
            {
                throw;
            }
        }

        public void UpdateEstadoPapeletaInfraccion(UpdatePapeletaInfraccionFlt oUpdatePapeletaInfraccionFlt)
        {
            try
            {
                using (IDbConnection db = new SqlConnection(cadenaConexion))
                {
                    db.Open();
                    var parametros = new DynamicParameters();
                    parametros.Add("@id_papeleta_infraccion_disc", oUpdatePapeletaInfraccionFlt.id_papeleta_infraccion_disc);
                    parametros.Add("@id_estado_papeleta", oUpdatePapeletaInfraccionFlt.id_estado_papeleta);
                    parametros.Add("@Nota", oUpdatePapeletaInfraccionFlt.Nota);

                    db.Execute("SP_PAPELETA_INFRACCION_DISCIPLINARIA_UPD_01", param: parametros, commandType: CommandType.StoredProcedure);
                    db.Close();
                    db.Dispose();
                }
            }
            catch (Exception ex)
            {
                throw;
            }
        }



        public List<GetListPapeletaRsl> GetListPapeletaInfraccion(GetListPapeletaInfraccionFlt oGetListPapeletaInfraccionFlt)
        {
            List<GetListPapeletaRsl> ListEntityRsl = new List<GetListPapeletaRsl>();

            try
            {
                using (IDbConnection db = new SqlConnection(cadenaConexion))
                {
                    var parametros = new DynamicParameters();
                    parametros.Add("@fecha_inicio", oGetListPapeletaInfraccionFlt.fecha_inicio);
                    parametros.Add("@fecha_fin", oGetListPapeletaInfraccionFlt.fecha_fin);
                    parametros.Add("@codigo_papeleta_infraccion_disc", oGetListPapeletaInfraccionFlt.codigo_papeleta_infraccion_disc);
                    parametros.Add("@cip_sancionador", oGetListPapeletaInfraccionFlt.cip_sancionador);
                    parametros.Add("@cip_sancionado", oGetListPapeletaInfraccionFlt.cip_sancionado);
                    parametros.Add("@id_estado_papeleta", oGetListPapeletaInfraccionFlt.id_estado_papeleta);
                    db.Open();
                    ListEntityRsl = db.Query<GetListPapeletaRsl>("SP_PAPELETA_INFRACCION_DISCIPLINARIA_SEL_01", param: parametros, commandType: CommandType.StoredProcedure).ToList();
                    db.Close();
                    db.Dispose();
                }
            }
            catch (Exception ex)
            {

            }
            return ListEntityRsl;
        }

        public List<GetListPapeletaRsl> GetListPapeletaInfraccionParaAprobar(GetListPapeletaInfraccionParaAprobarFlt oGetListPapeletaInfraccionParaAprobarFlt)
        {
            List<GetListPapeletaRsl> ListEntityRsl = new List<GetListPapeletaRsl>();

            try
            {
                using (IDbConnection db = new SqlConnection(cadenaConexion))
                {
                    var parametros = new DynamicParameters();
                    parametros.Add("@cip_sancionador", oGetListPapeletaInfraccionParaAprobarFlt.cip_sancionador);
                    parametros.Add("@id_estado_papeleta", oGetListPapeletaInfraccionParaAprobarFlt.id_estado_papeleta);
                    db.Open();
                    ListEntityRsl = db.Query<GetListPapeletaRsl>("SP_PAPELETA_INFRACCION_DISCIPLINARIA_SEL_02", param: parametros, commandType: CommandType.StoredProcedure).ToList();
                    db.Close();
                    db.Dispose();
                }
            }
            catch (Exception ex)
            {

            }
            return ListEntityRsl;
        }


        public List<GetSearchInfraccionRsl> GetSearchSanciones(GetSearchInfraccionFlt oGetListPapeletaInfraccionFlt)
        {
            List<GetSearchInfraccionRsl> ListEntityRsl = new List<GetSearchInfraccionRsl>();

            try
            {
                using (IDbConnection db = new SqlConnection(cadenaConexion))
                {
                    var parametros = new DynamicParameters();
                    parametros.Add("@codigo_infraccion", oGetListPapeletaInfraccionFlt.codigo_infraccion);
                    parametros.Add("@des_infraccion", oGetListPapeletaInfraccionFlt.des_infraccion);
                    parametros.Add("@id_tipo_sancion", (oGetListPapeletaInfraccionFlt.id_tipo_sancion));
                    parametros.Add("@id_clasif_inf_fundamento", oGetListPapeletaInfraccionFlt.id_clasif_inf_fundamento);
                    parametros.Add("@id_clasif_inf_gravedad", oGetListPapeletaInfraccionFlt.id_clasif_inf_gravedad);
                    db.Open();
                    ListEntityRsl = db.Query<GetSearchInfraccionRsl>("SP_BUSCAR_INFRACCION_SEL_01", param: parametros, commandType: CommandType.StoredProcedure).ToList();
                    db.Close();
                    db.Dispose();
                }
            }
            catch (Exception ex)
            {

            }
            return ListEntityRsl;
        }



        public List<TipoSancionRsl> GetListTipoSancion()
        {
            List<TipoSancionRsl> ListEntityRsl = new List<TipoSancionRsl>();

            try
            {
                using (IDbConnection db = new SqlConnection(cadenaConexion))
                {
                    var parametros = new DynamicParameters();
                    db.Open();
                    ListEntityRsl = db.Query<TipoSancionRsl>("SP_TIP_SANCION_SEL_01", commandType: CommandType.StoredProcedure).ToList();
                    db.Close();
                    db.Dispose();
                }
            }
            catch (Exception ex)
            {

            }
            return ListEntityRsl;
        }

        public void SaveRegistroInfraccion(SaveRegistroInfraccionFlt oSaveRegistroInfraccionFlt)
        {
            try
            {
                using (IDbConnection db = new SqlConnection(cadenaConexion))
                {
                    db.Open();
                    var parametros = new DynamicParameters();
                    parametros.Add("@id_papeleta_infraccion_disc", oSaveRegistroInfraccionFlt.id_papeleta_infraccion_disc);
                    parametros.Add("@cip_sancionador", oSaveRegistroInfraccionFlt.cip_sancionador);
                    parametros.Add("@cip_sancionado", oSaveRegistroInfraccionFlt.cip_sancionado);
                    parametros.Add("@cant_arresto_simple", oSaveRegistroInfraccionFlt.cant_arresto_simple);
                    parametros.Add("@cant_arresto_rigor", oSaveRegistroInfraccionFlt.cant_arresto_rigor);

                    db.Execute("SP_REGISTRO_INFRACCIONES_INS_01", param: parametros, commandType: CommandType.StoredProcedure);
                    db.Close();
                    db.Dispose();
                }
            }
            catch (Exception ex)
            {
                throw;
            }
        }
        public void SaveRegistroInfraccionMaestro(GetSearchInfraccionFlt oSaveRegistroInfraccionFlt)
        {
            try
            {
                using (IDbConnection db = new SqlConnection(cadenaConexion))
                {
                    db.Open();
                    var parametros = new DynamicParameters();
                    parametros.Add("@codigo_infraccion", oSaveRegistroInfraccionFlt.codigo_infraccion.ToUpper());
                    parametros.Add("@des_infraccion", oSaveRegistroInfraccionFlt.des_infraccion);
                    parametros.Add("@id_clasif_inf_fundamento", oSaveRegistroInfraccionFlt.id_clasif_inf_fundamento);
                    parametros.Add("@id_clasif_inf_gravedad", oSaveRegistroInfraccionFlt.id_clasif_inf_gravedad);
                    parametros.Add("@id_tipo_sancion", oSaveRegistroInfraccionFlt.id_tipo_sancion);

                    db.Execute("SP_REGISTRO_INFRA_MAE_INS_01", param: parametros, commandType: CommandType.StoredProcedure);
                    db.Close();
                    db.Dispose();
                }
            }
            catch (Exception ex)
            {
                throw;
            }
        }

        public void SaveRegistroInfraccionDemerito(getInsertDemeritoFlt oSaveRegistroInfraccionFlt)
        {
            try
            {
                using (IDbConnection db = new SqlConnection(cadenaConexion))
                {
                    db.Open();
                    var parametros = new DynamicParameters();
                    parametros.Add("@codigo_infraccion", oSaveRegistroInfraccionFlt.codigo_infraccion);
                    parametros.Add("@id_grado", oSaveRegistroInfraccionFlt.id_grado);
                    parametros.Add("@id_tipo_sancion", oSaveRegistroInfraccionFlt.id_tipo_sancion);
                    parametros.Add("@puntaje_demerito", oSaveRegistroInfraccionFlt.puntaje_demerito);

                    db.Execute("SP_REGISTRO_REL_PUNTJ_01", param: parametros, commandType: CommandType.StoredProcedure);
                    db.Close();
                    db.Dispose();
                }
            }
            catch (Exception ex)
            {
                throw;
            }
        }



        public List<GetListRegistroInfraccionRsl> GetListRegistroInfraccion(string cip_sancionado)
        {
            List<GetListRegistroInfraccionRsl> ListEntityRsl = new List<GetListRegistroInfraccionRsl>();

            try
            {
                using (IDbConnection db = new SqlConnection(cadenaConexion))
                {
                    db.Open();
                    var parametros = new DynamicParameters();
                    parametros.Add("@cip_sancionado", cip_sancionado);

                    ListEntityRsl = db.Query<GetListRegistroInfraccionRsl>("SP_REGISTRO_INFRACCIONES_SEL_01", param: parametros, commandType: CommandType.StoredProcedure).ToList();
                    db.Close();
                    db.Dispose();
                }
            }
            catch (Exception ex)
            {

            }
            return ListEntityRsl;
        }



        public GetListPuntaje getActualPuntajeInfracciones(GetListPapeletaInfraccionFlt oGetListPapeletaInfraccionFlt)
        {
            GetListPuntaje ListEntityRsl = new GetListPuntaje();

            try
            {
                using (IDbConnection db = new SqlConnection(cadenaConexion))
                {
                    var parametros = new DynamicParameters();
                    parametros.Add("@cip_mes", oGetListPapeletaInfraccionFlt.id_mes);
                    parametros.Add("@cip_sancionado", oGetListPapeletaInfraccionFlt.cip_sancionado);
                    db.Open();
                    ListEntityRsl = db.Query<GetListPuntaje>("SP_PUNTAJE_ACTUAL_CADETE_SEL_01", param: parametros, commandType: CommandType.StoredProcedure).First();
                    db.Close();
                    db.Dispose();
                }
            }
            catch (Exception ex)
            {

            }
            return ListEntityRsl;
        }


        public GetSearchInfraccionRsl getInfraccionDetailxID(GetSearchInfraccionFlt oGetListPapeletaInfraccionFlt)
        {
            GetSearchInfraccionRsl ListEntityRsl = new GetSearchInfraccionRsl();

            try
            {
                using (IDbConnection db = new SqlConnection(cadenaConexion))
                {
                    var parametros = new DynamicParameters();
                    parametros.Add("@codigo_infraccion", oGetListPapeletaInfraccionFlt.codigo_infraccion);
                    db.Open();
                    ListEntityRsl = db.Query<GetSearchInfraccionRsl>("SP_BUSCAR_INFRACCION_SEL_XID_01", param: parametros, commandType: CommandType.StoredProcedure).First();
                    db.Close();
                    db.Dispose();
                }
            }
            catch (Exception ex)
            {

            }
            return ListEntityRsl;
        }

        public List<getInsertDemeritoRsl> getPuntajesxInfraccionxID(GetSearchInfraccionFlt oGetListPapeletaInfraccionFlt)
        {
            List<getInsertDemeritoRsl> ListEntityRsl = new List<getInsertDemeritoRsl>();

            try
            {
                using (IDbConnection db = new SqlConnection(cadenaConexion))
                {
                    var parametros = new DynamicParameters();
                    parametros.Add("@codigo_infraccion", oGetListPapeletaInfraccionFlt.codigo_infraccion);
                    db.Open();
                    ListEntityRsl = db.Query<getInsertDemeritoRsl>("SP_BUSCAR_REL_PUNTAJE_X_GRADO_SEL_01", param: parametros, commandType: CommandType.StoredProcedure).ToList();
                    db.Close();
                    db.Dispose();
                }
            }
            catch (Exception ex)
            {

            }
            return ListEntityRsl;
        }



    }
}
