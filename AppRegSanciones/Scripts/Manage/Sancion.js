
var codigo_infraccion_selected = null
var cip_sancionador = null
var listSancion = new Array()
var indexListSancion = 1

// --
var listSancionador = new Array()
var indexListSancionador = 1

// -- TABLE
var tableDataSancion= $('#tbl_data_sancion').DataTable({
    //responsive: true,
    //order: [[0, "desc"]]
})

// -- TABLE
var tableDataSancionador = $('#tbl_data_sancionador').DataTable({
    //responsive: true,
    //order: [[0, "desc"]]
})

$('#txt_fecha_registroInfr').datepicker({
    showOtherMonths: true,
    selectOtherMonths: true,
    dateFormat: 'dd/mm/yy'
})

function cargarTipoSancion() {
   
        $.ajax({
            type: "GET",
            url: urlGetTipoSancion,
            dataType: 'json',
            success: function (data) {
                let obj = data.response.data
                //console.log(obj)


                let html = ''
                //html += '<option value="0">[Seleccionar]</option>'
                // --
              
                // --
                if (obj.length > 0) { // -- Verificar si tiene datos
                    // --
                    $.each(obj, function (key, value) {
                        // --
                        html += '<option value="' + value.id_tipo_sancion + '"> ' + value.des_breve_sancion + '</option>'
                    });
                }
                $('#idTipoSancion').html(html);
            }
        });
    
}

function buscarInfracion() {


    $("#tbl_data_sancion").DataTable().clear().draw()

    var txtcodinfra = $('#idCodigoInfra').val()
    var txtNombreInfra = $('#idNombreInfra').val()
    var idTipoSancion = $('#idTipoSancion').val()
    
      
    // -- OBJECT
    var objectData = {
        // --
        "codigo_infraccion": txtcodinfra,
        "des_infraccion": txtNombreInfra,
        "id_tipo_sancion": idTipoSancion
    }
    console.log(objectData);

    $.ajax({
        type: "POST",
        url: urlGetSearchSanciones,
        data: objectData,
        dataType: 'json',
        cache: false,
        success: function (data) {
            let obj = data.response.data

            if (obj != null) {

                // -- CADETES
                let lista = obj
                listSancion = lista

                listSancion.forEach((element) => {

                    tableDataSancion.row.add([
                        element.codigo_infraccion,
                        element.des_infraccion,
                        element.des_breve_sancion,
                        //' <div style="text-align:center;" data-id="' + element.codigo_infraccion + '" id="btn_seleccionar_sancion_row"><i style="color: #50BDBA" class="fa fa-check"></i></div>' +
                        ' <div style="text-align:center;" class= "btn btn-sm btn-primary" data-id="' + element.codigo_infraccion + '" id="btn_seleccionar_sancion_row"> <i class="fa fa-check"></i></div>'
                    ]).draw(false);
                    tableDataSancion.columns.adjust()
                        .responsive.recalc();
                })
                   
               

            }
        }
    });
    
}

// -- EDITAR DATOS DE LA TABLA
$(document).on('click', '#btn_seleccionar_sancion_row', function () {
    // --
    let value = $(this).attr('data-id')
    console.log('value', value)
    //let index = null;
    // --
    //tableDataSancion.rows(function (idx, data, node) {
    //    if (data[0] == value) {
    //        index = idx;
    //    }
    //});
    codigo_infraccion_selected = value
    // --
    let indexObject = listSancion.findIndex(x => x.codigo_infraccion == value)

    let ObjInfraccion = listSancion.find(x => x.codigo_infraccion == value)
    console.log(ObjInfraccion)

    $('#txtInfraccion').val(ObjInfraccion.codigo_infraccion + ' - ' + ObjInfraccion.des_infraccion)
    $('#ModalSancionID').modal('hide')
})

$('#btnbuscarInfracion').on('click', function () {
    //console.log("asaaaaaa");
    buscarInfracion();
});

function buscarSancionador() {


    $("#tbl_data_sancionador").DataTable().clear().draw()

    var txt_cip_buscar_sancionador = $('#txt_cip_buscar_sancionador').val()
    var txt_nombres_buscar_sancionador = $('#txt_nombres_buscar_sancionador').val()


    // -- OBJECT
    var objectData = {
        // --
        "CIP": txt_cip_buscar_sancionador,
        "nombres_completos": txt_nombres_buscar_sancionador
    }
    //console.log(objectData);

    $.ajax({
        type: "POST",
        url: urlGetSearchSancionador,
        data: objectData,
        dataType: 'json',
        cache: false,
        success: function (data) {
            let obj = data.response.data
            //console.log(obj)
            if (obj != null) {

                let lista = obj
                listSancionador = lista

                listSancionador.forEach((element) => {

                    tableDataSancionador.row.add([
                        element.CIP,
                        element.nombre_completo,
                        element.des_grado,
                        //' <div style="text-align:center;" data-id="' + element.codigo_infraccion + '" id="btn_seleccionar_sancionador_row"><i style="color: #50BDBA" class="fa fa-check"></i></div>' +
                        ' <div class= "btn btn-sm btn-primary" data-id="' + element.CIP + '" id="btn_seleccionar_sancionador_row"> <i class="fa fa-check"></i></div>'
                    ]).draw(false);
                    tableDataSancionador.columns.adjust()
                        .responsive.recalc();
                })



            }
        }
    });

}

// -- EDITAR DATOS DE LA TABLA
$(document).on('click', '#btn_seleccionar_sancionador_row', function () {
    // --
    let value = $(this).attr('data-id')
    console.log('value', value)
    //let index = null;
    // --
    //tableDataSancionador.rows(function (idx, data, node) {
    //    if (data[0] == value) {
    //        index = idx;
    //    }
    //});
    cip_sancionador = value
    // --
    let indexObject = listSancionador.findIndex(x => x.CIP == value)

    let ObjSancionador = listSancionador.find(x => x.CIP == value)
    console.log(ObjSancionador)

    $('#txtSancionador').val(ObjSancionador.CIP + ' - ' + ObjSancionador.nombre_completo)
    $('#ModalPersonSearch').modal('hide')
})

$('#btnbuscarSancionador').on('click', function () {
    buscarSancionador();
});

cargarTipoSancion();

$('#idCodigoInfra').focus();