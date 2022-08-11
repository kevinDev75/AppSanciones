
// --
const functions = new Functions()
var ListAccessUser = null

//$(document).ready(function () {
//$("#sl_modal_register_BElectronico_empresa").select2({
//    dropdownParent: $("#modal_register_BElectronico")
//});
//});

// -- Datepicker
$('#txt_fecha_inicio_BElectronico').datepicker({
    showOtherMonths: true,
    selectOtherMonths: true,
    dateFormat: 'dd/mm/yy'
})
$('#txt_fecha_fin_BElectronico').datepicker({
    showOtherMonths: true,
    selectOtherMonths: true,
    dateFormat: 'dd/mm/yy'
})

// -- Datepicker
$('#txt_fecha_inicio_ESPatrimonial').datepicker({
    showOtherMonths: true,
    selectOtherMonths: true,
    dateFormat: 'dd/mm/yy'
})
$('#txt_fecha_fin_ESPatrimonial').datepicker({
    showOtherMonths: true,
    selectOtherMonths: true,
    dateFormat: 'dd/mm/yy'
})

// -- Datepicker
$('#txt_fecha_inicio_InvestCorporativas').datepicker({
    showOtherMonths: true,
    selectOtherMonths: true,
    dateFormat: 'dd/mm/yy'
})
$('#txt_fecha_fin_InvestCorporativas').datepicker({
    showOtherMonths: true,
    selectOtherMonths: true,
    dateFormat: 'dd/mm/yy'
})

// -- Datepicker
$('#txt_fecha_inicio_PersIntInformacion').datepicker({
    showOtherMonths: true,
    selectOtherMonths: true,
    dateFormat: 'dd/mm/yy'
})
$('#txt_fecha_fin_PersIntInformacion').datepicker({
    showOtherMonths: true,
    selectOtherMonths: true,
    dateFormat: 'dd/mm/yy'
})

// -- Datepicker
$('#txt_fecha_inicio_SeguridadFisica').datepicker({
    showOtherMonths: true,
    selectOtherMonths: true,
    dateFormat: 'dd/mm/yy'
})
$('#txt_fecha_fin_SeguridadFisica').datepicker({
    showOtherMonths: true,
    selectOtherMonths: true,
    dateFormat: 'dd/mm/yy'
})

//#region -- BARRIDO ELECTRONICO

// -- VARIABLES
var listBElectronico = new Array()
var indexListBElectronico = 1

// -- TABLE
var tableDataBElectronico = $('#tbl_data_BElectronico').DataTable({
    responsive: true,
    language: {
        "url": "../Files/lenguaje-spanish.json"
    },
    order: [[0, "desc"]]
})

// -- GUARDAR
$('#btn_guardar_registro_BElectronico').on('click', function () {
    // --
    var formData = new FormData();
    var camposVacios = ""

    // --
    var sl_modal_register_BElectronico_empresa = $('#sl_modal_register_BElectronico_empresa').val()
    var sl_modal_register_BElectronico_sucursal = $('#sl_modal_register_BElectronico_sucursal').val()

    // -- ARCHIVO ADJUNTO
    var file_BElectronico = $('#file_modal_register_BElectronico_1').prop("files")[0];
    var ext_BElectronico = ""

    // --
    if (file_BElectronico !== undefined) {
        // --
        if (functions.validateFileSize(file_BElectronico)) {
            // --
        ext_BElectronico = getFileExtension(file_BElectronico.name)
        // --
        formData.append("dataFile", file_BElectronico, "BElectronico." + ext_BElectronico);
        } else {
            camposVacios += "<span>El monto máximo es de 20MB.</span></br>"
        }
    }

    // -- OBJECT
    var objectData = {
        // --
        "IdBarridoElectronico": 0,
        "IdEmpresa": Number(sl_modal_register_BElectronico_empresa),
        "IdSucursal": Number(sl_modal_register_BElectronico_sucursal),
        "IdPais": 0,
        "IdUsuarioEnvio": 0,
        "ArchivoAdjunto1":
        {
            "IdArchivoAdjunto": 0,
            "NombreArchivo": "BElectronico." + ext_BElectronico, // -- 
            "RutaArchivo": null,
            "ExtensionArchivo": ext_BElectronico,
            "FecRegistro": null,
            "IdUsuarioRegistro": 0
        },
        "FlgEstado": true
    }

 
    // --
    if (sl_modal_register_BElectronico_empresa == 0) {
        camposVacios += "<span>No se ha selecionado la empresa.</span></br>"
    }
    
    if (sl_modal_register_BElectronico_sucursal == 0) {
        camposVacios += "<span>No se ha selecionado la Sucursal.</span></br>"
    }
    

    if (file_BElectronico == undefined) {
        camposVacios += "<span>No se ha adjuntado ningun documento.</span>"
    }
    
    if (ext_BElectronico != "pdf") {
        camposVacios += "<span>El archivo debe ser PDF.</span>"
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
                    url: urlSaveOrUpdateBElectronico,
                    data: formData,
                    dataType: 'json',
                    cache: false,
                    contentType: false,
                    processData: false,
                    success: function (data) {

                        let obj = data.response;
                        // --
                        if (obj.status == 'OK') {
                            $('#content_loader_BElectronico').css('display', 'none');
                            $("#modal_register_BElectronico").modal('hide')
                            let object = new Object()
                            object["FechaInicio"] = $('#txt_fecha_inicio_BElectronico').val()
                            object["FechaFin"] = $('#txt_fecha_fin_BElectronico').val()
                            object["IdEmpresa"] = $('#sl_empresa_barrido_electronico').val()
                            object["IdSucursal"] = $('#sl_sucursal_barrido_electronico').val()
                            getListBElectronico(object)
                            functions.notify_message(MESSAGE.es.success_insert, 'success')
                        } else {
                            $('#content_loader_BElectronico').css('display', 'none');
                            functions.notify_message(MESSAGE.es.error_insert, 'error')
                        }
                    },
                    beforeSend: function (xhr) {
                        $('#content_loader_BElectronico').css('display', 'block');
                    }
                });
            }
        }])
    }

})

// --
$('#modal_register_BElectronico').on('shown.bs.modal', function (e) {
    // --
    $('#content_loader_BElectronico').css('display', 'none')
    $("#file_modal_register_BElectronico_1").val(null);
    $('#sl_modal_register_BElectronico_empresa').val('0');
    $('#txt_BElectronico_comentario').val('');
    $("#sl_modal_register_BElectronico_empresa").select2({
        dropdownParent: $("#modal_register_BElectronico")
    });
})

// --
function getListBElectronico(object) {
    // --
    $("#tbl_data_BElectronico").DataTable().clear().draw()
    let url = urlGetListBElectronico + "?FechaInicio=" + object["FechaInicio"] + "&FechaFin=" + object["FechaFin"] + "&IdEmpresa=" + object["IdEmpresa"] + "&IdSucursal=" + object["IdSucursal"] 
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
                //console.log(obj)
                if (obj != null) {

                    // -- BARRIDO ELECTRONICO
                    let lista = obj
                    listBElectronico = lista

                    let AccessDelete = ListAccessUser.filter(x => x.IdPrivilegio == 28);
                
                    lista.forEach((element) => {
                        let index = tableDataBElectronico.rows().count() + 1;
                        let ButtonDownload = '';
                        let ButtonDelete = '';

                        if (element.ArchivoAdjunto1 != null) {
                            //ButtonDownload = ' <a href="' + element.ArchivoAdjunto1.RutaArchivo + '" download="' + element.ArchivoAdjunto1.RutaArchivo + '" class= "btn btn-sm btn-primary active" data-id="' + index + '"> <i class="fa fa-download"></i></a>'
                            ButtonDownload = '<a onclick="downloadFileBElectronico(' + element.IdBarridoElectronico + ')" class= "btn btn-sm btn-primary active" data-id="' + element.IdBarridoElectronico + '"> <i class="fa fa-download"></i></a>'
                        }

                        if (AccessDelete.length > 0 && AccessDelete[0].IdPrivilegio == 28) {
                            ButtonDelete = '<a onclick="deleteBElectronico(' + element.IdBarridoElectronico + ')" class= "btn btn-sm btn-primary active" data-id="' + index + '"> <i class="fa fa-trash"></i></a>'
                        }

                        tableDataBElectronico.row.add([
                            element.IdBarridoElectronico,
                            element.Servicio,
                            element.UsuarioEnvio,
                            element.FechaHoraReg,
                            element.Pais,
                            element.Estado,
                            ButtonDownload +
                            ButtonDelete
                        ]).draw(false);
                        tableDataBElectronico.columns.adjust()
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

function downloadFileBElectronico(value) {
    let Object = listBElectronico.find(x => x.IdBarridoElectronico == value);
    // --
    let url = urlGetdownloadFile + "?ruta=" + Object.ArchivoAdjunto1.RutaArchivo;
    $.ajax({
        url: url,
        type: 'GET',
        dataType: 'json',
        success: function (d) {
            if (d.DataBase != "" && d.DataBase != null && d.DataBase != undefined) {
                let sampleArr = base64ToArrayBuffer(d.DataBase);
                //console.log(sampleArr);
                saveByteArray(Object.ArchivoAdjunto1.NombreArchivo, sampleArr, Object.ExtensionArchivo);
            }
        }
    });
}

function deleteBElectronico(value) {
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

            let url = urlUpdateStatusElectronicScanning + "?IdBarridoElectronico=" + value + '&Flg_Estado=false'
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
                        object["FechaInicio"] = $('#txt_fecha_inicio_BElectronico').val()
                        object["FechaFin"] = $('#txt_fecha_fin_BElectronico').val()
                        object["IdEmpresa"] = $('#sl_empresa_barrido_electronico').val()
                        object["IdSucursal"] = $('#sl_sucursal_barrido_electronico').val()
                        getListBElectronico(object)
                    }

                }
            });

        }
    }])

}

$("#btn_buscar_BElectronico").on('click', function () {
    // --
    let fechaInicio = $("#txt_fecha_inicio_BElectronico").val()
    let fechaFin = $("#txt_fecha_fin_BElectronico").val()
    let idEmpresa = $('#sl_empresa_barrido_electronico').val()
    let IdSucursal = $('#sl_sucursal_barrido_electronico').val()
    // --
    if (fechaFin.length < 1 || fechaInicio.length < 1 || status === null) {
        // --
        functions.notify_message(MESSAGE.es.complete_formulary, 'warning')
    } else {
        // --
        let object = new Object()
        object["FechaInicio"] = fechaInicio
        object["FechaFin"] = fechaFin
        object["IdEmpresa"] = Number(idEmpresa)
        object["IdSucursal"] = Number(IdSucursal)
        // --
        getListBElectronico(object)
    }
})

//#endregion

//#region -- E.S. PATRIMONIAL

// -- VARIABLES
var listESPatrimonial = new Array()
var indexListESPatrimonial = 1

// -- TABLE
var tableDataESPatrimonial = $('#tbl_data_ESPatrimonial').DataTable({
    responsive: true,
    language: {
        "url": "../Files/lenguaje-spanish.json"
    },
    order: [[0, "desc"]]
})

// -- GUARDAR
$('#btn_guardar_registro_ESPatrimonial').on('click', function () {
    // --
    var formData = new FormData();
    var camposVacios = ""

    var sl_modal_register_ESPatrimonial_empresa = $('#sl_modal_register_ESPatrimonial_empresa').val()
    var sl_modal_register_ESPatrimonial_sucursal = $('#sl_modal_register_ESPatrimonial_sucursal').val()

    // -- ARCHIVO ADJUNTO
    var file_ESPatrimonial = $('#file_modal_register_ESPatrimonial_1').prop("files")[0];
    var ext_ESPatrimonial = ""
    // --
    if (file_ESPatrimonial !== undefined) {
        // --
        if (functions.validateFileSize(file_ESPatrimonial)) {
            // --
        ext_ESPatrimonial = getFileExtension(file_ESPatrimonial.name)
        // --
        formData.append("dataFile", file_ESPatrimonial, "ESPatrimonial." + ext_ESPatrimonial);
        } else {
            camposVacios += "<span>El monto máximo es de 20MB.</span></br>"
        }
    }

    // -- OBJECT
    var objectData = {
        // --
        "IdSeguridadPatrimonial": 0,
        "IdEmpresa": Number(sl_modal_register_ESPatrimonial_empresa),
        "IdSucursal": Number(sl_modal_register_ESPatrimonial_sucursal),
        "IdPais": 0,
        "IdUsuarioEnvio": 0,
        "ArchivoAdjunto1":
        {
            "IdArchivoAdjunto": 0,
            "NombreArchivo": "ESPatrimonial." + ext_ESPatrimonial, // -- 
            "RutaArchivo": null,
            "ExtensionArchivo": ext_ESPatrimonial,
            "FecRegistro": null,
            "IdUsuarioRegistro": 0
        },
        "FlgEstado": true
    }


    // --
    if (sl_modal_register_ESPatrimonial_empresa == 0) {
        camposVacios += "<span>No se ha selecionado la empresa.</span></br>"
    }
    if (sl_modal_register_ESPatrimonial_sucursal == 0) {
        camposVacios += "<span>No se ha selecionado la sucursal.</span></br>"
    }
    
    if (file_ESPatrimonial == undefined) {
        camposVacios += "<span>No se ha adjuntado ningun documento.</span>"
    }
    if (ext_ESPatrimonial != "pdf") {
        camposVacios += "<span>El archivo debe ser PDF.</span>"
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
                    url: urlSaveOrUpdateESPatrimonial,
                    data: formData,
                    dataType: 'json',
                    cache: false,
                    contentType: false,
                    processData: false,
                    success: function (data) {
                        // --
                        let obj = data.response;
                        // --
                        if (obj.status == 'OK') {
                            $('#content_loader_ESPatrimonial').css('display', 'none');
                            $("#modal_register_ESPatrimonial").modal('hide')
                            let object = new Object()
                            object["FechaInicio"] = $('#txt_fecha_inicio_ESPatrimonial').val()
                            object["FechaFin"] = $('#txt_fecha_fin_ESPatrimonial').val()
                            object["IdEmpresa"] = Number($('#sl_modal_register_ESPatrimonial_empresa').val())
                            object["IdSucursal"] = Number($('#sl_modal_register_ESPatrimonial_sucursal').val())
                            getListESPatrimonial(object)
                            functions.notify_message(MESSAGE.es.success_insert, 'success')
                        } else {
                            $('#content_loader_ESPatrimonial').css('display', 'none');
                            functions.notify_message(MESSAGE.es.error_insert, 'error')
                        }
                    },
                    beforeSend: function (xhr) {
                        $('#content_loader_ESPatrimonial').css('display', 'block');
                    }
                });
            }
        }])
    }

})

// --
$('#modal_register_ESPatrimonial').on('shown.bs.modal', function (e) {
    // --
    $('#content_loader_ESPatrimonial').css('display', 'none')
    $("#file_modal_register_ESPatrimonial_1").val(null);
    $('#sl_modal_register_ESPatrimonial_empresa').val('0');
    $('#txt_ESPatrimonial_comentario').val('');
    $("#sl_modal_register_ESPatrimonial_empresa").select2({
        dropdownParent: $("#modal_register_ESPatrimonial")
    });
})

// --
function getListESPatrimonial(object) {
    // --
    $("#tbl_data_ESPatrimonial").DataTable().clear().draw()
    let url = urlGetListESPatrimonial + "?FechaInicio=" + object["FechaInicio"] + "&FechaFin=" + object["FechaFin"] + "&IdEmpresa=" + object["IdEmpresa"] + "&IdSucursal=" + object["IdSucursal"]
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
                //console.log(obj)
                if (obj != null) {

                    // -- BARRIDO ELECTRONICO
                    let lista = obj
                    listESPatrimonial = lista

                    let AccessDelete = ListAccessUser.filter(x => x.IdPrivilegio == 29);

                    lista.forEach((element) => {
                        let index = tableDataESPatrimonial.rows().count() + 1;
                        let ButtonDownload = '';
                        let ButtonDelete = '';
                        if (element.ArchivoAdjunto1 != null) {
                            //ButtonDownload = ' <a href="' + element.ArchivoAdjunto1.RutaArchivo + '" download="' + element.ArchivoAdjunto1.RutaArchivo + '" class= "btn btn-sm btn-primary active" data-id="' + index + '"> <i class="fa fa-download"></i></a>'
                            ButtonDownload = '<a onclick="downloadFileESPatrimonial(' + element.IdSeguridadPatrimonial + ')" class= "btn btn-sm btn-primary active" data-id="' + element.IdSeguridadPatrimonial + '"> <i class="fa fa-download"></i></a>'
                        }

                        if (AccessDelete.length > 0 && AccessDelete[0].IdPrivilegio == 29) {
                            ButtonDelete = '<a onclick="deleteESPatrimonial(' + element.IdSeguridadPatrimonial + ')" class= "btn btn-sm btn-primary active" data-id="' + index + '"> <i class="fa fa-trash"></i></a>'
                        }

                        tableDataESPatrimonial.row.add([
                            element.IdSeguridadPatrimonial,
                            element.Servicio,
                            element.UsuarioEnvio,
                            element.FechaHoraReg,
                            element.Pais,
                            element.Estado,
                            ButtonDownload +
                            ButtonDelete
                        ]).draw(false);
                        tableDataESPatrimonial.columns.adjust()
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

function downloadFileESPatrimonial(value) {
    let Object = listESPatrimonial.find(x => x.IdSeguridadPatrimonial == value);
    // --
    let url = urlGetdownloadFile + "?ruta=" + Object.ArchivoAdjunto1.RutaArchivo;
    $.ajax({
        url: url,
        type: 'GET',
        dataType: 'json',
        success: function (d) {
            if (d.DataBase != "" && d.DataBase != null && d.DataBase != undefined) {
                let sampleArr = base64ToArrayBuffer(d.DataBase);
                //console.log(sampleArr);
                saveByteArray(Object.ArchivoAdjunto1.NombreArchivo, sampleArr, Object.ExtensionArchivo);
            }
        }
    });
}

function deleteESPatrimonial(value) {
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

            let url = urlUpdateStatusAssetSecurity + "?IdSeguridadPatrimonial=" + value + '&Flg_Estado=false'
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
                        object["FechaInicio"] = $('#txt_fecha_inicio_ESPatrimonial').val()
                        object["FechaFin"] = $('#txt_fecha_fin_ESPatrimonial').val()
                        object["IdEmpresa"] = Number($('#sl_empresa_patrimonial').val())
                        object["IdSucursal"] = Number($('#sl_sucursal_patrimonial').val())
                        getListESPatrimonial(object)
                    }

                }
            });

        }
    }])

}

$("#btn_buscar_ESPatrimonial").on('click', function () {
    // --
    let fechaInicio = $("#txt_fecha_inicio_ESPatrimonial").val()
    let fechaFin = $("#txt_fecha_fin_ESPatrimonial").val()
    let sl_empresa_patrimonial = Number($("#sl_empresa_patrimonial").val())
    let sl_sucursal_patrimonial = Number($("#sl_sucursal_patrimonial").val())
    // --
    if (fechaFin.length < 1 || fechaInicio.length < 1 || status === null) {
        // --
        functions.notify_message(MESSAGE.es.complete_formulary, 'warning')
    } else {
        // --
        let object = new Object()
        object["FechaInicio"] = fechaInicio
        object["FechaFin"] = fechaFin
        object["IdEmpresa"] = sl_empresa_patrimonial
        object["IdSucursal"] = sl_sucursal_patrimonial
        // --
        getListESPatrimonial(object)
    }
})

//#endregion

//#region -- INVESTIGACIONES CORPORATIVAS

// -- VARIABLES
var listInvestCorporativas = new Array()
var indexListInvestCorporativas = 1

// -- TABLE
var tableDataInvestCorporativas = $('#tbl_data_InvestCorporativas').DataTable({
    responsive: true,
    language: {
        "url": "../Files/lenguaje-spanish.json"
    },
    order: [[0, "desc"]]
})

// -- GUARDAR
$('#btn_guardar_registro_InvestCorporativas').on('click', function () {
    // --
    var formData = new FormData();
    var camposVacios = ""

    // --
    var sl_modal_register_InvestCorporativas_empresa = $('#sl_modal_register_InvestCorporativas_empresa').val()
    var sl_modal_register_InvestCorporativas_sucursal = $('#sl_modal_register_InvestCorporativas_sucursal').val()

    // -- ARCHIVO ADJUNTO
    var file_InvestCorporativas = $('#file_modal_register_InvestCorporativas_1').prop("files")[0];
    var ext_InvestCorporativas = ""
    // --

    // --
    if (file_InvestCorporativas !== undefined) {
        // --
        if (functions.validateFileSize(file_InvestCorporativas)) {
            // --
        ext_InvestCorporativas = getFileExtension(file_InvestCorporativas.name)
        // --
        formData.append("dataFile", file_InvestCorporativas, "InvestCorporativas." + ext_InvestCorporativas);
        } else {
            camposVacios += "<span>El monto máximo es de 20MB.</span></br>"
        }
    }

    // -- OBJECT
    var objectData = {
        // --
        "IdInvestigacionCorporativa": 0,
        "IdEmpresa": Number(sl_modal_register_InvestCorporativas_empresa),
        "IdSucursal": Number(sl_modal_register_InvestCorporativas_sucursal),
        "IdPais": 0,
        "IdUsuarioEnvio": 0,
        "ArchivoAdjunto1":
        {
            "IdArchivoAdjunto": 0,
            "NombreArchivo": "InvestCorporativas." + ext_InvestCorporativas, // -- 
            "RutaArchivo": null,
            "ExtensionArchivo": ext_InvestCorporativas,
            "FecRegistro": null,
            "IdUsuarioRegistro": 0
        },
        "FlgEstado": true
    }


    // --
    if (sl_modal_register_InvestCorporativas_empresa == 0) {
        camposVacios += "<span>No se ha selecionado la empresa.</span></br>"
    }
    if (sl_modal_register_InvestCorporativas_sucursal == 0) {
        camposVacios += "<span>No se ha selecionado la sucursal.</span></br>"
    }
    
    if (file_InvestCorporativas == undefined) {
        camposVacios += "<span>No se ha adjuntado ningun documento.</span>"
    }
    if (ext_InvestCorporativas != "pdf") {
        camposVacios += "<span>El archivo debe ser PDF.</span>"
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
                    url: urlSaveOrUpdateInvestCorporativas,
                    data: formData,
                    dataType: 'json',
                    cache: false,
                    contentType: false,
                    processData: false,
                    success: function (data) {

                        let obj = data.response;
                        // --
                        if (obj.status == 'OK') {
                            $('#content_loader_InvestCorporativas').css('display', 'none');
                            $("#modal_register_InvestCorporativas").modal('hide')
                            let object = new Object()
                            object["FechaInicio"] = $('#txt_fecha_inicio_InvestCorporativas').val()
                            object["FechaFin"] = $('#txt_fecha_fin_InvestCorporativas').val()
                            object["IdEmpresa"] = Number(sl_modal_register_InvestCorporativas_empresa)
                            object["IdSucursal"] = Number(sl_modal_register_InvestCorporativas_sucursal)
                            getListInvestCorporativas(object)
                            functions.notify_message(MESSAGE.es.success_insert, 'success')
                        } else {
                            $('#content_loader_InvestCorporativas').css('display', 'none');
                            functions.notify_message(MESSAGE.es.error_insert, 'error')
                        }
                    },
                    beforeSend: function (xhr) {
                        $('#content_loader_InvestCorporativas').css('display', 'block');
                    }
                });
            }
        }])
    }

})

// --
$('#modal_register_InvestCorporativas').on('shown.bs.modal', function (e) {
    // --
    $('#content_loader_InvestCorporativas').css('display', 'none')
    $("#file_modal_register_InvestCorporativas_1").val(null);
    $('#sl_modal_register_InvestCorporativas_empresa').val('0');
    $('#txt_InvestCorporativas_comentario').val('');
    $("#sl_modal_register_InvestCorporativas_empresa").select2({
        dropdownParent: $("#modal_register_InvestCorporativas")
    });
})

// --
function getListInvestCorporativas(object) {
    // --
    $("#tbl_data_InvestCorporativas").DataTable().clear().draw()
    let url = urlGetListInvestCorporativas + "?FechaInicio=" + object["FechaInicio"] + "&FechaFin=" + object["FechaFin"] + "&IdEmpresa=" + object["IdEmpresa"] + "&IdSucursal=" + object["IdSucursal"]
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
                //console.log(obj)
                if (obj != null) {

                    let lista = obj

                    let AccessDelete = ListAccessUser.filter(x => x.IdPrivilegio == 30);

                    listInvestCorporativas = lista
                    lista.forEach((element) => {
                        let index = tableDataInvestCorporativas.rows().count() + 1;
                        let ButtonDownload = '';
                        let ButtonDelete = '';
                        if (element.ArchivoAdjunto1 != null) {
                            //ButtonDownload = ' <a href="' + element.ArchivoAdjunto1.RutaArchivo + '" download="' + element.ArchivoAdjunto1.RutaArchivo + '" class= "btn btn-sm btn-primary active" data-id="' + index + '"> <i class="fa fa-download"></i></a>'
                            ButtonDownload = '<a onclick="downloadFileInvestCorporativas(' + element.IdInvestigacionCorporativa + ')" class= "btn btn-sm btn-primary active" data-id="' + element.IdInvestigacionCorporativa + '"> <i class="fa fa-download"></i></a>'
                        }

                        if (AccessDelete.length > 0 && AccessDelete[0].IdPrivilegio == 30) {
                            ButtonDelete = '<a onclick="deleteInvestCorporativas(' + element.IdInvestigacionCorporativa + ')" class= "btn btn-sm btn-primary active" data-id="' + index + '"> <i class="fa fa-trash"></i></a>'
                        }

                        tableDataInvestCorporativas.row.add([
                            element.IdInvestigacionCorporativa,
                            element.Servicio,
                            element.UsuarioEnvio,
                            element.FechaHoraReg,
                            element.Pais,
                            element.Estado,
                            ButtonDownload +
                            ButtonDelete
                        ]).draw(false);
                        tableDataInvestCorporativas.columns.adjust()
                            .responsive.recalc();
                    })

                    functions.notify_message(MESSAGE.es.success_select, 'success')
                }
                // --
                hideLoader();
            }
        });
        // --- 
    }, 1000)

}

function downloadFileInvestCorporativas(value) {
    let Object = listInvestCorporativas.find(x => x.IdInvestigacionCorporativa == value);
    // --
    let url = urlGetdownloadFile + "?ruta=" + Object.ArchivoAdjunto1.RutaArchivo;
    $.ajax({
        url: url,
        type: 'GET',
        dataType: 'json',
        success: function (d) {
            if (d.DataBase != "" && d.DataBase != null && d.DataBase != undefined) {
                let sampleArr = base64ToArrayBuffer(d.DataBase);
                //console.log(sampleArr);
                saveByteArray(Object.ArchivoAdjunto1.NombreArchivo, sampleArr, Object.ExtensionArchivo);
            }
        }
    });
}

function deleteInvestCorporativas(value) {
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

            let url = urlUpdateStatusCorporateInvestigations + "?IdInvestigacionCorporativa=" + value + '&Flg_Estado=false'
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
                        object["FechaInicio"] = $('#txt_fecha_inicio_InvestCorporativas').val()
                        object["FechaFin"] = $('#txt_fecha_fin_InvestCorporativas').val()
                        object["IdEmpresa"] = Number($('#sl_empresa_investigaciones_corporativas').val())
                        object["IdSucursal"] = Number($('#sl_sucursal_investigaciones_corporativas').val())
                        getListInvestCorporativas(object)
                    }

                }
            });

        }
    }])

}

$("#btn_buscar_InvestCorporativas").on('click', function () {
    let fechaInicio = $("#txt_fecha_inicio_InvestCorporativas").val()
    let fechaFin = $("#txt_fecha_fin_InvestCorporativas").val()
    let sl_empresa_investigaciones_corporativas = Number($("#sl_empresa_investigaciones_corporativas").val())
    let sl_sucursal_investigaciones_corporativas = Number($("#sl_sucursal_investigaciones_corporativas").val())
    // --
    if (fechaFin.length < 1 || fechaInicio.length < 1 || status === null) {
        // --
        functions.notify_message(MESSAGE.es.complete_formulary, 'warning')
    } else {
        // --
        let object = new Object()
        object["FechaInicio"] = fechaInicio
        object["FechaFin"] = fechaFin
        object["IdEmpresa"] = sl_empresa_investigaciones_corporativas
        object["IdSucursal"] = sl_sucursal_investigaciones_corporativas
        // --
        getListInvestCorporativas(object)
    }
})

//#endregion

//#region -- PERSONAL INTERNO

// -- VARIABLES
var listPersIntInformacion = new Array()
var indexListPersIntInformacion = 1

// -- TABLE
var tableDataPersIntInformacion = $('#tbl_data_PersIntInformacion').DataTable({
    responsive: true,
    language: {
        searchPlaceholder: 'Search...',
        sSearch: '',
        lengthMenu: '_MENU_ items/page',
    },
    order: [[0, "desc"]]
})

// -- GUARDAR
$('#btn_guardar_registro_PersIntInformacion').on('click', function () {
    // --
    var formData = new FormData();
    var camposVacios = ""

    // --
    var sl_modal_register_PersIntInformacion_empresa = $('#sl_modal_register_PersIntInformacion_empresa').val()
    var sl_modal_register_PersIntInformacion_sucursal = $('#sl_modal_register_PersIntInformacion_sucursal').val()

    var sl_modal_register_PersIntInformacion_tipo_informe = $('#sl_modal_register_PersIntInformacion_tipo_informe').val()
    var txt_PersIntInformacion_nombre = $('#txt_PersIntInformacion_nombre').val()
    
    // -- ARCHIVO ADJUNTO
    var file_PersIntInformacion = $('#file_modal_register_PersIntInformacion_1').prop("files")[0];
    var ext_PersIntInformacion = ""

    // --
    if (file_PersIntInformacion !== undefined) {
        // --
        if (functions.validateFileSize(file_PersIntInformacion)) {
            // --
        ext_PersIntInformacion = getFileExtension(file_PersIntInformacion.name)
        // --
        formData.append("dataFile", file_PersIntInformacion, "PersIntInformacion." + ext_PersIntInformacion);
        } else {
            camposVacios += "<span>El monto máximo es de 20MB.</span></br>"
        }
    }
    
    // -- OBJECT
    var objectData = {
        // --
        "IdPersInternoInfo": 0,
        "IdEmpresa": Number(sl_modal_register_PersIntInformacion_empresa),
        "IdSucursal": Number(sl_modal_register_PersIntInformacion_sucursal),
        "Nombre": txt_PersIntInformacion_nombre,
        "TipoReporte": sl_modal_register_PersIntInformacion_tipo_informe,
        "IdUsuarioEnvio": 0,
        "ArchivoAdjunto1":
        {
            "IdArchivoAdjunto": 0,
            "NombreArchivo": "PersIntInformacion." + ext_PersIntInformacion, // -- 
            "RutaArchivo": null,
            "ExtensionArchivo": ext_PersIntInformacion,
            "FecRegistro": null,
            "IdUsuarioRegistro": 0
        },
        "FlgEstado": true
    }

    // --
    if (sl_modal_register_PersIntInformacion_empresa == 0) {
        camposVacios += "<span>No se ha selecionado la empresa.</span></br>"
    }

    if (sl_modal_register_PersIntInformacion_sucursal == 0) {
        camposVacios += "<span>No se ha selecionado la sucursal.</span></br>"
    }
    
    if (sl_modal_register_PersIntInformacion_tipo_informe == '0') {
        //console.log(sl_modal_register_PersIntInformacion_tipo_informe)
        camposVacios += "<span>No se ha selecionado el Tipo de Informe.</span></br>"
    }
    if (txt_PersIntInformacion_nombre.length == 0) {
        camposVacios += "<span>No ha ingresado el nombre.</span></br>"
    }
    if (file_PersIntInformacion == undefined) {
        camposVacios += "<span>No se ha adjuntado ningun documento.</span>"
    }
    if (ext_PersIntInformacion != "pdf") {
        camposVacios += "<span>El archivo debe ser PDF.</span>"
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
                    url: urlSaveOrUpdateInternalStaff,
                    data: formData,
                    dataType: 'json',
                    cache: false,
                    contentType: false,
                    processData: false,
                    success: function (data) {

                        let obj = data.response;
                        // --
                        if (obj.status == 'OK') {
                            $('#content_loader_PersIntInformacion').css('display', 'none');
                            $("#modal_register_PersIntInformacion").modal('hide')
                            let object = new Object()
                            object["FechaInicio"] = $('#txt_fecha_inicio_PersIntInformacion').val()
                            object["FechaFin"] = $('#txt_fecha_fin_PersIntInformacion').val()
                            object["TipoReporte"] = $("#sl_PersIntInformacion_tipo_informe").val()
                            object["IdEmpresa"] = Number(sl_modal_register_PersIntInformacion_empresa)
                            object["IdSucursal"] = Number(sl_modal_register_PersIntInformacion_sucursal)
                            getListPersIntInformacion(object)
                            functions.notify_message(MESSAGE.es.success_insert, 'success')
                        } else {
                            $('#content_loader_PersIntInformacion').css('display', 'none');
                            functions.notify_message(MESSAGE.es.error_insert, 'error')
                        }
                    },
                    beforeSend: function (xhr) {
                        $('#content_loader_PersIntInformacion').css('display', 'block');
                    }
                });
            }
        }])
    }

})

// --
$('#modal_register_PersIntInformacion').on('shown.bs.modal', function (e) {
    // --
    $('#content_loader_PersIntInformacion').css('display', 'none')
    $("#file_modal_register_PersIntInformacion_1").val(null);
    $('#sl_modal_register_PersIntInformacion_empresa').val('0');
    $('#txt_PersIntInformacion_nombre').val('');
    $("#sl_modal_register_PersIntInformacion_empresa").select2({
        dropdownParent: $("#modal_register_PersIntInformacion")
    });
    $('#sl_modal_register_PersIntInformacion_tipo_informe').val('0');
})

// --
function getListPersIntInformacion(object) {
    $("#tbl_data_PersIntInformacion").DataTable().clear().draw().draw()
    // --
    let url = urlGetListInternalStaff + "?FechaInicio=" + object["FechaInicio"] + "&FechaFin=" + object["FechaFin"] + "&TipoReporte=" + object["TipoReporte"] + "&IdEmpresa=" + object["IdEmpresa"] + "&IdSucursal=" + object["IdSucursal"]
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
                //console.log(obj)
                if (obj != null) {

                    let lista = obj
                    listPersIntInformacion = lista

                    let AccessDelete = ListAccessUser.filter(x => x.IdPrivilegio == 31);

                    lista.forEach((element) => {
                        let index = tableDataPersIntInformacion.rows().count() + 1;
                        let ButtonDownload = '';
                        let ButtonDelete = '';
                        if (element.ArchivoAdjunto1 != null) {
                            //ButtonDownload = ' <a href="' + element.ArchivoAdjunto1.RutaArchivo + '" download="' + element.ArchivoAdjunto1.RutaArchivo + '" class= "btn btn-sm btn-primary active" data-id="' + index + '"> <i class="fa fa-download"></i></a>'
                            ButtonDownload = '<a onclick="downloadFilePersIntInformacion(' + element.IdPersInternoInfo + ')" class= "btn btn-sm btn-primary active" data-id="' + element.IdPersInternoInfo + '"> <i class="fa fa-download"></i></a>'
                        }

                        if (AccessDelete.length > 0 && AccessDelete[0].IdPrivilegio == 31) {
                            ButtonDelete = '<a onclick="deletePersIntInformacion(' + element.IdPersInternoInfo + ')" class= "btn btn-sm btn-primary active" data-id="' + index + '"> <i class="fa fa-trash"></i></a>'
                        }

                        tableDataPersIntInformacion.row.add([
                            element.IdPersInternoInfo,
                            element.Nombre,
                            element.TipoReporte,
                            element.UsuarioEnvio,
                            element.FechaHoraReg,
                            element.Pais,
                            element.Estado,
                            ButtonDownload +
                            ButtonDelete
                        ]).draw(false);
                        tableDataPersIntInformacion.columns.adjust()
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

function downloadFilePersIntInformacion(value) {
    let Object = listPersIntInformacion.find(x => x.IdPersInternoInfo == value);
    // --
    let url = urlGetdownloadFile + "?ruta=" + Object.ArchivoAdjunto1.RutaArchivo;
    $.ajax({
        url: url,
        type: 'GET',
        dataType: 'json',
        success: function (d) {
            if (d.DataBase != "" && d.DataBase != null && d.DataBase != undefined) {
                let sampleArr = base64ToArrayBuffer(d.DataBase);
                //console.log(sampleArr);
                saveByteArray(Object.ArchivoAdjunto1.NombreArchivo, sampleArr, Object.ExtensionArchivo);
            }
        }
    });
}

function deletePersIntInformacion(value) {
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

            let url = urlUpdateStatusInternalStaff + "?IdPersInternoInfo=" + value + '&Flg_Estado=false'
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
                        object["FechaInicio"] = $('#txt_fecha_inicio_PersIntInformacion').val()
                        object["FechaFin"] = $('#txt_fecha_fin_PersIntInformacion').val()
                        object["TipoReporte"] = $("#sl_PersIntInformacion_tipo_informe").val()
                        object["IdEmpresa"] = Number($('#sl_empresa_personal_interno').val())
                        object["IdSucursal"] = Number($("#sl_sucursal_personal_interno").val())
                        getListPersIntInformacion(object)
                    }

                }
            });

        }
    }])

}

$("#btn_buscar_PersIntInformacion").on('click', function () {
    let fechaInicio = $("#txt_fecha_inicio_PersIntInformacion").val()
    let fechaFin = $("#txt_fecha_fin_PersIntInformacion").val()
    let tipoReporte = $("#sl_PersIntInformacion_tipo_informe").val()
    let sl_empresa_personal_interno = Number($('#sl_empresa_personal_interno').val())
    let sl_sucursal_personal_interno = Number($('#sl_sucursal_personal_interno').val())
    // --
    if (fechaFin.length < 1 || fechaInicio.length < 1) {
        // --
        functions.notify_message(MESSAGE.es.complete_formulary, 'warning')
    } else {
        // --
        let object = new Object()
        object["FechaInicio"] = fechaInicio
        object["FechaFin"] = fechaFin
        object["TipoReporte"] = tipoReporte
        object["IdEmpresa"] = sl_empresa_personal_interno
        object["IdSucursal"] = sl_sucursal_personal_interno
        // --
        getListPersIntInformacion(object)
    }
})

//#endregion

//#region -- SEGURIDAD FISICA

// -- VARIABLES
var listSeguridadFisica = new Array()
var indexListSeguridadFisica = 1

// -- TABLE
var tableDataSeguridadFisica = $('#tbl_data_SeguridadFisica').DataTable({
    responsive: true,
    language: {
        searchPlaceholder: 'Search...',
        sSearch: '',
        lengthMenu: '_MENU_ items/page',
    },
    order: [[0, "desc"]]
})

// -- GUARDAR
$('#btn_guardar_registro_SeguridadFisica').on('click', function () {
    // --
    var formData = new FormData();
    var camposVacios = ""

    // --
    var sl_modal_register_SeguridadFisica_empresa = $('#sl_modal_register_SeguridadFisica_empresa').val()
    var sl_modal_register_SeguridadFisica_sucursal = $('#sl_modal_register_SeguridadFisica_sucursal').val()

    // -- ARCHIVO ADJUNTO
    var file_SeguridadFisica = $('#file_modal_register_SeguridadFisica_1').prop("files")[0];
    var ext_SeguridadFisica = ""

    // --
    if (file_SeguridadFisica !== undefined) {
        // --
        if (functions.validateFileSize(file_SeguridadFisica)) {
            // --
        ext_SeguridadFisica = getFileExtension(file_SeguridadFisica.name)
        // --
        formData.append("dataFile", file_SeguridadFisica, "SeguridadFisica." + ext_SeguridadFisica);
        } else {
            camposVacios += "<span>El monto máximo es de 20MB.</span></br>"
        }
    }

    // -- OBJECT
    var objectData = {
        // --
        "IdSeguridadFisica": 0,
        "IdEmpresa": Number(sl_modal_register_SeguridadFisica_empresa),
        "IdSucursal": Number(sl_modal_register_SeguridadFisica_sucursal),
        "IdPais": 0,
        "IdUsuarioEnvio": 0,
        "ArchivoAdjunto1":
        {
            "IdArchivoAdjunto": 0,
            "NombreArchivo": "SeguridadFisica." + ext_SeguridadFisica, // -- 
            "RutaArchivo": null,
            "ExtensionArchivo": ext_SeguridadFisica,
            "FecRegistro": null,
            "IdUsuarioRegistro": 0
        },
        "FlgEstado": true
    }


    // --
    if (sl_modal_register_SeguridadFisica_empresa == 0) {
        camposVacios += "<span>No se ha selecionado la empresa.</span></br>"
    }

    if (sl_modal_register_SeguridadFisica_sucursal == 0) {
        camposVacios += "<span>No se ha selecionado la sucursal.</span></br>"
    }

    if (file_SeguridadFisica == undefined) {
        camposVacios += "<span>No se ha adjuntado ningun documento.</span>"
    }
    if (ext_SeguridadFisica != "pdf") {
        camposVacios += "<span>El archivo debe ser PDF.</span>"
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
                    url: urlSaveOrUpdatePhysicalSecurity,
                    data: formData,
                    dataType: 'json',
                    cache: false,
                    contentType: false,
                    processData: false,
                    success: function (data) {

                        let obj = data.response;
                        // --
                        if (obj.status == 'OK') {
                            $('#content_loader_SeguridadFisica').css('display', 'none');
                            $("#modal_register_SeguridadFisica").modal('hide')
                            let object = new Object()
                            object["FechaInicio"] = $('#txt_fecha_inicio_SeguridadFisica').val()
                            object["FechaFin"] = $('#txt_fecha_fin_SeguridadFisica').val()
                            object["IdEmpresa"] = Number(sl_modal_register_SeguridadFisica_empresa)
                            object["IdSucursal"] = Number(sl_modal_register_SeguridadFisica_sucursal)
                            getListSeguridadFisica(object)
                            functions.notify_message(MESSAGE.es.success_insert, 'success')
                        } else {
                            $('#content_loader_SeguridadFisica').css('display', 'none');
                            functions.notify_message(MESSAGE.es.error_insert, 'error')
                        }
                    },
                    beforeSend: function (xhr) {
                        $('#content_loader_SeguridadFisica').css('display', 'block');
                    }
                });
            }
        }])
    }

})

// --
$('#modal_register_SeguridadFisica').on('shown.bs.modal', function (e) {
    // --
    $('#content_loader_SeguridadFisica').css('display', 'none')
    $("#file_modal_register_SeguridadFisica_1").val(null);
    $('#sl_modal_register_SeguridadFisica_empresa').val('0');
    $("#sl_modal_register_SeguridadFisica_empresa").select2({
        dropdownParent: $("#modal_register_SeguridadFisica")
    });
})

// --
function getListSeguridadFisica(object) {
    // --
    $("#tbl_data_SeguridadFisica").DataTable().clear().draw()
    let url = urlGetListPhysicalSecurity + "?FechaInicio=" + object["FechaInicio"] + "&FechaFin=" + object["FechaFin"] + "&IdEmpresa=" + object["IdEmpresa"] + "&IdSucursal=" + object["IdSucursal"]
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
                //console.log(obj)
                if (obj != null) {

                    let lista = obj

                    let AccessDelete = ListAccessUser.filter(x => x.IdPrivilegio == 32);

                    listSeguridadFisica = lista
                    lista.forEach((element) => {
                        let index = tableDataSeguridadFisica.rows().count() + 1;
                        let ButtonDownload = '';
                        let ButtonDelete = '';
                        if (element.ArchivoAdjunto1 != null) {
                            //ButtonDownload = ' <a href="' + element.ArchivoAdjunto1.RutaArchivo + '" download="' + element.ArchivoAdjunto1.RutaArchivo + '" class= "btn btn-sm btn-primary active" data-id="' + index + '"> <i class="fa fa-download"></i></a>'
                            ButtonDownload = '<a onclick="downloadFileSeguridadFisica(' + element.IdSeguridadFisica + ')" class= "btn btn-sm btn-primary active" data-id="' + element.IdSeguridadFisica + '"> <i class="fa fa-download"></i></a>'
                        }

                        if (AccessDelete.length > 0 && AccessDelete[0].IdPrivilegio == 32) {
                            ButtonDelete = '<a onclick="deleteSeguridadFisica(' + element.IdSeguridadFisica + ')" class= "btn btn-sm btn-primary active" data-id="' + index + '"> <i class="fa fa-trash"></i></a>'
                        }

                        tableDataSeguridadFisica.row.add([
                            element.IdSeguridadFisica,
                            element.Servicio,
                            element.UsuarioEnvio,
                            element.FechaHoraReg,
                            element.Pais,
                            element.Estado,
                            ButtonDownload +
                            ButtonDelete
                        ]).draw(false);
                        tableDataSeguridadFisica.columns.adjust()
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

function downloadFileSeguridadFisica(value) {
    let Object = listSeguridadFisica.find(x => x.IdSeguridadFisica == value);
    // --
    let url = urlGetdownloadFile + "?ruta=" + Object.ArchivoAdjunto1.RutaArchivo;
    $.ajax({
        url: url,
        type: 'GET',
        dataType: 'json',
        success: function (d) {
            if (d.DataBase != "" && d.DataBase != null && d.DataBase != undefined) {
                let sampleArr = base64ToArrayBuffer(d.DataBase);
                //console.log(sampleArr);
                saveByteArray(Object.ArchivoAdjunto1.NombreArchivo, sampleArr, Object.ExtensionArchivo);
            }
        }
    });
}

function deleteSeguridadFisica(value) {
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

            let url = urlUpdateStatusPhysicalSecurity + "?IdSeguridadFisica=" + value + '&Flg_Estado=false'
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
                        object["FechaInicio"] = $('#txt_fecha_inicio_SeguridadFisica').val()
                        object["FechaFin"] = $('#txt_fecha_fin_SeguridadFisica').val()
                        object["IdEmpresa"] = $("#sl_empresa_seguridad_fisica").val()
                        object["IdSucursal"] = $("#sl_sucursal_seguridad_fisica").val()
                        getListSeguridadFisica(object)
                    }

                }
            });

        }
    }])

}

$("#btn_buscar_SeguridadFisica").on('click', function () {
    let fechaInicio = $("#txt_fecha_inicio_SeguridadFisica").val()
    let fechaFin = $("#txt_fecha_fin_SeguridadFisica").val()
    let sl_empresa_seguridad_fisica = Number($("#sl_empresa_seguridad_fisica").val())
    let sl_sucursal_seguridad_fisica = Number($("#sl_sucursal_seguridad_fisica").val())
    // --
    if (fechaFin.length < 1 || fechaInicio.length < 1 || status === null) {
        // --
        functions.notify_message(MESSAGE.es.complete_formulary, 'warning')
    } else {
        // --
        let object = new Object()
        object["FechaInicio"] = fechaInicio
        object["FechaFin"] = fechaFin
        object["IdEmpresa"] = sl_empresa_seguridad_fisica
        object["IdSucursal"] = sl_sucursal_seguridad_fisica
        // --
        getListSeguridadFisica(object)
    }
})

//#endregion


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
function getFileExtension(filename) {
    return filename.slice((filename.lastIndexOf(".") - 1 >>> 0) + 2);
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
            getListBElectronico(object)
        }
    });
}



function Inicio() {
    //let FechaActual = new Date().toLocaleDateString('es-ES', { year: 'numeric', month: '2-digit', day: '2-digit' }).replace(/(\d+)\/(\d+)\/(\d+)/, '$3-$1-$2')
    let FechaInicio = new Date()
    FechaInicio.setMonth(FechaInicio.getMonth() - 1)
    let FechaInicio_in_string = FechaInicio.toLocaleDateString('es-ES', { year: 'numeric', month: '2-digit', day: '2-digit' })
    let FechaFin_in_string = new Date().toLocaleDateString('es-ES', { year: 'numeric', month: '2-digit', day: '2-digit' })
    $('#txt_fecha_inicio_BElectronico').val(FechaInicio_in_string)
    $('#txt_fecha_fin_BElectronico').val(FechaFin_in_string)
    // --
    $('#txt_fecha_inicio_ESPatrimonial').val(FechaInicio_in_string)
    $('#txt_fecha_fin_ESPatrimonial').val(FechaFin_in_string)
    // --
    $('#txt_fecha_inicio_InvestCorporativas').val(FechaInicio_in_string)
    $('#txt_fecha_fin_InvestCorporativas').val(FechaFin_in_string)
    // --
    $('#txt_fecha_inicio_PersIntInformacion').val(FechaInicio_in_string)
    $('#txt_fecha_fin_PersIntInformacion').val(FechaFin_in_string)
    // --
    $('#txt_fecha_inicio_SeguridadFisica').val(FechaInicio_in_string)
    $('#txt_fecha_fin_SeguridadFisica').val(FechaFin_in_string)
    // --

    GetAccessUser(FechaInicio_in_string, FechaFin_in_string)
}

Inicio();



//Barrido electronico
$("#sl_modal_register_BElectronico_empresa").change(function () {
    let value = $("#sl_modal_register_BElectronico_empresa").val()
    console.log('Select', value)
    getSucursalesBarridoElectronico(value)
});

// --
function getSucursalesBarridoElectronico(IdEmpresa, IdSucursal = 0) {
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
                // --urlGetListBranchOffice 
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
                $('#sl_modal_register_BElectronico_sucursal').html(html);
                $('#sl_modal_register_BElectronico_sucursal').attr("disabled", false);
            }
        });
    } else {
        // --
        let html = '<option value="0">[Seleccionar]</option>'
        // --
        $('#sl_modal_register_BElectronico_sucursal').html(html);
        $('#sl_modal_register_BElectronico_sucursal').attr("disabled", "disabled");
    }

}


//SeguridadPatrimonial
$("#sl_modal_register_ESPatrimonial_empresa").change(function () {
    let value = $("#sl_modal_register_ESPatrimonial_empresa").val()
    console.log('Select', value)
    getSucursalesSeguridadPatrimonial(value)
});

// --
function getSucursalesSeguridadPatrimonial(IdEmpresa, IdSucursal = 0) {
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
                $('#sl_modal_register_ESPatrimonial_sucursal').html(html);
                $('#sl_modal_register_ESPatrimonial_sucursal').attr("disabled", false);
            }
        });
    } else {
        // --
        let html = '<option value="0">[Seleccionar]</option>'
        // --
        $('#sl_modal_register_ESPatrimonial_sucursal').html(html);
        $('#sl_modal_register_ESPatrimonial_sucursal').attr("disabled", "disabled");
    }

}


//Investigaciones Corporativas
$("#sl_modal_register_InvestCorporativas_empresa").change(function () {
    let value = $("#sl_modal_register_InvestCorporativas_empresa").val()
    console.log('Select', value)
    getSucursalesInvestigacionesCorporativas(value)
});

// --
function getSucursalesInvestigacionesCorporativas(IdEmpresa, IdSucursal = 0) {
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
                $('#sl_modal_register_InvestCorporativas_sucursal').html(html);
                $('#sl_modal_register_InvestCorporativas_sucursal').attr("disabled", false);
            }
        });
    } else {
        // --
        let html = '<option value="0">[Seleccionar]</option>'
        // --
        $('#sl_modal_register_InvestCorporativas_sucursal').html(html);
        $('#sl_modal_register_InvestCorporativas_sucursal').attr("disabled", "disabled");
    }

}


//PersonalInterno
$("#sl_modal_register_PersIntInformacion_empresa").change(function () {
    let value = $("#sl_modal_register_PersIntInformacion_empresa").val()
    console.log('Select', value)
    getSucursalesPersonalInterno(value)
});

// --
function getSucursalesPersonalInterno(IdEmpresa, IdSucursal = 0) {
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
                $('#sl_modal_register_PersIntInformacion_sucursal').html(html);
                $('#sl_modal_register_PersIntInformacion_sucursal').attr("disabled", false);
            }
        });
    } else {
        // --
        let html = '<option value="0">[Seleccionar]</option>'
        // --
        $('#sl_modal_register_PersIntInformacion_sucursal').html(html);
        $('#sl_modal_register_PersIntInformacion_sucursal').attr("disabled", "disabled");
    }

}


//Seguridad Fisica Industrial
$("#sl_modal_register_SeguridadFisica_empresa").change(function () {
    let value = $("#sl_modal_register_SeguridadFisica_empresa").val()
    console.log('Select', value)
    getSucursalesFisicaIndustrial(value)
});

// --
function getSucursalesFisicaIndustrial(IdEmpresa, IdSucursal = 0) {
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
                $('#sl_modal_register_SeguridadFisica_sucursal').html(html);
                $('#sl_modal_register_SeguridadFisica_sucursal').attr("disabled", false);
            }
        });
    } else {
        // --
        let html = '<option value="0">[Seleccionar]</option>'
        // --
        $('#sl_modal_register_SeguridadFisica_sucursal').html(html);
        $('#sl_modal_register_SeguridadFisica_sucursal').attr("disabled", "disabled");
    }

}

//Se deshabilita el sucursal

$('#sl_modal_register_BElectronico_sucursal').attr('disabled', 'disabled');
$('#sl_modal_register_ESPatrimonial_sucursal').attr('disabled', 'disabled');
$('#sl_modal_register_InvestCorporativas_sucursal').attr('disabled', 'disabled');
$('#sl_modal_register_PersIntInformacion_sucursal').attr('disabled', 'disabled');
$('#sl_modal_register_SeguridadFisica_sucursal').attr('disabled', 'disabled');



// -- BARRIDO ELECTRONICO

// --
$('#sl_empresa_barrido_electronico').on('change', function (e) {
    // --
    let idEmpresa = $(this).val()
    getListSucursalesBarridoElectronico(idEmpresa)
})

// --
function getListCompaniesBarridoElectronico() {
    // --
    let url = urlGetListCompanies
    $('#sl_empresa_barrido_electronico').attr("disabled", true);
    $('#sl_sucursal_barrido_electronico').attr("disabled", true);

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
                if (obj.length > 0) { // -- Verificar si tiene datos
                    // --
                    $.each(obj, function (key, value) {
                        // --
                        html += '<option value="' + value.IdEmpresa + '"> ' + value.DescripcionEmpresa + '</option>'
                    });
                }
                //// --
                $('#sl_empresa_barrido_electronico').html(html);
                $('#sl_empresa_barrido_electronico').attr("disabled", false);
            }

        }
    })
}

// --
function getListSucursalesBarridoElectronico(idEmpresa) {
    // --
    let url = urlGetListBranchOffice + '?IdEmpresa=' + idEmpresa
    // --
    let loaderHtml = '<option></option>'
    $('#sl_sucursal_barrido_electronico').html(loaderHtml);
    $('#sl_sucursal_barrido_electronico').attr("disabled", true);
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
                    $('#sl_sucursal_barrido_electronico').html(html);
                    $('#sl_sucursal_barrido_electronico').attr("disabled", false);
                }
            }
        }
    })
}

// -- ESTUDIOS DE SEGURIDAD PATRIMONIAL
// --
$('#sl_empresa_patrimonial').on('change', function (e) {
    // --
    let idEmpresa = $(this).val()
    getListSucursalesPatrimonial(idEmpresa)
})

// --
function getListCompaniesPatrimonial() {
    // --
    let url = urlGetListCompanies
    $('#sl_empresa_patrimonial').attr("disabled", true);
    $('#sl_sucursal_patrimonial').attr("disabled", true);

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
                    $('#sl_empresa_patrimonial').html(html);
                    $('#sl_empresa_patrimonial').attr("disabled", false);
                }
            }
        }
    })
}

// --
function getListSucursalesPatrimonial(idEmpresa) {
    // --
    let url = urlGetListBranchOffice + '?IdEmpresa=' + idEmpresa
    // --
    let loaderHtml = '<option></option>'
    $('#sl_sucursal_patrimonial').html(loaderHtml);
    $('#sl_sucursal_patrimonial').attr("disabled", true);
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
                    $('#sl_sucursal_patrimonial').html(html);
                    $('#sl_sucursal_patrimonial').attr("disabled", false);
                }

            }
        }
    })
}



// --  INVESTIGACIONES CORPORATIVAS
// --
$('#sl_empresa_investigaciones_corporativas').on('change', function (e) {
    // --
    let idEmpresa = $(this).val()
    getListSucursalesInvestigacionesCorporativas(idEmpresa)
})

// --
function getListCompaniesInvestigacionesCorporativas() {
    // --
    let url = urlGetListCompanies
    $('#sl_empresa_investigaciones_corporativas').attr("disabled", true);
    $('#sl_sucursal_investigaciones_corporativas').attr("disabled", true);

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
                    $('#sl_empresa_investigaciones_corporativas').html(html);
                    $('#sl_empresa_investigaciones_corporativas').attr("disabled", false);
                }
            }
        }
    })
}

// --
function getListSucursalesInvestigacionesCorporativas(idEmpresa) {
    // --
    let url = urlGetListBranchOffice + '?IdEmpresa=' + idEmpresa
    // --
    let loaderHtml = '<option></option>'
    $('#sl_sucursal_investigaciones_corporativas').html(loaderHtml);
    $('#sl_sucursal_investigaciones_corporativas').attr("disabled", true);
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
                    $('#sl_sucursal_investigaciones_corporativas').html(html);
                    $('#sl_sucursal_investigaciones_corporativas').attr("disabled", false);
                }

            }
        }
    })
}



// --  PERSONAL INTERNO
// --
$('#sl_empresa_personal_interno').on('change', function (e) {
    // --
    let idEmpresa = $(this).val()
    getListSucursalesPersonalInterno(idEmpresa)
})

// --
function getListCompaniesPersonalInterno() {
    // --
    let url = urlGetListCompanies
    $('#sl_empresa_personal_interno').attr("disabled", true);
    $('#sl_sucursal_personal_interno').attr("disabled", true);

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
                    $('#sl_empresa_personal_interno').html(html);
                    $('#sl_empresa_personal_interno').attr("disabled", false);
                }
            }
        }
    })
}

// --
function getListSucursalesPersonalInterno(idEmpresa) {
    // --
    let url = urlGetListBranchOffice + '?IdEmpresa=' + idEmpresa
    // --
    let loaderHtml = '<option></option>'
    $('#sl_sucursal_personal_interno').html(loaderHtml);
    $('#sl_sucursal_personal_interno').attr("disabled", true);
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
                    $('#sl_sucursal_personal_interno').html(html);
                    $('#sl_sucursal_personal_interno').attr("disabled", false);
                }

            }
        }
    })
}

// --  SEGURIDAD FISICA
// --
$('#sl_empresa_seguridad_fisica').on('change', function (e) {
    // --
    let idEmpresa = $(this).val()
    getListSucursalesSeguridadFisica(idEmpresa)
})

// --
function getListCompaniesSeguridadFisica() {
    // --
    let url = urlGetListCompanies
    $('#sl_empresa_seguridad_fisica').attr("disabled", true);
    $('#sl_sucursal_seguridad_fisica').attr("disabled", true);

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
                    $('#sl_empresa_seguridad_fisica').html(html);
                    $('#sl_empresa_seguridad_fisica').attr("disabled", false);
                }
            }
        }
    })
}

// --
function getListSucursalesSeguridadFisica(idEmpresa) {
    // --
    let url = urlGetListBranchOffice + '?IdEmpresa=' + idEmpresa
    // --
    let loaderHtml = '<option></option>'
    $('#sl_sucursal_seguridad_fisica').html(loaderHtml);
    $('#sl_sucursal_seguridad_fisica').attr("disabled", true);
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
                    $('#sl_sucursal_seguridad_fisica').html(html);
                    $('#sl_sucursal_seguridad_fisica').attr("disabled", false);
                }

            }
        }
    })
}

// -- Init
getListCompaniesBarridoElectronico()
getListCompaniesPatrimonial()
getListCompaniesInvestigacionesCorporativas()
getListCompaniesPersonalInterno()
getListCompaniesSeguridadFisica()

// --
function hideLoader() {
    $('#content_loader_main').css('display', 'none');
}

// --
function showLoader() {
    $('#content_loader_main').css('display', 'block');
}