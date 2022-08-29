// --
const functions = new Functions()

//#region -- CADETES

// -- VARIABLES
var listCadetes = new Array()
var indexListCadetes = 1

// -- TABLE
var tableDataCadetes = $('#tbl_data_cadetes').DataTable({
    responsive: true,
    bPaginate: true,
    bFilter: true,
    //lengthMenu: [20,50,80],
    pageLength: 100,
    bInfo: true,
    language: {
        "url": "../Files/lenguaje-spanish.json"
    },
    order: [[1, "asc"]]
})

// -- TABLE
var tableDataRegistroSanciones = $('#tbl_data_registro_sanciones').DataTable({
    responsive: true,
    bPaginate: false,
    bFilter: true,
    //lengthMenu: [20,50,80],
    pageLength: 100,
    bInfo: true,
    language: {
        "url": "../Files/lenguaje-spanish.json"
    },
    order: [[0, "desc"]]
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
                            ' <button class= "btn btn-sm btn-danger" data-id="' + element.CIP + '" id="btn_ver_historial_row"> <i class="fa fa-file"></i></button>'
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
    let value = $(this).attr('data-id')
    getListRegistroInfraccion(value)
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

// --
function getListRegistroInfraccion(value_cip) {
    console.log(value_cip)
    // --
    $("#tbl_data_registro_sanciones").DataTable().clear().draw()
    let url = urlGetListRegistroInfraccion + '?cip_sancionado=' + value_cip
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
                console.log(obj)
                
                if (obj != null) {

                    // -- CADETES
                    let lista = obj
                    listCadetes = lista

                    lista.forEach((element) => {

                        tableDataRegistroSanciones.row.add([
                            element.id_reg_infraccion,
                            element.cadete_sancionador,
                            element.grado_sancionador,
                            element.cadete_sancionado,
                            element.grado_sancionado,
                            element.fecha,
                            element.puntaje_anterior,
                            element.puntaje_demerito,
                            element.puntaje_posterior,
                            element.cant_arresto_simple,
                            element.cant_arresto_rigor
                        ]).draw(false);
                        tableDataRegistroSanciones.columns.adjust()
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


getListCadetes()
