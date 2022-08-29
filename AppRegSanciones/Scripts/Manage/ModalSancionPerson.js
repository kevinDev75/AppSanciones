var tableDataSancionador = $('#tbl_data_sancionador').DataTable({
    //responsive: true,
    //order: [[0, "desc"]]
})

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
$(document).on('click', '#btn_seleccionar_sancionador_row', function () {
    // --
    let value = $(this).attr('data-id')
    //console.log('value', value)
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
    //console.log(ObjSancionador)

    $('#txtSancionador').val(ObjSancionador.CIP + ' - ' + ObjSancionador.nombre_completo)
    $('#ModalPersonSearch').modal('hide')
})
$('#btnbuscarSancionador').on('click', function () {
    buscarSancionador();
});