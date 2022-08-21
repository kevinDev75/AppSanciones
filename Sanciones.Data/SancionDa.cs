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
                    parametros.Add("@codigo_papeleta_infraccion_disc", oSavePapeletaFlt.codigo_papeleta_infraccion_disc);
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

        public List<GetListPapeletaRsl> GetListPapeletaInfraccion(GetListPapeletaInfraccionFlt oGetListPapeletaInfraccionFlt)
        {
            List<GetListPapeletaRsl> ListEntityRsl = new List<GetListPapeletaRsl>();

            try
            {
                using (IDbConnection db = new SqlConnection(cadenaConexion))
                {
                    db.Open();
                    var parametros = new DynamicParameters();
                    parametros.Add("@fecha_inicio", oGetListPapeletaInfraccionFlt.fecha_inicio);
                    parametros.Add("@fecha_fin", oGetListPapeletaInfraccionFlt.fecha_fin);
                    parametros.Add("@codigo_papeleta_infraccion_disc", oGetListPapeletaInfraccionFlt.codigo_papeleta_infraccion_disc);
                    parametros.Add("@cip_sancionador", oGetListPapeletaInfraccionFlt.cip_sancionador);
                    parametros.Add("@cip_sancionado", oGetListPapeletaInfraccionFlt.cip_sancionado);
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



    }
}
