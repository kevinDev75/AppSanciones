
var codigo_infraccion_selected = null
var cip_sancionador = null
var listSancion = new Array()
var indexListSancion = 1

// --
var listSancionador = new Array()
var indexListSancionador = 1

// -- TABLE
var tableDataInfraciones = $('#tbl_data_infraciones').DataTable({
});


function buscarInfracion() {


    $("#tbl_data_infraciones").DataTable().clear().draw()

    var txtcodinfra = $('#idCodigoInfra').val()
    var txtNombreInfra = $('#idNombreInfra').val()
    var idTipoSancion = $('#idTipoSancion').val()
    var idtipoClasFunda = $('#idtipoClasFunda').val()
    var idtipoClasGrave = $('#idtipoClasGrave').val()


    // -- OBJECT
    var objectData = {
        // --
        "codigo_infraccion": txtcodinfra,
        "des_infraccion": txtNombreInfra,
        "id_tipo_sancion": idTipoSancion,
        "id_clasif_inf_fundamento": idtipoClasFunda,
        "id_clasif_inf_gravedad": idtipoClasGrave
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

                console.log(listSancion);
                listSancion.forEach((element) => {

                    tableDataInfraciones.row.add([
                        element.codigo_infraccion,
                        element.des_infraccion,
                        element.des_clasif_inf_fundamento,
                        element.des_clasif_inf_gravedad,
                        element.des_breve_sancion,
                        //' <div style="text-align:center;" data-id="' + element.codigo_infraccion + '" id="btn_seleccionar_sancion_row"><i style="color: #50BDBA" class="fa fa-check"></i></div>' +
                        ' <div style="text-align:center;" class= "btn btn-sm btn-primary" data-id="' + element.codigo_infraccion + '" id="btn_seleccionar_sancion_row"> <i class="fa fa-check"></i></div>'
                    ]).draw(false);
                    tableDataInfraciones.columns.adjust()
                        .responsive.recalc();
                })



            }
        }
    });

}

$('#btnbuscar').on('click', function () {
    buscarInfracion();
});