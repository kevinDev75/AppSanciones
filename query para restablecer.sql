DELETE FROM T_MAE_CADETES
DELETE FROM T_REL_PUNTAJE_DEMERITO
DELETE FROM	 T_MAE_INFRACCION WHERE codigo_infraccion NOT IN ('L001','L002')
DELETE FROM T_REL_ROL_USUARIO
DELETE FROM T_MAE_USUARIO
DELETE FROM T_MOV_PAPELETA_INFRACCION_DISCIPLINARIA
DELETE FROM T_MOV_REGISTRO_INFRACCIONES
DELETE FROM T_REL_PUNTAJE_DEMERITO
UPDATE T_MAE_AUTOGEN SET valor=0
UPDATE T_MAE_AUTOGEN SET valor=1 WHERE nombre_tabla = 'T_MAE_USUARIO'
INSERT INTO [dbo].[T_MAE_USUARIO]
           ([id_usuario]
           ,[nombre_usuario]
           ,[pass_usuario]
           ,[flg_estado]
           ,[apellido_paterno]
           ,[apellido_materno]
           ,[nombre]
           ,[email])
     VALUES
           (1
           ,'12345678'
           ,'12345678'
           ,1
           ,''
           ,''
           ,'administrador'
           ,'')
insert into T_REL_ROL_USUARIO values(2,1)