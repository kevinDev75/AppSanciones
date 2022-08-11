// -- GLOBAL
const functions = new Functions()

var ListaUsuarios = new Array()

// -- TABLE
var tableUsuarios = $('#tbl_data').DataTable({
    responsive: true,
    language: {
        "url": "../Files/lenguaje-spanish.json"
    },
    order: [[1, "asc"]]
})

function convertToString(value) {
    return value + ""
}

// --
function getListCompanies(IdPais) {
    let url = urlGetListCompanies + '?IdPais=' + IdPais
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
                    html += '<option value="' + value.IdEmpresa + '"> ' + value.DescripcionEmpresa + '</option>'
                });
            }
            //// --
            $('#sl_empresa').html(html);
        }
    })
}

// --
$('#sl_pais').on('change', function (e) {
    let IdPais = $(this).val()
    getListCompanies(IdPais)
    getListTypeDocument(IdPais)
})

// --
$('#sl_empresa').on('change', function (e) {
    let IdEmpresa = parseInt($(this).val())
    getSucursales(IdEmpresa)
})

// --
$('input:radio[name="radioEstado"]').on('change', function (e) {
    getListUsers()
})

// --
function getListUsers() {
    // --
    $("#tbl_data").DataTable().clear().draw()
    let radioEstado = $('input:radio[name=radioEstado]:checked').val()
    //console.log(radioEstado)
    let url = urlGetListUsers + '?IdUsuario=null&FlgEstado=' + radioEstado
    // --
    $.ajax({
        url: url,
        type: 'GET',
        dataType: 'json',
        success: function (data) {
            //console.log(data)
            let lista = data.Data
            ListaUsuarios = lista
            console.log(lista)

            lista.forEach((element) => {
                let Estado = 'INACTIVO'
                if (element.EstadoUsuario == true) {
                    Estado = 'ACTIVO'
                }
                // --
                tableUsuarios.row.add([
                    element.IdUsuario,
                    element.NombreUsuario,
                    element.Email,
                    element.Nombre + " " + element.ApellidoPaterno + " " + element.ApellidoMaterno,
                    element.DesRol,
                    element.DescripcionEmpresa,
                    element.Pais,
                    Estado,
                    ' <button class= "btn btn-sm btn-primary" data-id="' + element.IdUsuario + '" id="btn_edit_row"> <i class="fa fa-edit"></i></button >'
                    //' <button class= "btn btn-sm btn-danger" data-id="' + element.IdUsuario + '" id="btn_delete_row"> <i class="fa fa-trash"></i></button >'
                ]).draw(false);
                tableUsuarios.columns.adjust()
                    .responsive.recalc();
            })
        }
    })
}

// --
function getListTypeDocument(IdPais) {
    let url = urlGetDocumentType + '?IdPais=' + IdPais
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
function GetRoles() {
    // --
    $.ajax({
        url: urlGetRoles,
        type: 'GET',
        cache: false,
        async: true,
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
                    html += '<option value="' + value.IdRol + '"> ' + value.Description + '</option>'
                });
            }
            // --
            $('#sl_rol').html(html);
        }
    })
}

// -- 
function saveData() {
    // --
    let sl_pais = $("#sl_pais").val()
    let sl_empresa = $("#sl_empresa").val()
    let txt_nombre_usuario = $("#txt_nombre_usuario").val()
    let txt_password = $("#txt_password").val()
    let txt_apellido_paterno = $("#txt_apellido_paterno").val()
    let txt_apellido_materno = $("#txt_apellido_materno").val()
    let txt_nombres = $("#txt_nombres").val()
    let txt_email = $("#txt_email").val()
    let sl_tipo_documento = $("#sl_tipo_documento").val()
    let txt_num_documento = $("#txt_num_documento").val()
    let txt_num_telefono = $("#txt_num_telefono").val()
    let sl_rol = $("#sl_rol").val()
    let sl_modal_register_sucursal = $("#sl_modal_register_sucursal").val()
    let EstadoUsuario = $("#check_estado").prop('checked')
    // --

    let IdUsuario = $('#modal_register').attr('data-idusuario')

    // --
    let objectData = {
        "IdUsuario": IdUsuario,
        "IdPais": sl_pais,
        "IdEmpresa": sl_empresa,
        "IdSucursal": sl_modal_register_sucursal,
        "NombreUsuario": convertToString(txt_nombre_usuario),
        "PassUsuario": convertToString(txt_password),
        "EstadoUsuario": EstadoUsuario,
        "ApellidoPaterno": convertToString(txt_apellido_paterno),
        "ApellidoMaterno": convertToString(txt_apellido_materno),
        "Nombre": convertToString(txt_nombres),
        "Email": convertToString(txt_email),
        "IdTipoDocIdentidad": sl_tipo_documento,
        "NumDocIdentidad": convertToString(txt_num_documento),
        "Telefono": convertToString(txt_num_telefono),
        "UsuarioAccion": 0,
        "IdRol": sl_rol
    }
    
    var camposVacios = ''
    // --
    if (sl_pais == "0" || sl_pais == '[Seleccionar]' || sl_pais == null) {
        camposVacios += "<span>PAIS</span>"
    }
    // --
    if (sl_empresa == "0" || sl_empresa == '[Seleccionar]' || sl_empresa == null) {
        camposVacios += "<br/><span>EMPRESA</span>"
    }
    // --
    if (txt_nombre_usuario == "") {
        camposVacios += "<br/><span>NOMBRE DE USUARIO</span>"
    }
    // --
    if (txt_password == "") {
        camposVacios += "<br/><span>PASSWORD</span>"
    }
    // --
    if (txt_apellido_paterno == "") {
        camposVacios += "<br/><span>APELLIDO PATERNO</span>"
    }
    // --
    if (txt_apellido_materno == "") {
        camposVacios += "<br/><span>APELLIDO MATERNO</span>"
    }
    // --
    if (txt_nombres == "") {
        camposVacios += "<br/><span>NOMBRE</span>"
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
    if (sl_rol == "0" || sl_rol == '[Seleccionar]' || sl_rol == null) {
        camposVacios += "<br/><span>ROL</span>"
    }

    if (camposVacios == "") {
        $.ajax({
            type: "POST",
            url: urlSaveUser,
            dataType: 'json',
            data: objectData,
            success: function (data) {
                console.log(data)
                var typeAlert = (data.Data.status == "OK") ? 'success' : 'error';
                //var Message = (data.Data.status == "OK") ? 'Se guardo la información correctamente' : 'Ocurrio un problema, Comuniquese con sistemas';
                // --
                //Swal.insertQueueStep({
                //    icon: typeAlert,
                //    title: Message
                //});
                // --
                Swal.queue([{
                    title: 'Guardar información',
                    confirmButtonText: 'OK',
                    text: data.Data.msg,
                    icon: typeAlert,
                    showLoaderOnConfirm: true,
                    preConfirm: () => {
                        if (data.Data.status == "OK") {
                            $('#modal_register').modal('hide')
                            getListUsers()
                        }
                    }
                }]);
                
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


// -- EDITAR DATOS DE LA TABLA
$(document).on('click', '#btn_edit_row', function () {
    // --
    let value = $(this).attr('data-id')
    //let index = null;
    // --
    tableUsuarios.rows(function (idx, data, node) {
        if (data[0] == value) {
            index = idx;
        }
    });
    
    // --
    let indexObject = ListaUsuarios.findIndex(x => x.IdUsuario == value)

    let ObjUsuario = ListaUsuarios.find(x => x.IdUsuario == value)
    console.log(ObjUsuario)
    
    $('#modal_register').modal('show')
    
    $('#modal_register').attr('data-idusuario', ObjUsuario.IdUsuario)
    $('#sl_pais').val(ObjUsuario.IdPais)
    SetCompany(ObjUsuario.IdPais, ObjUsuario.IdEmpresa)
    getSucursales(ObjUsuario.IdEmpresa, ObjUsuario.IdSucursal)
    //$('#sl_empresa').val(ObjUsuario.IdEmpresa)
    SetTypeDocument(ObjUsuario.IdPais, ObjUsuario.IdTipoDocIdentidad)
    //$('#sl_tipo_documento').val(ObjUsuario.IdTipoDocIdentidad)
    $('#txt_nombre_usuario').val(ObjUsuario.NombreUsuario)
    $('#txt_password').val(ObjUsuario.PassUsuario)
    $('#txt_apellido_paterno').val(ObjUsuario.ApellidoPaterno)
    $('#txt_apellido_materno').val(ObjUsuario.ApellidoMaterno)
    $('#txt_nombres').val(ObjUsuario.Nombre)
    $('#txt_email').val(ObjUsuario.Email)
    $('#txt_num_documento').val(ObjUsuario.NumDocIdentidad)
    $('#txt_num_telefono').val(ObjUsuario.Telefono)
    $('#sl_rol').val(ObjUsuario.IdRol)
    $("#check_estado").prop('checked', ObjUsuario.EstadoUsuario)

    $('#modal_register').attr('data-idusuario', ObjUsuario.IdUsuario)
})

// --
//$("#check_all").change(function () {
//    $('[name="check_status[]"]').prop('checked', $(this).prop("checked"));
//});

function SetCompany(IdPais, IdEmpresa) {
    // --
    let url = urlGetListCompanies + '?IdPais=' + IdPais
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
                    html += '<option value="' + value.IdEmpresa + '"> ' + value.DescripcionEmpresa + '</option>'
                });
            }
            //// --
            $('#sl_empresa').html(html);
            $('#sl_empresa').val(IdEmpresa);

        }
    })
}

function SetTypeDocument(IdPais, IdTipoDocIdentidad) {
    let url = urlGetDocumentType + '?IdPais=' + IdPais
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
            $('#sl_tipo_documento').val(IdTipoDocIdentidad)
        }
    })
}

// -- Modal
//$('#modal_register').on('shown.bs.modal', function (e) {
//    $('#modal_register').attr('data-idusuario', 0)
//    cleanFormulary()
//})

function showModal() {
    // --
    cleanFormulary()
    $('#modal_register').modal('show')
    $('#modal_register').attr('data-idusuario', 0)
}

function cleanFormulary() {
    $('#sl_pais').val(0)
    $('#sl_empresa').val(0)
    $('#txt_nombre_usuario').val('')
    $('#txt_password').val('')
    $('#txt_apellido_paterno').val('')
    $('#txt_apellido_materno').val('')
    $('#txt_nombres').val('')
    $('#txt_email').val('')
    $('#txt_num_documento').val('')
    $('#txt_num_telefono').val('')
    $('#sl_rol').val(0)
    getSucursales(0)
}


// --
function getSucursales(IdEmpresa, IdSucursal = 0) {
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
                $('#sl_modal_register_sucursal').html(html);
                $('#sl_modal_register_sucursal').attr("disabled", false);
            }
        });
    } else {
        // --
        let html = '<option value="0">[Seleccionar]</option>'
        // --
        $('#sl_modal_register_sucursal').html(html);
        $('#sl_modal_register_sucursal').attr("disabled", "disabled");
    }

}


// -- Init
//getListCompanies()
//getListTypeDocument()
getListCountries()
getSucursales(0)
GetRoles()
getListUsers()