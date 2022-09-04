
const functions = new Functions()

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

    listSancion = new Array();
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
                //let lista = obj
                listSancion = obj

                console.log(listSancion);
                listSancion.forEach((element) => {

                    tableDataInfraciones.row.add([
                        element.codigo_infraccion,
                        element.des_infraccion,
                        element.des_clasif_inf_fundamento,
                        element.des_clasif_inf_gravedad,
                        element.des_breve_sancion,
                        //' <div style="text-align:center;" data-id="' + element.codigo_infraccion + '" id="btn_seleccionar_sancion_row"><i style="color: #50BDBA" class="fa fa-check"></i></div>' +
                        '<div style="text-align:center;">' + 
                        ' <div style="text-align:center;" onclick="editarInfra(\'' + element.codigo_infraccion + '\')" '  + ' class= "btn btn-sm btn-primary" data-id="' + element.codigo_infraccion + '" id="btn_seleccionar_sancion_row"> <i class="fa fa-edit"></i></div>' + 
                        ' <div style="text-align:center;" class= "btn btn-sm btn-danger" data-id="' + element.codigo_infraccion + '" id="btn_anular_papeleta_row"> <i class="fa fa-window-close"></i></div>'
                        + '</div>'
                    ]).draw(false);
                    tableDataInfraciones.columns.adjust()
                        .responsive.recalc();
                })


                functions.notify_message(MESSAGE.es.success_select, 'success')
            }
        }
    });

}

$('#btnbuscar').on('click', function () {
    buscarInfracion();
});

function limpiarInfra() {
    $("#txtcodigoinfra").val("");
    $("#idNombreInfra2").val("");
    $("#idTipoSancion2").val(1);
    $("#idtipoClasFunda2").val(1);
    $("#idtipoClasGrave2").val(1);

  
}
function editarInfra(codigo) {
    isupdate = true;
    console.log(listSancion);
    $("#txtcodigoinfra").prop('disabled', true);

    var item = listSancion.find(x => x.codigo_infraccion == codigo);
    console.log(item);
    limpiarInfra();
    $("#txtcodigoinfra").val(codigo);
    $("#txtcodigoinfra").val(codigo);
    $("#idNombreInfra2").val(item.des_infraccion);
    $("#idTipoSancion2").val(item.id_tipo_sancion);
    $("#idtipoClasFunda2").val(item.id_clasif_inf_fundamento);
    $("#idtipoClasGrave2").val(item.id_clasif_inf_gravedad);

    var objectData = {
        // --
        "codigo_infraccion": $("#txtcodigoinfra").val()
    }


    $.ajax({
        type: "POST",
        url: urlGetPuntajexInfraccionxID,
        data: objectData,
        dataType: 'json',
        cache: false,
        success: function (data) {
            let obj = data.response.data
            
            if (obj != null) {
                console.log(obj);
                obj.forEach((element) => {
                    console.log(element.id_grado);
                    $("#puntajeDeme_" + element.id_grado).val(element.puntaje_demerito); 
                    $("#TipoSancion_" + element.id_grado).val(element.id_tipo_sancion); 
                    
                }) 
                //puntajeDeme_2
                $('#ModalCreateIncidence').modal('show')
            }
        }
    });



    
}



$('#btncrearinfracion').on('click', function () {
    isupdate = false;
    $("#txtcodigoinfra").prop('disabled', false);

    $('#txtcodigoinfra').val('')
    $('#idNombreInfra2').val('')
    $('#idTipoSancion2').val(2)
    $('#idtipoClasFunda2').val(1)
    $('#idtipoClasGrave2').val(1)
});


//buscarInfracion();