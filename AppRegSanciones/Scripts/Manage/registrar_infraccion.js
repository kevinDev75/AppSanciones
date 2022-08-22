
var listaGrados = null;

var tableRelDemeritado = $('#tbl_data_relDemeritado').DataTable({
    //responsive: true,
    //order: [[0, "desc"]]
    searching: false, paging: false, info: false
});


$('#btngrabar').on('click', function () {

    var txtcodinfra = $('#txtcodigoinfra').val()
    var txtNombreInfra = $('#idNombreInfra2').val()
    var idTipoSancion = $('#idTipoSancion2').val()
    var idtipoClasFunda = $('#idtipoClasFunda2').val()
    var idtipoClasGrave = $('#idtipoClasGrave2').val()

    console.log(txtcodinfra);
    var listDemertiados = [];

    if (listaGrados != null) {
        listaGrados.forEach((element) => {

            var id_tipo_sancion = $('#TipoSancion_' + element.id_grado).val();
            var puntaje_demerito = $('#puntajeDeme_' + element.id_grado).val();

            if (puntaje_demerito != null && puntaje_demerito != undefined && puntaje_demerito != 0) {
                var lista = {
                    "codigo_infraccion": txtcodinfra,
                    "id_grado": element.id_grado,
                    "id_tipo_sancion": id_tipo_sancion,
                    "puntaje_demerito": puntaje_demerito
                }
                listDemertiados.push(lista);
            }
        });



        var objectData = {
            // --
            "codigo_infraccion": txtcodinfra,
            "des_infraccion": txtNombreInfra,
            "id_tipo_sancion": idTipoSancion,
            "id_clasif_inf_fundamento": idtipoClasFunda,
            "id_clasif_inf_gravedad": idtipoClasGrave,
            "listDemertiados": listDemertiados

        }
        console.log(objectData);


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
                    url: urlSaveInfraccionMaestro,
                    data: objectData,
                    dataType: 'json',
                    cache: false,
                    success: function (data) {

                        let obj = data.response;
                        console.log(obj)
                        // --
                        if (obj.status == 'OK') {
                            $('#ModalCreateIncidence').modal('hide');
                            functions.notify_message(MESSAGE.es.success_insert, 'success')

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

    }


    var objectData = {
        // --
        "codigo_infraccion": txtcodinfra,
        "des_infraccion": txtNombreInfra,
        "id_tipo_sancion": idTipoSancion,
        "id_clasif_inf_fundamento": idtipoClasFunda,
        "id_clasif_inf_gravedad": idtipoClasGrave,
        "listDemeritado": listDemertiados
    }
    console.log(objectData);

});

function limpiar() {
    $('#txtcodigoinfra').val('')
    $('#idNombreInfra2').val('')
    $('#idTipoSancion2').val(2)
    $('#idtipoClasFunda2').val(1)
    $('#idtipoClasGrave2').val(1)
}
function getListGrado() {

    $("#tbl_data_relDemeritado").DataTable().clear().draw()
    // --
    console.log(urlGetListGrado);
    $.ajax({
        url: urlGetListGrado,
        type: 'GET',
        dataType: 'json',
        success: function (data) {
            //console.log(data)

            let html = ''
            //html += '<option value="0">[Seleccionar]</option>'
            // --
            let obj = data.response.data


            if (obj != null) {

                // -- CADETES
                let lista = obj
                listGrado = lista

                console.log(listGrado);

                listaGrados = listGrado;


                listGrado.forEach((element) => {



                    tableRelDemeritado.row.add([
                        element.des_grado,
                        '<div  style="text-align:center;"><input type="number" placeholder="0" id="puntajeDeme_' + element.id_grado + '" style="width:50%" type="text" class="form-control" value="" id="recipient-name"></div>',
                        '<div class="input-group style="text-align:center; " >' +
                        '<select id="TipoSancion_' + element.id_grado + '" class= "form-control form-control-line" id = "idTipoSancion">' +
                        '<option value="2">A/S</option>' +
                        '<option value="3">A/R</option>' +
                        '<option value="1">Amonestación</option>' +
                        '</select>'
                    ]).draw(false);
                    tableRelDemeritado.columns.adjust()
                        .responsive.recalc();
                })
            }

            // --
            if (obj.length > 0) { // -- Verificar si tiene datos
                // --
                $.each(obj, function (key, value) {
                    // --
                    html += '<option value="' + value.id_grado + '"> ' + value.des_grado + '</option>'
                });
            }
            $('#sl_id_grado').html(html);
        }
    });
}
limpiar();
getListGrado();