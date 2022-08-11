// -- GLOBAL
const functions = new Functions()

var ListaRoles = new Array()

// -- TABLE
var tableRoles = $('#tbl_roles').DataTable({
    responsive: true,
    language: {
        "url": "../Files/lenguaje-spanish.json"
    },
    order: [[1, "asc"]]
})

// --
function GetRoles() {
    let radioEstado = $('input:radio[name=radioEstado]:checked').val()
    //console.log(radioEstado)
    let url = urlGetRoles + '?FlgEstado=' + radioEstado
    $.ajax({
        url: url,
        type: 'GET',
        cache: false,
        async: true,
        dataType: 'json',
        success: function (d) {
            //console.log(d);
            ListaRoles = d.Data;
            $("#tbl_roles").DataTable().clear().draw();
            
            ListaRoles.forEach(function (value) {
                let btnEditarRol = '<a href = "#" class= "btn btn-primary btn-icon rounded-circle" onclick="editarRol(' + value.IdRol + ')" > <div style="width: 25px!important;height: 25px!important;"><i class="fa fa-edit"></i></div></a >'
                //let btnEliminar = '<button type="button" onclick="eliminarUsuario(' + value.IdPersona + ')" class="btn btn-danger"><i class="lni lni-trash me-0"></i></button >'
                tableRoles.row.add([
                    value.NomRol,
                    btnEditarRol //+ btnEliminar
                ]).draw(false);
                tableRoles.columns.adjust()
                    .responsive.recalc();
            });

        }
    });
}

// --
$('input:radio[name="radioEstado"]').on('change', function (e) {
    GetRoles()
})

function limpiarFormularioEdicionRol() {
    $('#modal_edicionRol').attr('data-idrol', 0)
    $('#txtNomRol').val('')
    $('#chkFlgEstado').prop('checked', true)
}

// --
function nuevoRol() {
    limpiarFormularioEdicionRol()
    $('#modal_edicionRol').modal('show')
}

// --
function editarRol(idRol) {
    let ObjRol = ListaRoles.find(x => x.IdRol == idRol)
    //console.log(ObjRol)
    $('#modal_edicionRol').attr('data-idrol', idRol)
    $('#txtNomRol').val(ObjRol.NomRol)
    $('#chkFlgEstado').prop('checked', ObjRol.Estado)

    $('#modal_edicionRol').modal('show')
}

// --
$('#btnGuardarEdicionRol').on('click', function (e) {
    let idRol = parseInt($('#modal_edicionRol').attr('data-idrol'))
    let nomRol = $('#txtNomRol').val()
    let flgEstadoRol = $("#chkFlgEstado").is(':checked') ? true : false


    let objData = {
        "IdRol": idRol,
        "NomRol": nomRol,
        "Estado": flgEstadoRol
    }

    Swal.queue([{
        icon: 'info',
        title: '¿Desea guardar el registro?',
        confirmButtonText: 'Si',
        cancelButtonText: 'No',
        cancelButtonColor: '#d33',
        showCancelButton: true,
        showLoaderOnConfirm: true,
        preConfirm: () => {

            $.ajax({
                url: urlSaveRol,
                type: 'POST',
                dataType: 'json',
                data: objData,
                success: function (d) {
                    //console.log(d)
                    var data = d.Data
                    if (data.status == "OK") {
                        $('#modal_edicionRol').modal('hide')
                        limpiarFormularioEdicionRol()
                        GetRoles()
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
})

GetRoles();
