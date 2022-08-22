// --
const functions = new Functions()

// --
var listPrivilegios = Array()
var listPapeletasPorAprobar = new Array()
var indexListPapeletasPorAprobar = 1
var id_papeleta_infraccion_seleccionado = 0

// -- TABLE
var tableDataPapeletasPorAprobar = $('#tbl_data_papeletas_por_aprobar').DataTable({
    //responsive: true,
    //order: [[0, "desc"]]
})


function cargarPrivilegios() {

    $.ajax({
        type: "GET",
        url: urlGetListPrivilegios,
        dataType: 'json',
        success: function (data) {
            let obj = data.response.data
            console.log(obj)

            listPrivilegios = obj

            buscarInfracionesPorAprobar()
        }
    });

}

function buscarInfracionesPorAprobar() {

    $("#tbl_data_papeletas_por_aprobar").DataTable().clear().draw()

    $.ajax({
        type: "POST",
        url: urlGetListPapeletaInfraccionParaAprobar,
        data: '',
        dataType: 'json',
        cache: false,
        success: function (data) {
            let obj = data.response.data
            console.log(obj)
            
            if (obj != null) {

                let lista = obj
                listPapeletasPorAprobar = lista

                listPapeletasPorAprobar.forEach((element) => {
                    let descripcion_infraccion = ''
                    if (element.des_infraccion.length > 40) {
                        descripcion_infraccion = element.des_infraccion.slice(0, 37) + '...'
                    } else {
                        descripcion_infraccion = element.des_infraccion
                    }
                    let btn_aprobar_papeleta_sancionador = ''
                    let btn_ejecutar_sancion_papeleta = ''
                    let btn_anular_papeleta = ''
                    if (element.id_estado_papeleta == 1) {
                        btn_aprobar_papeleta_sancionador = ' <div style="text-align:center;" class= "btn btn-sm btn-primary" data-id="' + element.id_papeleta_infraccion_disc + '" data-id-estado-papeleta="2" id="btn_aprobar_papeleta_row"> <i class="fa fa-check"></i></div>'
                    }
                    else if (element.id_estado_papeleta == 2) {
                        btn_ejecutar_sancion_papeleta = ' <div style="text-align:center;" class= "btn btn-sm btn-primary" data-id="' + element.id_papeleta_infraccion_disc + '" id="btn_ejecutar_sancion_papeleta_row"> <i class="fa fa-check"></i></div>'
                        btn_anular_papeleta = ' <div style="text-align:center;" class= "btn btn-sm btn-danger" data-id="' + element.id_papeleta_infraccion_disc + '" id="btn_anular_papeleta_row"> <i class="fa fa-window-close"></i></div>'
                    }
                    tableDataPapeletasPorAprobar.row.add([
                        element.codigo_papeleta_infraccion_disc,
                        element.codigo_infraccion,
                        descripcion_infraccion,
                        element.fecha_registro_sancionado,
                        element.fecha_aprobacion_sancionador,
                        element.cadete_sancionado,
                        element.nom_estado,
                        ' <div style="text-align:center;" class= "btn btn-sm btn-primary" data-id="' + element.id_papeleta_infraccion_disc + '" id="btn_ver_detalle_papeleta_row"> <i class="fa fa-eye"></i></div>' +
                        btn_aprobar_papeleta_sancionador + btn_ejecutar_sancion_papeleta + btn_anular_papeleta
                    ]).draw(false);
                    tableDataPapeletasPorAprobar.columns.adjust()
                        .responsive.recalc();
                })



            }
        }
    });

}

// -- EDITAR DATOS DE LA TABLA
$(document).on('click', '#btn_ver_detalle_papeleta_row', function () {
    // --
    let value = $(this).attr('data-id')
    //console.log('value', value)
    //let index = null;
    // --
    //tableDataSancion.rows(function (idx, data, node) {
    //    if (data[0] == value) {
    //        index = idx;
    //    }
    //});
    // --
    let indexObject = listPapeletasPorAprobar.findIndex(x => x.id_papeleta_infraccion_disc == value)

    let ObjPapeletaInfraccion = listPapeletasPorAprobar.find(x => x.id_papeleta_infraccion_disc == value)
    //console.log(ObjInfraccion)

    $('#txt_codigo_papeleta_det_papeleta').val(ObjPapeletaInfraccion.codigo_papeleta_infraccion_disc)
    $('#txt_codigo_infraccion_datos_papeleta').val(ObjPapeletaInfraccion.codigo_infraccion)
    $('#txt_des_infraccion_datos_papeleta').val(ObjPapeletaInfraccion.des_infraccion)
    $('#txt_fecha_registro_datos_papeleta').val(ObjPapeletaInfraccion.fecha_registro_sancionado)
    $('#txt_fecha_aprobacion_datos_papeleta').val(ObjPapeletaInfraccion.fecha_aprobacion_sancionador)
    $('#txt_cadete_sancionador_datos_papeleta').val(ObjPapeletaInfraccion.cadete_sancionador)
    $('#sl_estado_papeleta_datos_papeleta').val(ObjPapeletaInfraccion.id_estado_papeleta)
    $('#txt_cadete_sancionado_datos_papeleta').val(ObjPapeletaInfraccion.cadete_sancionado)
    $('#txt_nota_datos_papeleta').val(ObjPapeletaInfraccion.Nota)
    $('#ModalDatosPapeleta').modal('show')
})


// -- EDITAR DATOS DE LA TABLA
$(document).on('click', '#btn_aprobar_papeleta_row', function () {
    // --
    let id_papeleta = $(this).attr('data-id')
    let id_estado_papeleta = $(this).attr('data-id-estado-papeleta')
    let indexObject = listPapeletasPorAprobar.findIndex(x => x.id_papeleta_infraccion_disc == id_papeleta)

    let ObjPapeletaInfraccion = listPapeletasPorAprobar.find(x => x.id_papeleta_infraccion_disc == id_papeleta)
    //console.log(ObjInfraccion)

    // -- OBJECT
    var objectData = {
        // --
        "id_papeleta_infraccion_disc": id_papeleta,
        "id_estado_papeleta": id_estado_papeleta,
        "Nota": ObjPapeletaInfraccion.Nota
    }
    //console.log(objectData);

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
                url: urlUpdateEstadoPapeletaInfraccion,
                data: objectData,
                dataType: 'json',
                cache: false,
                success: function (data) {

                    let obj = data.response;
                    console.log(obj)
                    // --
                    if (obj.status == 'OK') {
                        functions.notify_message(MESSAGE.es.success_insert, 'success')
                        buscarInfracionesPorAprobar()
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


// -- EDITAR DATOS DE LA TABLA
$(document).on('click', '#btn_ejecutar_sancion_papeleta_row', function () {
    // --
    id_papeleta_infraccion_seleccionado = $(this).attr('data-id')
    let indexObject = listPapeletasPorAprobar.findIndex(x => x.id_papeleta_infraccion_disc == id_papeleta_infraccion_seleccionado)

    let ObjPapeletaInfraccion = listPapeletasPorAprobar.find(x => x.id_papeleta_infraccion_disc == id_papeleta_infraccion_seleccionado)
    //console.log(ObjInfraccion)

    if (ObjPapeletaInfraccion.id_tipo_sancion == 2) {
        // -- OBJECT
        var objectData = {
            // --
            "id_papeleta_infraccion_disc": id_papeleta_infraccion_seleccionado,
            "codigo_infraccion": ObjPapeletaInfraccion.codigo_infraccion,
            "cip_sancionador": ObjPapeletaInfraccion.cip_sancionador,
            "cip_sancionado": ObjPapeletaInfraccion.cip_sancionado,
            "id_tipo_sancion": ObjPapeletaInfraccion.id_tipo_sancion,
            "cant_arresto_simple": 1,
            "cant_arresto_rigor": 0,
            "Nota": ObjPapeletaInfraccion.Nota
        }
        //console.log(objectData);

        // --
        $.ajax({
            type: "POST",
            url: urlEjecutarSancionPapeleta,
            data: objectData,
            dataType: 'json',
            cache: false,
            success: function (data) {

                let obj = data.response;
                console.log(obj)
                // --
                if (obj.status == 'OK') {
                    functions.notify_message(MESSAGE.es.success_insert, 'success')
                    buscarInfracionesPorAprobar()
                } else {

                    functions.notify_message(MESSAGE.es.error_insert, 'error')
                }
            },
            beforeSend: function (xhr) {
                //$('#content_loader_HackeoEtico').css('display', 'block');
            }
        });
    } else {
        $('#ModalIngresarCantidadArrestoRigor').modal('show')
    }
})




cargarPrivilegios()