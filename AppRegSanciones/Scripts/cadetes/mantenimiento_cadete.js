// --
const functions = new Functions()


// -- GUARDAR
$('#btnGuardar').on('click', function () {
    var txt_cip = $('#txt_cip').val()
    var txt_ape_paterno = $('#txt_ape_paterno').val()
    var txt_ape_materno = $('#txt_ape_materno').val()
    var txt_nombres = $('#txt_nombres').val()
    var sl_id_grado = $('#sl_id_grado').val()
    var sl_id_cargo = $('#sl_id_cargo').val()

    // -- OBJECT
    var objectData = {
        // --
        "CIP": txt_cip,
        "ape_paterno": txt_ape_paterno,
        "ape_materno": txt_ape_materno,
        "nombres": txt_nombres,
        "id_grado": sl_id_grado,
        "id_cargo": sl_id_cargo,
        "puntaje_actual": 200
    }

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
                url: urlSaveCadete,
                data: objectData,
                dataType: 'json',
                cache: false,
                success: function (data) {

                    let obj = data.response;
                    console.log(obj)
                    // --
                    if (obj.status == 'OK') {
                        functions.notify_message(MESSAGE.es.success_insert, 'success')
                        window.location.href = RouteCancelar;
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


function getListGrado(IdEmpresa, IdSucursal = 0) {
    // --
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

function getListCargo(IdEmpresa, IdSucursal = 0) {
    // --
    $.ajax({
        url: urlGetListCargo,
        type: 'GET',
        dataType: 'json',
        success: function (data) {
            //console.log(data)

            let html = ''
            //html += '<option value="0">[Seleccionar]</option>'
            // --
            let obj = data.response.data
            // --
            if (obj.length > 0) { // -- Verificar si tiene datos
                // --
                $.each(obj, function (key, value) {
                    // --
                    html += '<option value="' + value.id_cargo + '"> ' + value.des_cargo + '</option>'
                });
            }
            $('#sl_id_cargo').html(html);
            CargarDatosCadete()
        }
    });
}

$('#btnCancelar').on('click', function () {
    window.location.href = RouteCancelar;
})

function CargarDatosCadete() {
    var txt_cip = $('#txt_cip').val()
    if (txt_cip != '00000000') {
        $.ajax({
            type: "GET",
            url: urlGetDatosCadete + '?cip=' + txt_cip,
            dataType: 'json',
            success: function (data) {
                let obj = data.response.data
                //console.log(obj)

                if (obj != null) {
                    $('#txt_ape_paterno').val(obj.ape_paterno)
                    $('#txt_ape_materno').val(obj.ape_materno)
                    $('#txt_nombres').val(obj.nombres)
                    $('#sl_id_grado').val(obj.id_grado)
                    $('#sl_id_cargo').val(obj.id_cargo)
                }
            }
        });
    }
}

getListGrado()
getListCargo()