// -- GLOBAL
const functions = new Functions()

var ListaCompanias = new Array()
var ListaSucursales = new Array()



var indexListaSucursales = 1
// -- TABLE
var tableCompanias = $('#tbl_data').DataTable({
    responsive: true,
    language: {
        "url": "../Files/lenguaje-spanish.json"
    }
})

// -- TABLE
var tableSucursales = $('#tbl_list_sucursales').DataTable({
    responsive: true,
    language: {
        "url": "../Files/lenguaje-spanish.json"
    }
})

// -- AGREGAR DATOS A LA TABLA
$("#btn_agregar_sucursal").on('click', function () {
    let txt_descripcion_sucursal = $('#txt_descripcion_sucursal').val()
    let txt_direccion_sucursal = $('#txt_direccion_sucursal').val()
    // --
    indexListaSucursales = tableSucursales.rows().count() + 1
    // --
    let object = {
        "IdSucursal": 0,
        "IdEmpresa": 0,
        "IdPais": 0,
        "DescripcionSucursal": txt_descripcion_sucursal,
        "Direccion": txt_direccion_sucursal,
        "IdUsuarioCreacion": 0,
        "IdUsuarioAccion": 0,
        "Flg_Estado": true
    }
    // -- Agregar objeto al listado
    ListaSucursales.push(object)

    // -- Agregar datos a la tabla
    tableSucursales.row.add([
        indexListaSucursales,
        txt_descripcion_sucursal,
        txt_direccion_sucursal,
        //' <button class= "btn btn-sm btn-primary" data-id="' + indexListaSucursales + '" id="btn_edit_row_sucursal"> <i class="fa fa-edit"></i></button >' +
        ' <button class= "btn btn-sm btn-danger" data-id="' + indexListaSucursales + '" id="btn_delete_row_sucursal"> <i class="fa fa-trash"></i></button >'
    ]).draw(false);
    // --
    tableSucursales.columns.adjust()
        .responsive.recalc();
    // --
    $('#txt_descripcion_sucursal').val('')
    $('#txt_direccion_sucursal').val('')
})

// -- ELIMINAR DATOS DE LA TABLA
$(document).on('click', '#btn_delete_row_sucursal', function () {
    // --
    let value = $(this).attr('data-id')
    let index = null;
    // --
    tableSucursales.rows(function (idx, data, node) {
        if (data[0] == value) {
            index = idx;
        }
    });
    // --
    tableSucursales.row(index).remove().draw(false)

    // --
    for (let i = 0; i < ListaSucursales.length; i++) {
        if (ListaSucursales[i].IdSucursal == value) {
            ListaSucursales[i].Flg_Estado = false
        }
    }

})

function convertToString(value) {
    return value + ""
}

// --
function getListCompanies() {
    // --
    $("#tbl_data").DataTable().clear().draw()
    // --
    let url = urlGetListCompanies
    // --
    $.ajax({
        url: url,
        type: 'GET',
        dataType: 'json',
        success: function (data) {
            let lista = data.Data
            ListaCompanias = lista
            //console.log(ListaCompanias)
            
            lista.forEach((element) => {
                let Estado = 'INACTIVO'
                if (element.Flg_Estado == true) {
                    Estado = 'ACTIVO'
                }
                // --
                tableCompanias.row.add([
                    element.IdEmpresa,
                    element.DescripcionEmpresa,
                    element.Pais,
                    element.FechaRegistro,
                    element.DesTipoDocIdentidad,
                    element.NroDocumento,
                    Estado,
                    ' <button class= "btn btn-sm btn-primary" data-id="' + element.IdEmpresa + '" id="btn_edit_row"> <i class="fa fa-edit"></i></button >'
                    //' <button class= "btn btn-sm btn-danger" data-id="' + element.IdUsuario + '" id="btn_delete_row"> <i class="fa fa-trash"></i></button >'
                ]).draw(false);
                tableCompanias.columns.adjust()
                    .responsive.recalc();
            })
        }
    })
}

// --
$('#sl_pais').on('change', function (e) {
    let IdPais = $(this).val()
    $('#sectionExtraer').attr('style', 'display:none')
    //getListCompanies(IdPais)
    getListTypeDocument(IdPais)
})

// --
$('#sl_tipo_documento').on('change', function (e) {
    let idTipoDocumento = $(this).val()
    console.log('idTipoDocumento', idTipoDocumento)
    if (idTipoDocumento == '8') {
        $('#sectionExtraer').removeAttr('style')
    } else {
        $('#sectionExtraer').attr('style', 'display:none')
    }
})

// --
function getListTypeDocument(IdPais) {
    let url = urlGetDocumentType + '?IdPais=' + IdPais + '&Opcion=3' //Opcion3 es para empresas
    // --
    $.ajax({
        url: url,
        type: 'GET',
        dataType: 'json',
        success: function (data) {
            // --
            let html = ''
            html += '<option>[Seleccionar]</option>'
            // --
            let obj = data.Data
            // --
            if (obj.length > 0) { // -- Verificar si tiene datos
                // --
                $.each(obj, function (key, value) {
                    // --
                    html += '<option value="' + value.IdTipoDocIdentidad + '"> ' + value.DesTipoDocIdentidad + '</option>'
                });
            }
            // --
            $('#sl_tipo_documento').html(html);
        }
    })
}

// --
function getListCountries() {
    // --
    $.ajax({
        url: urlGetListCountries,
        type: 'GET',
        dataType: 'json',
        success: function (data) {
            // --
            let html = ''
            html += '<option value="0">[Seleccionar]</option>'
            // --
            let obj = data.Data
            //console.log(obj)
            // --
            if (obj.length > 0) { // -- Verificar si tiene datos
                // --
                $.each(obj, function (key, value) {
                    // --
                    html += '<option value="' + value.IdPais + '"> ' + value.Descripcion + '</option>'
                });
            }
            // --
            $('#sl_pais').html(html);
        }
    })
}

// -- 
function saveData() {
    // --
    let sl_pais = $("#sl_pais").val()
    let sl_tipo_documento = $("#sl_tipo_documento").val()
    let txt_num_documento = $("#txt_num_documento").val()
    let txt_descripcion_empresa = $("#txt_descripcion_empresa").val()
    let FlgEstadoEmpresa = $("#check_estado").prop('checked')
    let txt_direccion = $("#txt_direccion").val()
    // --
    
    //$('#txt_descripcion_empresa').val("")

    let IdEmpresa = $('#modal_register').attr('data-idempresa')

    // --
    let objectData = {
        "IdEmpresa": IdEmpresa,
        "IdPais": sl_pais,
        "IdTipodocumentoEmpresa": sl_tipo_documento,
        "NroDocumento": convertToString(txt_num_documento),
        "DescripcionEmpresa": convertToString(txt_descripcion_empresa),
        "Flg_Estado": FlgEstadoEmpresa,
        "Direccion": txt_direccion,
        "ListBranchOfficeFlt": ListaSucursales
    }

    var camposVacios = ''
    // --
    if (FlgEstadoEmpresa == true) {
        if (sl_pais == "0" || sl_pais == '[Seleccionar]' || sl_pais == null) {
            camposVacios += "<span>PAIS</span>"
        }
        // --
        if (sl_tipo_documento == "" || sl_tipo_documento == '[Seleccionar]' || sl_tipo_documento == null) {
            camposVacios += "<br/><span>TIPO DE DOCUMENTO</span>"
        }
        // --
        if (txt_num_documento == "") {
            camposVacios += "<br/><span>NUMERO DE DOCUMENTO DE IDENTIDAD</span>"
        }
        // --
        if (txt_descripcion_empresa == "") {
            camposVacios += "<br/><span>DESCRIPCION DE LA EMPRESA</span>"
        }
        //--
        if (txt_direccion == "") {
            camposVacios += "<br/><span>DIRECCIÓN DE LA EMPRESA</span>"
        }
        //--
        if (ListaSucursales.length == 0) {
            camposVacios += "<br/><span>NO HAY NINGUNA SUCURSAL</span>"
        }
    }

    console.log('Json', objectData)

    if (camposVacios == "") {
        console.log('campos vacios')
        $.ajax({
            type: "POST",
            url: urlSaveCompany,
            dataType: 'json',
            data: objectData,
            success: function (data) {
                console.log(data)
                var typeAlert = (data.Data.status == "OK") ? 'success' : 'error';
                var Message = (data.Data.status == "OK") ? 'Se guardo la información correctamente' : 'Ocurrio un problema, Comuniquese con sistemas';

                if (data.Data.status == "OK") {
                Swal.queue([{
                    title: 'Guardar información',
                    confirmButtonText: 'OK',
                    text: Message,
                    icon: typeAlert,
                    showLoaderOnConfirm: true,
                    preConfirm: () => {
                        $('#modal_register').modal('hide')
                        getListCompanies()
                    }
                }]);
                } else {
                    Swal.queue([{
                        title: 'Guardar información',
                        confirmButtonText: 'OK',
                        text: Message,
                        icon: typeAlert,
                        showLoaderOnConfirm: true,
                        preConfirm: () => {

            }
                    }]);
                }
            }
        });
    } else {
        Swal.queue([{
            icon: 'warning',
            title: 'Formularios incompletos...',
            html: camposVacios,
            confirmButtonText: 'Ok',
            //cancelButtonText: 'Cancelar',
            cancelButtonColor: '#d33',
            showCancelButton: false,
            showLoaderOnConfirm: true,
            preConfirm: () => {

            }
        }]);

    }


}

// --
$('#txt_num_documento').on('input', function (e) {
    let nrodocumento = $(this).val()
    if (nrodocumento.length == 11) {
        $('#btnExtraerRuc').prop('disabled', false);
        
    } else {
        $('#btnExtraerRuc').prop('disabled', true);
    }
})

// --
$('#btnExtraerRuc').on('click', function (e) {
    let nrodocumento = $('#txt_num_documento').val()
    ExtraerRUC(nrodocumento)
})

function ExtraerRUC(ndocumento) {
    let oExtraerRUC = {
        "ruc": ndocumento
    }

    try {
        $.ajax({
            type: "POST",
            url: UrlExtraerRUC,
            dataType: 'json',
            data: oExtraerRUC,
            success: function (d) {
                //console.log(d.Data)
                let data = d.Data
                $('#txt_descripcion_empresa').val(data.nombre_o_razon_social)
                $('#txt_direccion').val(data.direccion_completa)
            }
        });
    } catch (e) {
        console.log("ERROR postExtraerRUC", e);
    }
}


// -- EDITAR DATOS DE LA TABLA
$(document).on('click', '#btn_edit_row', function () {
    // --
    let value = $(this).attr('data-id')
    //let index = null;
    // --

    tableCompanias.rows(function (idx, data, node) {
        if (data[0] == value) {
            index = idx;
        }
    });

    // --
    let indexObject = ListaCompanias.findIndex(x => x.IdEmpresa == value)

    let ObjEmpresa = ListaCompanias.find(x => x.IdEmpresa == value)
    //console.log(ObjEmpresa)

    $('#modal_register').modal('show')

    $('#modal_register').attr('data-idempresa', ObjEmpresa.IdUsuario)
    $('#sl_pais').val(ObjEmpresa.IdPais)
    SetTypeDocument(ObjEmpresa.IdPais, ObjEmpresa.IdTipodocumentoEmpresa)
    SetBranchOffice(value)
    $('#txt_num_documento').val(ObjEmpresa.NroDocumento)
    $('#txt_descripcion_empresa').val(ObjEmpresa.DescripcionEmpresa)
    $('#txt_direccion').val(ObjEmpresa.Direccion)
    $("#check_estado").prop('checked', ObjEmpresa.Flg_Estado)

    $('#modal_register').attr('data-idempresa', ObjEmpresa.IdEmpresa)
})

// -- EDITAR DATOS DE LA TABLA
$(document).on('click', '#btn_edit_row_sucursal', function () {
    let value = $(this).attr('data-id')

    // --
    let indexObject = ListaSucursales.findIndex(x => x.IdSucursal == value)

    let ObjSucursal = ListaSucursales.find(x => x.IdSucursal == value)
    console.log(ObjSucursal)

    $('#modal_editar_sucursal').modal('show')

    $('#modal_editar_sucursal').attr('data-idsucursal', ObjSucursal.IdSucursal)
    $('#txt_modal_register_descripcion_sucursal').val(ObjSucursal.DescripcionSucursal)
    $('#txt_modal_register_direccion_sucursal').val(ObjSucursal.Direccion)

    //$('#modal_editar_sucursal').attr('data-idsucursal', ObjEmpresa.IdEmpresa)
})

function saveEdicionSucursal() {
    let idSucursal = $('#modal_editar_sucursal').attr('data-idsucursal')
    ListaSucursales.forEach((element) => {
        // --
        if (element.IdSucursal == idSucursal) {
            // --
            element.DescripcionSucursal = $('#txt_modal_register_descripcion_sucursal').val()
            element.Direccion = $('#txt_modal_register_direccion_sucursal').val()
            
        }

        $("#tbl_list_sucursales").DataTable().clear().draw()
        ListaSucursales.forEach((element) => {
            // --
            if (element.Flg_Estado == true) {
                // --
                let index = tableSucursales.rows().count() + 1
                // --
                tableSucursales.row.add([
                    index,
                    element.DescripcionSucursal,
                    element.Direccion,
                    ' <button class= "btn btn-sm btn-primary" data-id="' + element.IdSucursal + '" id="btn_edit_row_sucursal"> <i class="fa fa-edit"></i></button >' +
                    ' <button class= "btn btn-sm btn-danger" data-id="' + element.IdSucursal + '" id="btn_delete_row_sucursal"> <i class="fa fa-trash"></i></button >'
                ]).draw(false);
                tableSucursales.columns.adjust()
                    .responsive.recalc();
            }

        })
    });
    console.log(ListaSucursales)
    $('#modal_editar_sucursal').modal('hide')
}

function SetBranchOffice(IdEmpresa) {
    $("#tbl_list_sucursales").DataTable().clear().draw()
    //console.log(IdEmpresa)
    let url = urlGetBranchOffices + '?IdEmpresa=' + IdEmpresa
    // --
    $.ajax({
        url: url,
        type: 'GET',
        dataType: 'json',
        success: function (data) {
            // --
            let lista = data.Data
            //console.log('Get', lista)
            ListaSucursales = lista
            lista.forEach((element) => {
                // --
                if (element.Flg_Estado == true) {
                    // --
                    let index = tableSucursales.rows().count() + 1
                    // --
                    tableSucursales.row.add([
                        index,
                        element.DescripcionSucursal,
                        element.Direccion,
                        ' <button class= "btn btn-sm btn-primary" data-id="' + element.IdSucursal + '" id="btn_edit_row_sucursal"> <i class="fa fa-edit"></i></button >' +
                        ' <button class= "btn btn-sm btn-danger" data-id="' + element.IdSucursal + '" id="btn_delete_row_sucursal"> <i class="fa fa-trash"></i></button >'
                    ]).draw(false);
                    tableSucursales.columns.adjust()
                        .responsive.recalc();
                }
                
            })
            

        }
    })
}

// --
//$("#check_all").change(function () {
//    $('[name="check_status[]"]').prop('checked', $(this).prop("checked"));
//});

function SetTypeDocument(IdPais, IdTipoDocIdentidad) {
    let url = urlGetDocumentType + '?IdPais=' + IdPais + '&Opcion=3' //Opcion3 es para empresas
    // --
    $.ajax({
        url: url,
        type: 'GET',
        dataType: 'json',
        success: function (data) {
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
                    html += '<option value="' + value.IdTipoDocIdentidad + '"> ' + value.DesTipoDocIdentidad + '</option>'
                });
            }
            // --
            $('#sl_tipo_documento').html(html);
            $('#sl_tipo_documento').val(IdTipoDocIdentidad)
        }
    })
}

// -- Modal
//$('#modal_register').on('shown.bs.modal', function (e) {
//    $('#modal_register').attr('data-idempresa', 0)
//    cleanFormulary()
//})

function showModal() {
    // --
    cleanFormulary()
    $('#modal_register').modal('show')
    $('#modal_register').attr('data-idempresa', 0)
}

function cleanFormulary() {
    // --
    $("#sl_pais").val(0)
    $("#sl_tipo_documento").val(0) 
    $("#txt_num_documento").val("") 
    $('#txt_descripcion_sucursal').val("")
    $('#txt_descripcion_empresa').val("")

    // --
    $("#tbl_list_sucursales").DataTable().clear()
    $("#tbl_list_sucursales").DataTable().destroy();

    tableSucursales = $('#tbl_list_sucursales').DataTable({
        responsive: true,
        language: {
            "url": "../Files/lenguaje-spanish.json"
        }
    })

   
}

// -- Init
getListCompanies()
//getListTypeDocument()
getListCountries()
