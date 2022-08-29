
// --
const functions = new Functions()
var ListRolesAsignadosAUsuario = null
var ListRolesSinAsignarAUsuario = null
var id_usuario = 0

// -- TABLE
var tableRolesAsignados = $('#tbl_roles_asignados').DataTable({
    responsive: true,
    bPaginate: true,
    bFilter: true,
    //lengthMenu: [20,50,80],
    pageLength:50,
    bInfo: true,
    language: {
        "url": "../Files/lenguaje-spanish.json"
    },
    order: [[0, "desc"]]
})

// -- TABLE
var tableRolesSinAsignar = $('#tbl_roles_sin_asignar').DataTable({
    responsive: true,
    bPaginate: true,
    bFilter: true,
    //lengthMenu: [20,50,80],
    pageLength: 25,
    bInfo: true,
    language: {
        "url": "../Files/lenguaje-spanish.json"
    },
    //order: [[0, "desc"]]
})
 
// --
function GetRolesAsignadosAUsuario() {

    let objData = {
        "id_usuario": id_usuario
    }

    $.ajax({
        url: urlGetListRolesAsignadosAUsuario,
        type: 'POST',
        dataType: 'json',
        data: objData,
        success: function (d) {
            //console.log(d);
            $("#tbl_roles_asignados").DataTable().clear().draw();
            if (d.response.status = 'OK' && d.response.data.length >0) {
                ListRolesAsignadosAUsuario = d.response.data;
                //console.log(ListRolesAsignadosAUsuario)
                

                ListRolesAsignadosAUsuario.forEach(function (value) {
                    //let btnQuitarRol = '<a href = "#" class= "btn btn-primary btn-icon rounded-circle" onclick = "QuitarRol(' + value.id_rol + ',' + value.nom_rol + ')" > <div style="width: 25px!important;height: 25px!important;"><i class="icon ion-arrow-left-a"></i></div></a >'
                    let btnQuitarRol = ' <div style="text-align:center;" class= "btn btn-sm btn-danger" onclick=" QuitarRol(' + value.id_rol + ')" > <i class="icon ion-arrow-left-a"></i></div>'
                    tableRolesAsignados.row.add([
                        value.nom_rol,
                        btnQuitarRol //+ btnEliminar
                    ]).draw(false);
                    tableRolesAsignados.columns.adjust()
                        .responsive.recalc();
                });
            }
        }
    });
}

// --
function GetRolesSinAsignarAUsuario() {

    let objData = {
        "id_usuario": id_usuario
    }

    $.ajax({
        url: urlGetListRolesSinAsignarAUsuario,
        type: 'POST',
        dataType: 'json',
        data: objData,
        success: function (d) {
            //console.log(d);
            ListRolesSinAsignarAUsuario = d.response.data;
            //console.log(ListRolesSinAsignarAUsuario)
            $("#tbl_roles_sin_asignar").DataTable().clear().draw();

            ListRolesSinAsignarAUsuario.forEach(function (value) {
                //let btnAgregarRol = '<a href = "#" class= "btn btn-primary btn-icon rounded-circle" onclick = "agregarRol(' + value.id_rol + ',' + value.nom_rol + ')" > <div style="width: 25px!important;height: 25px!important;"><i class="icon ion-arrow-right-a"></i></div></a >'
                let btnAgregarRol = ' <div style="text-align:center;" class= "btn btn-sm btn-danger" onclick=" agregarRol(' + value.id_rol + ')" > <i class="icon ion-arrow-right-a"></i></div>'
                tableRolesSinAsignar.row.add([
                    value.nom_rol,
                    btnAgregarRol //+ btnEliminar
                ]).draw(false);
                tableRolesSinAsignar.columns.adjust()
                    .responsive.recalc();
            });

        }
    });
}

function agregarRol(id_rol) {

    let objData = {
        "id_rol": id_rol,
        "id_usuario": id_usuario
    }
    if (id_usuario == 0) {
        return;
    }

    Swal.queue([{
        icon: 'info',
        title: '¿Desea agregar el registro?',
        confirmButtonText: 'Si',
        cancelButtonText: 'No',
        cancelButtonColor: '#d33',
        showCancelButton: true,
        showLoaderOnConfirm: true,
        preConfirm: () => {

            $.ajax({
                url: urlSaveRolUsuario,
                type: 'POST',
                dataType: 'json',
                data: objData,
                success: function (d) {
                    //console.log(d)
                    var data = d.response
                    if (data.status == "OK") {
                        GetRolesAsignadosAUsuario()
                        GetRolesSinAsignarAUsuario()
                    } else {
                        Swal.queue([{
                            title: 'Error',
                            confirmButtonText: 'OK',
                            text: data.msg,
                            icon: 'warning',
                            showLoaderOnConfirm: true,
                            preConfirm: () => {

                            }
                        }]);
                    }
                }
            });
        }
    }])
}

function QuitarRol(id_rol) {

    let objData = {
        "id_rol": id_rol,
        "id_usuario": id_usuario
    }

    Swal.queue([{
        icon: 'info',
        title: '¿Desea eliminar el registro?',
        confirmButtonText: 'Si',
        cancelButtonText: 'No',
        cancelButtonColor: '#d33',
        showCancelButton: true,
        showLoaderOnConfirm: true,
        preConfirm: () => {

            $.ajax({
                url: urlDeleteRolUsuario,
                type: 'POST',
                dataType: 'json',
                data: objData,
                success: function (d) {
                    //console.log(d)
                    var data = d.response
                    if (data.status == "OK") {
                        GetRolesAsignadosAUsuario()
                        GetRolesSinAsignarAUsuario()
                    } else {
                        Swal.queue([{
                            title: 'Error',
                            confirmButtonText: 'OK',
                            text: data.msg,
                            icon: 'warning',
                            showLoaderOnConfirm: true,
                            preConfirm: () => {

                            }
                        }]);
                    }
                }
            });
        }
    }])
}


// -- GUARDAR
$('#btnGuardar').on('click', function () {
    var txt_cip = $('#txt_cip').val()
    var txt_ape_paterno = $('#txt_ape_paterno').val()
    var txt_ape_materno = $('#txt_ape_materno').val()
    var txt_nombres = $('#txt_nombres').val()
    var sl_id_grado = $('#sl_id_grado').val()
    var sl_id_cargo = $('#sl_id_cargo').val()

    // -- OBJECT
    var objectData = {
        // --
        "CIP": txt_cip,
        "ape_paterno": txt_ape_paterno,
        "ape_materno": txt_ape_materno,
        "nombres": txt_nombres,
        "id_grado": sl_id_grado,
        "id_cargo": sl_id_cargo,
        "puntaje_actual": 200
    }

    // --
    Swal.queue([{
        icon: 'info',
        title: '¿Desea guardar el registro?',
        html: '',
        confirmButtonText: 'Guardar',
        cancelButtonText: 'Cancelar',
        cancelButtonColor: '#d33',
        showCancelButton: true,
        showLoaderOnConfirm: true,
        preConfirm: () => {
            // --
            $.ajax({
                type: "POST",
                url: urlSaveCadete,
                data: objectData,
                dataType: 'json',
                cache: false,
                success: function (data) {

                    let obj = data.response;
                    //console.log(obj)
                    // --
                    if (obj.status == 'OK') {
                        functions.notify_message(MESSAGE.es.success_insert, 'success')
                        //window.location.href = RouteCancelar;
                        $('#txt_cip').attr('disabled','disabled')
                        CargarDatosCadete()
                    } else {
                        
                        functions.notify_message(MESSAGE.es.error_insert, 'error')
                    }
                },
                beforeSend: function (xhr) {
                    //$('#content_loader_HackeoEtico').css('display', 'block');
                }
            });
        }
    }])

})


function getListGrado() {
    // --
    $.ajax({
        url: urlGetListGrado,
        type: 'GET',
        dataType: 'json',
        success: function (data) {
            //console.log(data)

            let html = ''
            //html += '<option value="0">[Seleccionar]</option>'
            // --
            let obj = data.response.data
            // --
            if (obj.length > 0) { // -- Verificar si tiene datos
                // --
                $.each(obj, function (key, value) {
                    // --
                    html += '<option value="' + value.id_grado + '"> ' + value.des_grado + '</option>'
                });
            }
            $('#sl_id_grado').html(html);
        }
    });
}

function getListCargo() {
    // --
    $.ajax({
        url: urlGetListCargo,
        type: 'GET',
        dataType: 'json',
        success: function (data) {
            //console.log(data)

            let html = ''
            //html += '<option value="0">[Seleccionar]</option>'
            // --
            let obj = data.response.data
            // --
            if (obj.length > 0) { // -- Verificar si tiene datos
                // --
                $.each(obj, function (key, value) {
                    // --
                    html += '<option value="' + value.id_cargo + '"> ' + value.des_cargo + '</option>'
                });
            }
            $('#sl_id_cargo').html(html);
            CargarDatosCadete()
        }
    });
}

$('#btnCancelar').on('click', function () {
    window.location.href = RouteCancelar;
})

function CargarDatosCadete() {
    var txt_cip = $('#txt_cip').val()
    if (txt_cip.length > 0) {
        $.ajax({
            type: "GET",
            url: urlGetDatosCadete + '?cip=' + txt_cip,
            dataType: 'json',
            success: function (data) {
                let obj = data.response.data
                //console.log(obj)

                if (obj != null) {
                    $('#txt_ape_paterno').val(obj.ape_paterno)
                    $('#txt_ape_materno').val(obj.ape_materno)
                    $('#txt_nombres').val(obj.nombres)
                    $('#sl_id_grado').val(obj.id_grado)
                    $('#sl_id_cargo').val(obj.id_cargo)
                    id_usuario = obj.id_usuario

                    if (id_usuario > 0) {
                        //console.log('mostrar roles')
                        GetRolesAsignadosAUsuario()
                        GetRolesSinAsignarAUsuario()
                        $('#zona_tbl_roles_asignados').removeAttr('hidden')
                        $('#zona_tbl_roles_sin_asignar').removeAttr('hidden')
                    } else {
                        $('#zona_tbl_roles_asignados').attr('hidden', 'hidden')
                        $('#zona_tbl_roles_sin_asignar').attr('hidden', 'hidden')
                    }
                }
            }
        });
    }

    if (id_usuario > 0) {
        //console.log('mostrar roles')
        GetRolesAsignadosAUsuario()
        GetRolesSinAsignarAUsuario()
        $('#zona_tbl_roles_asignados').removeAttr('hidden')
        $('#zona_tbl_roles_sin_asignar').removeAttr('hidden')
    } else {
        $('#zona_tbl_roles_asignados').attr('hidden', 'hidden')
        $('#zona_tbl_roles_sin_asignar').attr('hidden', 'hidden')
    }
}

getListGrado()
getListCargo()