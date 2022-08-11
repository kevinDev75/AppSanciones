
// --
const functions = new Functions()
var ListAccessUser = null

//$(document).ready(function () {
//$("#sl_modal_register_GestionCorporativa_empresa").select2({
//    dropdownParent: $("#modal_register_GestionCorporativa")
//});
//});

// -- Datepicker
$('#txt_fecha_inicio_GestionCorporativa').datepicker({
    showOtherMonths: true,
    selectOtherMonths: true,
    dateFormat: 'dd/mm/yy'
})
$('#txt_fecha_fin_GestionCorporativa').datepicker({
    showOtherMonths: true,
    selectOtherMonths: true,
    dateFormat: 'dd/mm/yy'
})

// -- Datepicker
$('#txt_fecha_inicio_E_H').datepicker({
    showOtherMonths: true,
    selectOtherMonths: true,
    dateFormat: 'dd/mm/yy'
})
$('#txt_fecha_fin_E_H').datepicker({
    showOtherMonths: true,
    selectOtherMonths: true,
    dateFormat: 'dd/mm/yy'
})

// -- Datepicker
$('#txt_fecha_inicio_P_I_I').datepicker({
    showOtherMonths: true,
    selectOtherMonths: true,
    dateFormat: 'dd/mm/yy'
})
$('#txt_fecha_fin_P_I_I').datepicker({
    showOtherMonths: true,
    selectOtherMonths: true,
    dateFormat: 'dd/mm/yy'
})

// -- Datepicker
$('#txt_fecha_inicio_Delphos').datepicker({
    showOtherMonths: true,
    selectOtherMonths: true,
    dateFormat: 'dd/mm/yy'
})
$('#txt_fecha_fin_Delphos').datepicker({
    showOtherMonths: true,
    selectOtherMonths: true,
    dateFormat: 'dd/mm/yy'
})

// -- Datepicker
$('#txt_fecha_inicio_Osint').datepicker({
    showOtherMonths: true,
    selectOtherMonths: true,
    dateFormat: 'dd/mm/yy'
})
$('#txt_fecha_fin_Osint').datepicker({
    showOtherMonths: true,
    selectOtherMonths: true,
    dateFormat: 'dd/mm/yy'
})

//#region -- ANALISIS DE RIESGO

// -- VARIABLES
var listGestionCorporativa = new Array()
var indexListGestionCorporativa = 1

// -- TABLE
var tableDataGestionCorporativa = $('#tbl_data_GestionCorporativa').DataTable({
    responsive: true,
    language: {
        "url": "../Files/lenguaje-spanish.json"
    },
    order: [[0, "desc"]]
})

// -- GUARDAR
$('#btn_guardar_registro_GestionCorporativa').on('click', function () {
    // --
    var formData = new FormData();
    var camposVacios = ""

    // -- ARCHIVO ADJUNTO
    var file_GestionCorporativa = $('#file_modal_register_GestionCorporativa_1').prop("files")[0];
    var ext_GestionCorporativa = ""

    // --
    if (file_GestionCorporativa !== undefined) {
        // --
        if (functions.validateFileSize(file_GestionCorporativa)) {
            // --
        ext_GestionCorporativa = getFileExtension(file_GestionCorporativa.name)
        // --
        formData.append("dataFile", file_GestionCorporativa, "Gestion_Corporativa." + ext_GestionCorporativa);
        } else {
            camposVacios += "<span>El monto máximo es de 20MB.</span></br>"
        }
    }

    var txt_GestionCorporativa_Nombre = $('#txt_GestionCorporativa_Nombre').val()
    var txt_GestionCorporativa_Link = $('#txt_GestionCorporativa_Link').val()
    var sl_modal_register_GestionCorporativa_empresa = Number($('#sl_modal_register_GestionCorporativa_empresa').val())
    var sl_modal_register_sucursal_gestion_corporativa = Number($("#sl_modal_register_sucursal_gestion_corporativa").val())

    // -- OBJECT
    var objectData = {
        // --
        "IdGestionCorporativaRiesgo": 0,
        "IdEmpresa": sl_modal_register_GestionCorporativa_empresa,
        "IdSucursal": sl_modal_register_sucursal_gestion_corporativa,
        "IdUsuarioEnvio": 0,
        "Nombre": txt_GestionCorporativa_Nombre,
        "Link": txt_GestionCorporativa_Link,
        "ArchivoAdjunto":
        {
            "IdArchivoAdjunto": 0,
            "NombreArchivo": "Gestion_Corporativa." + ext_GestionCorporativa, // -- 
            "RutaArchivo": null,
            "ExtensionArchivo": ext_GestionCorporativa,
            "FecRegistro": null,
            "IdUsuarioRegistro": 0
        }
    }


    // --
    if (file_GestionCorporativa == undefined) {
        camposVacios += "<span>No se ha adjuntado ningun documento.</span>"
    }

    if (sl_modal_register_sucursal_gestion_corporativa == 0) {
        camposVacios += "<span>No se ha selecionado surcursal.</span>"
    }

    if (txt_GestionCorporativa_Nombre == "") {
        camposVacios += "<span>No se ha ingresado el nombre.</span></br>"
    }
    if (txt_GestionCorporativa_Link == "" || isUrl(txt_GestionCorporativa_Link) == false) {
        camposVacios += "<span>Link incorrecto.</span></br>"
    }
    if (sl_modal_register_GestionCorporativa_empresa == 0) {
        camposVacios += "<span>No se ha selecionado la empresa.</span></br>"
    }
    
    // --
    formData.append(
        "JsonMaster",
        JSON.stringify(objectData)
    );
    // --
    if (camposVacios != "") {
        // --
        Swal.fire(
            'Validacion',
            camposVacios,
            "warning"
        )
    } else {
        // --
        Swal.queue([{
            icon: 'info',
            title: '¿Desea guardar el registro?',
            html: camposVacios,
            confirmButtonText: 'Guardar',
            cancelButtonText: 'Cancelar',
            cancelButtonColor: '#d33',
            showCancelButton: true,
            showLoaderOnConfirm: true,
            preConfirm: () => {
                // --
                return $.ajax({
                    type: "POST",
                    url: urlSaveOrUpdateCorporateRiskManagement,
                    data: formData,
                    dataType: 'json',
                    cache: false,
                    contentType: false,
                    processData: false,
                    success: function (data) {

                        let obj = data.response;
                        // --
                        if (obj.status == 'OK') {
                            $('#content_loader_GestionCorporativa').css('display', 'none');
                            $("#modal_register_GestionCorporativa").modal('hide')
                            functions.notify_message(MESSAGE.es.success_insert, 'success')
                            let object = new Object()
                            object["FechaInicio"] = $('#txt_fecha_inicio_GestionCorporativa').val()
                            object["FechaFin"] = $('#txt_fecha_fin_GestionCorporativa').val()
                            object["IdEmpresa"] = sl_modal_register_GestionCorporativa_empresa
                            object["IdSucursal"] = sl_modal_register_sucursal_gestion_corporativa
                            getListGestionCorporativa(object)
                        } else {
                            $('#content_loader_GestionCorporativa').css('display', 'none');
                            functions.notify_message(MESSAGE.es.error_insert, 'error')
                        }
                    },
                    beforeSend: function (xhr) {
                        $('#content_loader_GestionCorporativa').css('display', 'block');
                    }
                });
            }
        }])
    }

})

// --
$('#modal_register_GestionCorporativa').on('shown.bs.modal', function (e) {
    // --
    $('#content_loader_GestionCorporativa').css('display', 'none')
    $("#txt_GestionCorporativa_Nombre").val('');
    $('#txt_GestionCorporativa_Link').val('');
    $('#sl_modal_register_GestionCorporativa_empresa').val('0');
    $("#sl_modal_register_GestionCorporativa_empresa").select2({
        dropdownParent: $("#modal_register_GestionCorporativa")
    });
})

// --
function getListGestionCorporativa(object) {
    // --
    $("#tbl_data_GestionCorporativa").DataTable().clear().draw()
    let url = urlGetListCorporateRiskManagement + "?FechaInicio=" + object["FechaInicio"] + "&FechaFin=" + object["FechaFin"] + "&IdServGestionCorporativaRiesgo=1" + "&IdEmpresa=" + object["IdEmpresa"] + "&IdSucursal=" + object["IdSucursal"]
    // --
    showLoader();
    // --
    setTimeout(function () {
        // --
        $.ajax({
            type: "GET",
            url: url,
            dataType: 'json',
            success: function (data) {
                let obj = data.Data
                console.log(obj)
                if (obj != null) {

                    let lista = obj

                    let AccessDelete = ListAccessUser.filter(x => x.IdPrivilegio == 34);

                    listGestionCorporativa = lista
                    lista.forEach((element) => {
                        let index = tableDataGestionCorporativa.rows().count() + 1;
                        let ButtonDownload = '';
                        let ButtonDelete = '';
                        if (element.ArchivoAdjunto != null) {
                            ButtonDownload = '<a onclick="downloadFileGestionCorporativa(' + element.IdGestionCorporativaRiesgo + ')" class= "btn btn-sm btn-primary active" data-id="' + index + '"> <i class="fa fa-download"></i></a>'
                        }

                        if (AccessDelete.length > 0 && AccessDelete[0].IdPrivilegio == 34) {
                            ButtonDelete = '<a onclick="deleteGestionCorporativa(' + element.IdGestionCorporativaRiesgo + ')" class= "btn btn-sm btn-primary active" data-id="' + index + '"> <i class="fa fa-trash"></i></a>'
                        }

                        tableDataGestionCorporativa.row.add([
                            element.IdGestionCorporativaRiesgo,
                            element.Nombre,
                            '<a href="' + element.Link + '" target="_blank">' + 'enlace' + '</a>',
                            element.UsuarioEnvio,
                            element.FechaHoraReg,
                            element.Pais,
                            element.Estado,
                            ButtonDownload +
                            ButtonDelete
                        ]).draw(false);
                        tableDataGestionCorporativa.columns.adjust()
                            .responsive.recalc();
                    })

                    functions.notify_message(MESSAGE.es.success_select, 'success')
                }
                // --
                hideLoader();
            }
        });
    // --
    }, 1000)

}

$("#btn_buscar_GestionCorporativa").on('click', function () {
    let fechaInicio = $("#txt_fecha_inicio_GestionCorporativa").val()
    let fechaFin = $("#txt_fecha_fin_GestionCorporativa").val()
    let sl_empresa_gestion_corporativa = Number($("#sl_empresa_gestion_corporativa").val())
    let sl_sucursal_gestion_corporativa = Number($("#sl_sucursal_gestion_corporativa").val())
    // --
    if (fechaFin.length < 1 || fechaInicio.length < 1 || status === null) {
        // --
        functions.notify_message(MESSAGE.es.complete_formulary, 'warning')
    } else {
        // --
        let object = new Object()
        object["FechaInicio"] = fechaInicio
        object["FechaFin"] = fechaFin
        object["IdEmpresa"] = sl_empresa_gestion_corporativa
        object["IdSucursal"] = sl_sucursal_gestion_corporativa
        // --
        getListGestionCorporativa(object)
    }
})

//#endregion


// --
function getFileExtension(filename) {
    return filename.slice((filename.lastIndexOf(".") - 1 >>> 0) + 2);
}

function downloadFileGestionCorporativa(value) {
    let Object = listGestionCorporativa.find(x => x.IdGestionCorporativaRiesgo == value);
    // --
    let url = urlGetdownloadFile + "?ruta=" + Object.ArchivoAdjunto.RutaArchivo;
    $.ajax({
        url: url,
        type: 'GET',
        dataType: 'json',
        success: function (d) {
            if (d.DataBase != "" && d.DataBase != null && d.DataBase != undefined) {
                let sampleArr = base64ToArrayBuffer(d.DataBase);
                //console.log(sampleArr);
                saveByteArray(Object.ArchivoAdjunto.NombreArchivo, sampleArr, Object.ExtensionArchivo);
            }
        }
    });
}

function deleteGestionCorporativa(value) {
    // --

    Swal.queue([{
        icon: 'info',
        title: '¿Desea eliminar el registro?',
        html: '',
        confirmButtonText: 'Eliminar',
        cancelButtonText: 'Cancelar',
        cancelButtonColor: '#d33',
        showCancelButton: true,
        showLoaderOnConfirm: true,
        preConfirm: () => {

            let url = urlUpdateStatusCorporateManagement + "?IdGestionCorporativaRiesgo=" + value + '&Flg_Estado=false'
            $.ajax({
                url: url,
                type: 'GET',
                dataType: 'json',
                success: function (d) {
                    console.log(d)
                    let obj = d.response;
                    // --
                    if (obj.status == 'OK') {
                        let object = new Object()
                        object["FechaInicio"] = $('#txt_fecha_inicio_GestionCorporativa').val()
                        object["FechaFin"] = $('#txt_fecha_fin_GestionCorporativa').val()
                        object["IdEmpresa"] = Number($("#sl_empresa_gestion_corporativa").val())
                        object["IdSucursal"] = Number($("#sl_sucursal_gestion_corporativa").val())
                        getListGestionCorporativa(object)
                    }

                }
            });

        }
    }])

}

function saveByteArray(reportName, byte, type) {
    var blob = new Blob([byte], { type: type });
    var link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    var fileName = reportName;
    link.download = fileName;
    link.click();
}

function base64ToArrayBuffer(base64) {
    var binaryString = atob(base64);
    var binaryLen = binaryString.length;
    var bytes = new Uint8Array(binaryLen);
    for (var i = 0; i < binaryLen; i++) {
        var ascii = binaryString.charCodeAt(i);
        bytes[i] = ascii;
    }
    return bytes;
}

// --
function GetAccessUser(FechaInicio, FechaFin) {
    let url = urlGetAccess;
    $.ajax({
        url: url,
        type: 'GET',
        dataType: 'json',
        success: function (d) {
            //console.log(d);
            ListAccessUser = d.RolAcceso;

            let AccessFiltroPorPais = ListAccessUser.filter(x => x.IdPrivilegio == 40);
            let AccessFiltroPorEmpresa = ListAccessUser.filter(x => x.IdPrivilegio == 41);

            if (AccessFiltroPorPais.length > 0 && AccessFiltroPorPais[0].IdPrivilegio == 40) {
                $('.FiltroPorEmpresa').removeAttr('hidden')
            } else {
                $('.FiltroPorEmpresa').attr('hidden', 'true')
            }

            if (AccessFiltroPorEmpresa.length > 0 && AccessFiltroPorEmpresa[0].IdPrivilegio == 41) {
                $('.FiltroPorSucursal').removeAttr('hidden', 'false')
            } else {
                $('.FiltroPorSucursal').attr('hidden', 'true')
            }

            // --
            let object = new Object()
            object["FechaInicio"] = FechaInicio
            object["FechaFin"] = FechaFin
            object["IdEmpresa"] = null
            object["IdSucursal"] = null
            getListGestionCorporativa(object)
        }
    });
}


function Inicio() {
    //let FechaActual = new Date().toLocaleDateString('es-ES', { year: 'numeric', month: '2-digit', day: '2-digit' }).replace(/(\d+)\/(\d+)\/(\d+)/, '$3-$1-$2')
    let FechaInicio = new Date()
    FechaInicio.setMonth(FechaInicio.getMonth() - 1)
    let FechaInicio_in_string = FechaInicio.toLocaleDateString('es-ES', { year: 'numeric', month: '2-digit', day: '2-digit' })
    let FechaFin_in_string = new Date().toLocaleDateString('es-ES', { year: 'numeric', month: '2-digit', day: '2-digit' })
    $('#txt_fecha_inicio_GestionCorporativa').val(FechaInicio_in_string)
    $('#txt_fecha_fin_GestionCorporativa').val(FechaFin_in_string)
    // --
    //$('#txt_fecha_inicio_E_H').val(FechaInicio_in_string)
    //$('#txt_fecha_fin_E_H').val(FechaFin_in_string)
    //// --
    //$('#txt_fecha_inicio_P_I_I').val(FechaInicio_in_string)
    //$('#txt_fecha_fin_P_I_I').val(FechaFin_in_string)
    //// --
    //$('#txt_fecha_inicio_Delphos').val(FechaInicio_in_string)
    //$('#txt_fecha_fin_Delphos').val(FechaFin_in_string)
    //// --
    //$('#txt_fecha_inicio_Osint').val(FechaInicio_in_string)
    //$('#txt_fecha_fin_Osint').val(FechaFin_in_string)
    // --

    GetAccessUser(FechaInicio_in_string, FechaFin_in_string)
}


// --  GESTION CORPORATIVA
// --
$('#sl_empresa_gestion_corporativa').on('change', function (e) {
    // --
    let idEmpresa = $(this).val()
    getListSucursalesGestionCoporativa(idEmpresa)
})

// --
function getListCompaniesGestionCorporativa() {
    // --
    let url = urlGetListCompanies
    $('#sl_empresa_gestion_corporativa').attr("disabled", true);
    $('#sl_sucursal_gestion_corporativa').attr("disabled", true);

    // --
    $.ajax({
        url: url,
        type: 'GET',
        dataType: 'json',
        success: function (data) {
            // --
            if (data != null) {
                // --
                let html = ''
                html += '<option value="0">[Seleccionar]</option>'
                // --
                let obj = data.Data
                // --
                if (obj != null) {
                    // --
                    if (obj.length > 0) { // -- Verificar si tiene datos
                        // --
                        $.each(obj, function (key, value) {
                            // --
                            html += '<option value="' + value.IdEmpresa + '"> ' + value.DescripcionEmpresa + '</option>'
                        });
                    }
                    //// --
                    $('#sl_empresa_gestion_corporativa').html(html);
                    $('#sl_empresa_gestion_corporativa').attr("disabled", false);
                }
            }
        }
    })
}

// --
function getListSucursalesGestionCoporativa(idEmpresa) {
    // --
    let url = urlGetListBranchOffice + '?IdEmpresa=' + idEmpresa
    // --
    let loaderHtml = '<option></option>'
    $('#sl_sucursal_gestion_corporativa').html(loaderHtml);
    $('#sl_sucursal_gestion_corporativa').attr("disabled", true);
    // --
    $.ajax({
        url: url,
        type: 'GET',
        dataType: 'json',
        success: function (data) {
            // --
            if (data != null) {
                let html = ''
                html += '<option value="0">[Seleccionar]</option>'
                // --
                let obj = data.Data
                // --
                if (obj != null) {
                    // --
                    if (obj.length > 0) { // -- Verificar si tiene datos
                        // --
                        $.each(obj, function (key, value) {
                            // --
                            html += '<option value="' + value.IdSucursal + '"> ' + value.DescripcionSucursal + '</option>'
                        });
                    }
                    // --
                    $('#sl_sucursal_gestion_corporativa').html(html);
                    $('#sl_sucursal_gestion_corporativa').attr("disabled", false);
                }

            }
        }
    })
}



//HackeoEtico
$("#sl_modal_register_GestionCorporativa_empresa").change(function () {
    let value = $("#sl_modal_register_GestionCorporativa_empresa").val()
    getSucursalesGestionCorporativa(value)
});


// --
function getSucursalesGestionCorporativa(IdEmpresa, IdSucursal = 0) {
    // --
    if (IdEmpresa != 0) {
        // --
        let url = urlGetListBranchOffice + "?IdEmpresa=" + IdEmpresa;
        // --
        $.ajax({
            url: url,
            type: 'GET',
            dataType: 'json',
            success: function (data) {
                console.log(data)

                let html = ''
                html += '<option value="0">[Seleccionar]</option>'
                // --
                let obj = data.Data
                // --
                if (obj.length > 0) { // -- Verificar si tiene datos
                    // --
                    $.each(obj, function (key, value) {
                        // --
                        if (value.IdSucursal == IdSucursal) {
                            html += '<option value="' + value.IdSucursal + '" selected="selected"> ' + value.DescripcionSucursal + '</option>'
                        } else {
                            html += '<option value="' + value.IdSucursal + '"> ' + value.DescripcionSucursal + '</option>'
                        }
                    });
                }
                // --
                $('#sl_modal_register_sucursal_gestion_corporativa').html(html);
                $('#sl_modal_register_sucursal_gestion_corporativa').attr("disabled", false);
            }
        });
    } else {
        // --
        let html = '<option value="0">[Seleccionar]</option>'
        // --
        $('#sl_modal_register_sucursal_gestion_corporativa').html(html);
        $('#sl_modal_register_sucursal_gestion_corporativa').attr("disabled", "disabled");
    }

}
// -- DISABLED
$('#sl_modal_register_sucursal_gestion_corporativa').attr('disabled', 'disabled');

Inicio(); getListCompaniesGestionCorporativa()


// --
function hideLoader() {
    $('#content_loader_main').css('display', 'none');
}

// --
function showLoader() {
    $('#content_loader_main').css('display', 'block');
}
