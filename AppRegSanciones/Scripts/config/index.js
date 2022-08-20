// -- GLOBAL
const BASE_URL = '/'
//const BASE_URL_PRIMARY = 'https://mercurio.ddigitaldesign.online/AppMercurial-API-QA/api/'
//const BASE_URL_PRIMARY = 'https://192.168.2.4:9443/AppMercurial-API/api/'
const BASE_URL_PRIMARY = 'https://mercurio.grupo-atenea.com/AppMercurial-API/api/'

//SPEECH SENTINEL
const speech_sentinel_bajo = 'En base a su comportamiento financiero muestra un RIESGO BAJO, demostrando responsabilidad, compromiso y confiabilidad en sus pagos respectivos. Por ende, se infiere que es una persona que controla sus impulsos respecto a sus gestiones económicas.'
const speech_sentinel_medio = 'En base a su comportamiento financiero muestra un RIESGO MEDIO, debido que ha ido pagando de manera no constante pero consecutiva. Asimismo se puede inferir que es una persona que no mide de manera consecuente su compromiso o no maneja un adecuado control de impulso en temas financieros.'
const speech_sentinel_alto = 'En base a su comportamiento financiero muestra un nivel de RIESGO ALTO, debido a incumplimientos de pago. Asimismo se puede inferir que es una persona que se descuida con su compromiso o no maneja un adecuado control de impulso en temas financieros.'

var jsonPaises = [
    {
        "codPais": "PE",
        "descPais": "Peruano(o)",
    },
    {
        "codPais": "VE",
        "descPais": "Venezolano(a)",
    },
    {
        "codPais": "CO",
        "descPais": "Colombiano(a)",
    },
    {
        "codPais": "AR",
        "descPais": "Argentino(a)",
    },
    {
        "codPais": "PY",
        "descPais": "Paraguayo(a)",
    },
    {
        "codPais": "CH",
        "descPais": "Chileno(a)",
    },
    {
        "codPais": "EC",
        "descPais": "Ecuatoriano(a)",
    },
    {
        "codPais": "BR",
        "descPais": "Brasileño(a)",
    }
]


// -- FECHA ACTUAL GLOBAL
let date = new Date();
var day = date.getDate();           // -- obteniendo dia
var month = date.getMonth() + 1;    // -- obteniendo mes
var year = date.getFullYear();      // -- obteniendo año
// --
if (day < 10)
    day = '0' + day;                    // -- agrega cero si el menor de 10
if (month < 10)
    month = '0' + month                 // -- agrega cero si el menor de 10
// --
const FECHA_HOY = day + '/' + month + '/' + year

// -- MENSAJES GLOBAL
const MESSAGE = new Object()
// --
let es = new Object()
// --
es["success_insert"] = 'Registro almacenado en el sistema con exito'
es["error_insert"] = 'No fue posible guardar el registro ingresado, verificar'
es["success_select"] = 'Retornando lista de registros encontrados'
es["error_select"] = 'No se encontraron registros en el sistema'
es["success_update"] = 'Edicion del registro exitosa'
es["error_update"] = 'No fue posible editar el registro seleccionado, verificar'
es["success_delete"] = 'Registro eliminado con exito del sistema'
es["error_delete"] = 'No fue posible eliminar el registro seleccionado, verificar'
// --
es["complete_formulary"] = 'Es necesario completar el formulario :('
// --
MESSAGE["es"] = es

// -- LABELS
let jsonLabel = {
    // -- 
    "ES": { // -- Español
        "HOME": {
            "lbl_titulo": "Principal"
        },
        "WORK_INTEGRITY": {
            "lbl_titulo": "Registro de solicitudes",
            "lbl_codigo_buscador": "Código",
            "lbl_fecha_inicio_buscador": "Fecha Inicio:",
            "lbl_fecha_fin_buscador": "Fecha Fin:",
            "lbl_dni_buscador": "DNI :",
            "lbl_buscar_buscador": "Buscar",
            "lbl_estado_buscador": "Estado",
            "lbl_marcar_buscador": "Marcar / Desmarcar todos",
            "lbl_listado_registro": "Listado de registros",
            // --
            "lbl_table_codigo": "Código",
            "lbl_table_servicios": "Servicios",     
            "lbl_table_enviado_por": "Enviado por",
            "lbl_table_fecha_hora": "Fecha y hora",
            "lbl_table_estado": "Estado",
            "lbl_table_accion": "Acción",
            // --
            "lbl_modal_register_informacion_personal": "Información Personal",
            "lbl_modal_register_tipo_documento": "Tipo de documento: ",
            "lbl_modal_register_nro_documento": "N° de documento: ",
            "lbl_modal_register_telefono": "Telefono: ",
            "lbl_modal_register_celular": "Célular: ",
            "lbl_modal_register_departamento": "Departamento: ",
            "lbl_modal_register_distrito": "Distrito: ",
            "lbl_modal_register_direccion": "Dirección: ",
            "lbl_modal_register_email": "Email: ",
            "lbl_modal_register_servicio": "Servicio: ",
            "lbl_modal_register_agregar": "Agregar",
            // --
            "lbl_modal_register_table_id": "ID",
            "lbl_modal_register_table_tipo_documento": "T. Doc.",
            "lbl_modal_register_table_numero_documento": "N°. Doc.",
            "lbl_modal_register_table_telefono": "Tel.",
            "lbl_modal_register_table_celular": "Cel.",
            "lbl_modal_register_table_departamento": "Departamento",
            "lbl_modal_register_table_distrito": "Distrito",
            "lbl_modal_register_table_direccion": "Dirección",
            "lbl_modal_register_table_email": "Email",
            "lbl_modal_register_table_servicio": "Serv.",
            "lbl_modal_register_table_accion": "Acción",
            // --
            "lbl_completar_informacion": "Completar información"
        },
        "WORK_INTEGRITY_DETAIL": {
            "lbl_registro_verificacion": "Detalle",
            "lbl_numero_documento": "S0001",
            "lbl_listado_registro": "Listado de registros",
            "lbl_table_tipo_documento": "T. Documento",
            "lbl_table_num_documento": "Nro. Documento",
            "lbl_table_num_servicio": "Servicio",
            "lbl_table_num_departamento": "Departamento",
            "lbl_table_num_distrito": "Distrito",
            "lbl_table_num_direccion": "Dirección",
            "lbl_table_num_email": "Email",
            "lbl_table_num_celular": "Celular",
            "lbl_table_num_accion": "Accion"
        }
    },
    "BR": { // -- Portugués
        "HOME": {
            "lbl_titulo": "Diretor"
        },
        "WORK_INTEGRITY": {
            "lbl_titulo": "Registro de pedido",
            "lbl_codigo_buscador": "Código",
            "lbl_fecha_inicio_buscador": "Fecha de Inicio:",
            "lbl_fecha_fin_buscador": "Dados Finais:",
            "lbl_dni_buscador": "RG :",
            "lbl_buscar_buscador": "Olhe para",                                                
            "lbl_estado_buscador": "Estado",
            "lbl_marcar_buscador": "Marca / Desmarque tudo",
            "lbl_listado_registro": "Lista de registros",
            // --
            "lbl_table_codigo": "Código",
            "lbl_table_servicios": "Serviços",
            "lbl_table_enviado_por": "Enviado por",
            "lbl_table_fecha_hora": "Data e Hora",
            "lbl_table_estado": "Estado",
            "lbl_table_accion": "Açao",
            // --
            "lbl_modal_register_informacion_personal": "Informação Pessoal",
            "lbl_modal_register_tipo_documento": "Tipo de documento: ",
            "lbl_modal_register_nro_documento": "N° do documento: ",
            "lbl_modal_register_telefono": "Telefone: ",
            "lbl_modal_register_celular": "Móvel: ",
            "lbl_modal_register_departamento": "Departamento: ",
            "lbl_modal_register_distrito": "Distrito: ",
            "lbl_modal_register_direccion": "Direção: ",
            "lbl_modal_register_email": "Email: ",
            "lbl_modal_register_servicio": "Serviço: ",
            "lbl_modal_register_agregar": "Adicionar",
            // --
            "lbl_modal_register_table_id": "ID",
            "lbl_modal_register_table_tipo_documento": "T. Doc.",
            "lbl_modal_register_table_numero_documento": "N°. Doc.",
            "lbl_modal_register_table_telefono": "Tel.",
            "lbl_modal_register_table_celular": "Cel.",
            "lbl_modal_register_table_departamento": "Departamento",
            "lbl_modal_register_table_distrito": "Distrito",
            "lbl_modal_register_table_direccion": "Endereço",
            "lbl_modal_register_table_email": "O email",
            "lbl_modal_register_table_servicio": "Serv.",
            "lbl_modal_register_table_accion": "Açao"
        },
        "WORK_INTEGRITY_DETAIL": {
            "lbl_registro_verificacion": "Detalhe",
            "lbl_numero_documento": "S0001",
            "lbl_listado_registro": "Lista de registros",
            "lbl_table_tipo_documento": "T. Documento",
            "lbl_table_num_documento": "N º do documento.",
            "lbl_table_num_servicio": "Serviço",
            "lbl_table_num_departamento": "Departamento",
            "lbl_table_num_distrito": "Distrito",
            "lbl_table_num_direccion": "Endereço",
            "lbl_table_num_email": "O email",
            "lbl_table_num_celular": "Celular",
            "lbl_table_num_accion": "Açao"
        }   
    },
}

function setInputDatePicker(value) {
    $("#" + value).datepicker({
        dateFormat: "dd/mm/yy",
        

    });
}

function convertToString(value) {
    return value + ""
}

function getFileExtension(filename) {
    return filename.slice((filename.lastIndexOf(".") - 1 >>> 0) + 2);
}


function formatSave(value) {  //Formato para guardar date
    
    try {
        if (value != null && value != "-" && value != "") {
            console.log(value)
            console.log(moment(value, 'DD/MM/YYYY').format("YYYY-MM-DD"));
            return moment(value, 'DD/MM/YYYY').format("YYYY-MM-DD");
        }
    } catch (ex) {
        return null;
    }
}


function formatSaveDefault(value) {  //Formato para guardar date

    try {
        if (value != null && value != "-" && value != "") {
            //console.log(value)
            //console.log(moment(value, 'YYYY-MM-DD').format("YYYY-MM-DD"));
            return moment(value, 'YYYY-MM-DD').format("YYYY-MM-DD");
        }
    } catch (ex) {
        return null;
    }
}



function formatDate(value) { //Formato para obtener date

    if (value != null && value != undefined) {
        value = value.split(' ')[0];
        return value;
    } else {
        return null;
    }

}
function FillDatatable(table, entidad, orden) {

    var table = $('#tbl_1_2_list').DataTable();
    console.log(table);

    if (entidad != undefined && entidad.length > 0) { 
        entidad.forEach((element) => {
            console.log(element);
            var index = table.length + 1;
        var newJson = {};
        newJson["INDEX"] = index;
        newJson["ACCIÓN"] = ' <button class= "btn btn-sm btn-danger" data-id="' + index + '" id="btn_1_3_delete_row"> <i class="fa fa-trash"></i></button >';
            orden.forEach((e) => {
                newJson[e] ="asd";
            }),
                console.log(newJson);
            table.row.add(newJson).draw(false);
        table.columns.adjust()
            .responsive.recalc();
    });
  }
}

function isUrl(s) {
    var regexp = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/
    return regexp.test(s);
}

function IsNullOrEmpty(value) {
    if (value == null || value == '' || value == undefined) {
        return true;
    } else {
        return false;
    }
}
