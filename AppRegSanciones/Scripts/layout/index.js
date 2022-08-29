// --
function logout() {
    // --
    $.ajax({
        url: urlLogOut,
        type: 'POST',
        cache: false,
        async:true,
        dataType: 'json',
        success: function (data) {
            //console.log(data);
            // --
            //console.log(urlMain);
            location.reload();

        }
    })
}

// --
function RutaAprobarInfracciones() {
    // --
    window.location.href = RouteAprobarInfracciones;
}


// --
function GetUser() {
    //console.log('GetUser')
    // --
    $.ajax({
        url: urlGetUser,
        type: 'POST',
        cache: false,
        async: false,
        dataType: 'json',
        success: function (data) {
            let objData = data.response.data
            //console.log(data);
            if (data.response.status == "OK") {
                //$('#lbl_login_usuario').text(objData.CIP)
                //console.log(objData.nombre + ' ' + objData.apellido_paterno + ' ' + objData.apellido_materno)
                $('#lbl_nombre_apellido_usuario').text(objData.nombre + ' ' + objData.apellido_paterno)
            }
        }
    })
}

// --
function ValidateAcceso() {
    // --
    $.ajax({
        url: urlValidateAccesoMercurio,
        type: 'POST',
        cache: false,
        async: true,
        dataType: 'json',
        success: function (d) {
            //console.log(d.response);
            let data = d.response

            if (!data.FlgActivo) {
                let MsgInactivo = 'No se podrá usar el sistema. Ha caducado la versión'
                if (data.MsgInactivo != null && data.MsgInactivo != '') {
                    MsgInactivo = data.MsgInactivo
                }
                
                Swal.queue([{
                    title: data.TitleInactivo,
                    confirmButtonText: 'OK',
                    text: MsgInactivo,
                    icon: "warning",
                    showLoaderOnConfirm: true,
                    preConfirm: () => {
                        location.reload();
                    }
                }]);
            } else if (data.FlgMostrarAlerta && data.MsgAlerta != null && data.MsgAlerta != '') {
                
                Swal.queue([{
                    title: data.TitleAlerta,
                    confirmButtonText: 'OK',
                    text: data.MsgAlerta,
                    icon: "warning",
                    showLoaderOnConfirm: true,
                    preConfirm: () => {

                    }
                }]);
            }



        }
    })
}


function TimerVerificarPapeletasParaAprobar() {
    //console.log('TimerVerificarPapeletasParaAprobar')
    $.ajax({
        type: "POST",
        url: urlGetListPapeletasParaAprobar,
        data: '',
        dataType: 'json',
        cache: false,
        success: function (data) {
            let obj = data.response.data
            //console.log(obj)

            if (obj != null) {
                let lista = obj
                if (lista.length > 0) {
                    $('#lbl_cantidad_papeletas_por_aprobar').text(lista.length)
                    $('#mostrar_notificaciones_papeletas').removeAttr('hidden')
                }
            }
        }
    });

}

//ValidateAcceso()
GetUser()
TimerVerificarPapeletasParaAprobar()
setInterval(TimerVerificarPapeletasParaAprobar, 5000);