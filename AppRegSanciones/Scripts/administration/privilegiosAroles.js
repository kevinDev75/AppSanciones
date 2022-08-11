// --
const functions = new Functions()
var ListPrivilegiosAsignadosARol = null
var ListPrivilegiosSinAsignarARol = null

// -- TABLE
var tablePrivilegiosAsignados = $('#tbl_privilegios_asignados').DataTable({
    responsive: true,
    language: {
        "url": "../Files/lenguaje-spanish.json"
    },
    order: [[0, "desc"]]
})

// -- TABLE
var tablePrivilegiosSinAsignar = $('#tbl_privilegios_sin_asignar').DataTable({
    responsive: true,
    language: {
        "url": "../Files/lenguaje-spanish.json"
    },
    order: [[0, "desc"]]
})

// --
function GetPrivilegiosAsignadosARol(idRol) {
    let url = urlGetPrivilegiosAsignadosARol;

    // -- OBJECT
    var objectData = {
        // --
        "IdRol": idRol
    }

    $.ajax({
        url: url,
        type: 'POST',
        dataType: 'json',
        data: objectData,
        success: function (d) {
            //console.log(d);
            ListPrivilegiosAsignadosARol = d.RolAcceso;
            $("#tbl_privilegios_asignados").DataTable().clear().draw();

            ListPrivilegiosAsignadosARol.forEach(function (value) {
                let btnQuitarPrivilegio = '<a href = "#" class= "btn btn-primary btn-icon rounded-circle" onclick = "QuitarPrivilegioARol(' + value.IdPrivilegio + ')" > <div style="width: 25px!important;height: 25px!important;"><i class="icon ion-arrow-left-a"></i></div></a >'
                //let btnEliminar = '<button type="button" onclick="eliminarUsuario(' + value.IdPersona + ')" class="btn btn-danger"><i class="lni lni-trash me-0"></i></button >'
                tablePrivilegiosAsignados.row.add([
                    value.Descripcion,
                    btnQuitarPrivilegio //+ btnEliminar
                ]).draw(false);
                tablePrivilegiosAsignados.columns.adjust()
                    .responsive.recalc();
            });

        }
    });
}

// --
function GetPrivilegiosSinAsignarARol(idRol) {
    let url = urlGetPrivilegiosSinAsignarARol;

    // -- OBJECT
    var objectData = {
        // --
        "IdRol": idRol
    }

    $.ajax({
        url: url,
        type: 'POST',
        dataType: 'json',
        data: objectData,
        success: function (d) {
            console.log(d);
            ListPrivilegiosSinAsignarARol = d.Data;
            $("#tbl_privilegios_sin_asignar").DataTable().clear().draw();

            ListPrivilegiosSinAsignarARol.forEach(function (value) {
                let btnAgregarPrivilegio = '<a href = "#" class= "btn btn-primary btn-icon rounded-circle" onclick = "agregarPrivilegio(' + value.IdPrivilegio + ')" > <div style="width: 25px!important;height: 25px!important;"><i class="icon ion-arrow-right-a"></i></div></a >'
                //let btnEliminar = '<button type="button" onclick="eliminarUsuario(' + value.IdPersona + ')" class="btn btn-danger"><i class="lni lni-trash me-0"></i></button >'
                tablePrivilegiosSinAsignar.row.add([
                    value.Descripcion,
                    btnAgregarPrivilegio //+ btnEliminar
                ]).draw(false);
                tablePrivilegiosSinAsignar.columns.adjust()
                    .responsive.recalc();
            });

        }
    });
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

function agregarPrivilegio(idPrivilegio) {
    let idRol = parseInt($('#sl_rol').val());

    let objData = {
        "IdRol": idRol,
        "IdPrivilegio": idPrivilegio
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
                url: urlAgregarPrivilegioARol,
                type: 'POST',
                dataType: 'json',
                data: objData,
                success: function (d) {
                    console.log(d)
                    var data = d.Data
                    if (data.status == "OK") {
                        GetPrivilegiosAsignadosARol(idRol)
                        GetPrivilegiosSinAsignarARol(idRol)
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

function QuitarPrivilegioARol(idPrivilegio) {
    let idRol = parseInt($('#sl_rol').val());

    let objData = {
        "IdRol": idRol,
        "IdPrivilegio": idPrivilegio
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
                url: urlQuitarPrivilegioARol,
                type: 'POST',
                dataType: 'json',
                data: objData,
                success: function (d) {
                    console.log(d)
                    var data = d.Data
                    if (data.status == "OK") {
                        GetPrivilegiosAsignadosARol(idRol)
                        GetPrivilegiosSinAsignarARol(idRol)
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

// --
$('#sl_rol').on('change', function (e) {
    let idRol = parseInt($(this).val())
    GetPrivilegiosAsignadosARol(idRol)
    GetPrivilegiosSinAsignarARol(idRol)
})

GetRoles()