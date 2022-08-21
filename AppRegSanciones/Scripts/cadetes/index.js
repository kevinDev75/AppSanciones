// --
const functions = new Functions()

//#region -- CADETES

// -- VARIABLES
var listCadetes = new Array()
var indexListCadetes = 1

// -- TABLE
var tableDataCadetes = $('#tbl_data_cadetes').DataTable({
    //responsive: true,
    //order: [[0, "desc"]]
})

// --
function getListCadetes() {
    // --
    $("#tbl_data_Hackeo_Etico").DataTable().clear().draw()
    let url = urlGetListCadetes
    // --
    //showLoader();
    // --
    setTimeout(function () {
        $.ajax({
            type: "GET",
            url: url,
            dataType: 'json',
            success: function (data) {
                let obj = data.response.data
                //console.log(obj)
                
                if (obj != null) {

                    // -- CADETES
                    let lista = obj
                    listCadetes = lista

                    lista.forEach((element) => {
                        
                        tableDataCadetes.row.add([
                            element.CIP,
                            element.nombre_completo,
                            element.des_grado,
                            element.des_cargo,
                            ' <button class= "btn btn-sm btn-primary" data-id="' + element.CIP + '" id="btn_edit_row"> <i class="fa fa-edit"></i></button>' +
                            ' <button class= "btn btn-sm btn-danger" data-id="' + element.CIP + '" id="btn_ver_historial_row"> <i class="fa fa-edit"></i></button>'
                        ]).draw(false);
                        tableDataCadetes.columns.adjust()
                            .responsive.recalc();
                    })

                    functions.notify_message(MESSAGE.es.success_select, 'success')
                }
                //hideLoader();
            }
        });
        // --
    }, 1000)

}

//#endregion

$('#btnNuevoCadete').on('click', function () {
    window.location.href = RouteRegistrar + '?CIP=00000000';
})

$(document).on('click', '#btn_ver_historial_row', function () {
    // --
    $('#modal_historial_sanciones').modal('show')
})

// -- EDITAR DATOS DE LA TABLA
$(document).on('click', '#btn_edit_row', function () {
    // --
    let value = $(this).attr('data-id')
    //let index = null;
    // --
    window.location.href = RouteRegistrar + '?CIP=' + value;
})


getListCadetes()
