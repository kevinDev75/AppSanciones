// --
const functions = new Functions()
var ListAccesosAsignadosARol = null
var ListAccesosSinAsignarARol = null

// -- TABLE
var tableAccesosAsignados = $('#tbl_accesos_asignados').DataTable({
    responsive: true,
    language: {
        "url": "../Files/lenguaje-spanish.json"
    },
    //order: [[0, "desc"]]
})

// -- TABLE
var tableAccesosSinAsignar = $('#tbl_accesos_sin_asignar').DataTable({
    responsive: true,
    language: {
        "url": "../Files/lenguaje-spanish.json"
    },
    //order: [[0, "desc"]]
})

// --
function GetAccesosAsignadosARol(idRol) {
    // -- OBJECT
    var objectData = {
        // --
        "IdRol": idRol
    }

    $.ajax({
        url: urlGetAccesosAsignadosARol,
        type: 'POST',
        dataType: 'json',
        data: objectData,
        success: function (d) {
            //console.log(d);
            ListAccesosAsignadosARol = d.Data;
            $("#tbl_accesos_asignados").DataTable().clear().draw();
            
            ListAccesosAsignadosARol.forEach(function (value) {
                let btnQuitarAcceso = '<a href = "#" class= "btn btn-primary btn-icon rounded-circle" onclick = "QuitarAccesoARol(' + value.IdAcceso + ',' + value.IndSubMenu + ')" > <div style="width: 25px!important;height: 25px!important;"><i class="icon ion-arrow-left-a"></i></div></a >'
                //let btnEliminar = '<button type="button" onclick="eliminarUsuario(' + value.IdPersona + ')" class="btn btn-danger"><i class="lni lni-trash me-0"></i></button >'
                tableAccesosAsignados.row.add([
                    value.Acceso,
                    btnQuitarAcceso //+ btnEliminar
                ]).draw(false);
                tableAccesosAsignados.columns.adjust()
                    .responsive.recalc();
            });

        }
    });
}

// --
function GetAccesosSinAsignarARol(idRol) {
    // -- OBJECT
    var objectData = {
        // --
        "IdRol": idRol
    }

    $.ajax({
        url: urlGetAccesosSinAsignarARol,
        type: 'POST',
        dataType: 'json',
        data: objectData,
        success: function (d) {
            //console.log(d);
            ListAccesosSinAsignarARol = d.Data;
            $("#tbl_accesos_sin_asignar").DataTable().clear().draw();

            ListAccesosSinAsignarARol.forEach(function (value) {
                let btnAgregarAcceso = '<a href = "#" class= "btn btn-primary btn-icon rounded-circle" onclick = "agregarAcceso(' + value.IdAcceso + ',' + value.IndSubMenu + ')" > <div style="width: 25px!important;height: 25px!important;"><i class="icon ion-arrow-right-a"></i></div></a >'
                //let btnEliminar = '<button type="button" onclick="eliminarUsuario(' + value.IdPersona + ')" class="btn btn-danger"><i class="lni lni-trash me-0"></i></button >'
                tableAccesosSinAsignar.row.add([
                    value.Acceso,
                    btnAgregarAcceso //+ btnEliminar
                ]).draw(false);
                tableAccesosSinAsignar.columns.adjust()
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

function agregarAcceso(IdAcceso, IndSubMenu) {
    let idRol = parseInt($('#sl_rol').val());

    let objData = {
        "IdRol": idRol,
        "IdAcceso": IdAcceso,
        "IndSubMenu": IndSubMenu
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
                url: urlAgregarAccesoARol,
                type: 'POST',
                dataType: 'json',
                data: objData,
                success: function (d) {
                    //console.log(d)
                    var data = d.Data
                    if (data.status == "OK") {
                        GetAccesosAsignadosARol(idRol)
                        GetAccesosSinAsignarARol(idRol)
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

function QuitarAccesoARol(IdAcceso, IndSubMenu) {
    let idRol = parseInt($('#sl_rol').val());

    let objData = {
        "IdRol": idRol,
        "IdAcceso": IdAcceso,
        "IndSubMenu": IndSubMenu
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
                url: urlQuitarAccesoARol,
                type: 'POST',
                dataType: 'json',
                data: objData,
                success: function (d) {
                    console.log(d)
                    var data = d.Data
                    if (data.status == "OK") {
                        GetAccesosAsignadosARol(idRol)
                        GetAccesosSinAsignarARol(idRol)
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
    GetAccesosAsignadosARol(idRol)
    GetAccesosSinAsignarARol(idRol)
})

GetRoles()