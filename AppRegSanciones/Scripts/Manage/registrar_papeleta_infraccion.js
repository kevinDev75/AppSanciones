// --
var DatosCadeteSession = null
//const functions = new Functions()

// --
function CargarDatosCadeteSancionado() {
    // --
    $.ajax({
        url: urlGetDatosCadeteSession,
        type: 'POST',
        cache: false,
        async: false,
        dataType: 'json',
        success: function (data) {
            let objData = data.response.data
            //console.log(objData);
            DatosCadeteSession = objData
            if (data.response.status == "OK") {
                $('#txt_cip_sancionado').val(objData.CIP)
                $('#txt_nombres_completos_sancionado').val(objData.nombre_completo)
                $('#txt_rango_sancionado').val(objData.des_grado)
            }
        }
    })
}

// --
function GetFechaActual() {
    // --
    $.ajax({
        url: urlGetFechaActual,
        type: 'POST',
        cache: false,
        async: false,
        dataType: 'json',
        success: function (data) {
            let objData = data.response
            console.log(objData);
            $('#txt_fecha_registroInfr').val(objData)
        }
    })
}

// -- GUARDAR
$('#btnGuardar').on('click', function () {
    var txt_cip_sancionado = $('#txt_cip_sancionado').val()
    var txt_nota = $('#txt_nota').val()

    // -- OBJECT
    var objectData = {
        // --
        "cip_sancionador": cip_sancionador,
        "cip_sancionado": txt_cip_sancionado,
        "codigo_infraccion": codigo_infraccion_selected,
        "Nota": txt_nota
    }
    console.log(objectData)

    let ObjSancionador = listSancionador.find(x => x.CIP == cip_sancionador)

    var camposVacios = "";

    // --
    if (txt_cip_sancionado == null || txt_cip_sancionado == "") {
        camposVacios += "<span>Falta ingresar datos del sancionado</span><br/>"
    }
    // --
    if (cip_sancionador == null || cip_sancionador == "") {
        camposVacios += "<span>Falta seleccionar el cadete sancionador</span><br/>"
    }
    else if (ObjSancionador.Nivel <= DatosCadeteSession.Nivel) {
        camposVacios += "<span>El cadete sancionador tiene un grado igual o inferior</span><br/>"
    }
    // --
    if (codigo_infraccion_selected == null || codigo_infraccion_selected == "") {
        camposVacios += "<span>Falta ingresar la infracción</span>"
    }

    if (camposVacios != "") {
        // --
        Swal.queue([{
            icon: 'warning',
            title: 'Formularios incompletos...',
            html: camposVacios,
            confirmButtonText: 'Ok',
            cancelButtonText: 'Cancelar',
            cancelButtonColor: '#d33',
            showCancelButton: false,
            showLoaderOnConfirm: true,
            preConfirm: () => {
                // --

            }
        }])


    } else {
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
                            window.location.href = RouteInfracciones;
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

})




GetFechaActual()
CargarDatosCadeteSancionado()