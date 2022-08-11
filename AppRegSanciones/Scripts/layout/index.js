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
            console.log(data);
            // --
            console.log(urlMain);
            location.reload();

        }
    })
}

// --
function GetUser() {
    console.log('GetUser')
    // --
    $.ajax({
        url: urlGetUser,
        type: 'GET',
        cache: false,
        async: false,
        dataType: 'json',
        success: function (data) {
            //console.log(data);
            if (data.Data.length > 0) {
                $('#lbl_login_usuario').text(data.Data[0].NombreUsuario)
                $('#lbl_nombre_apellido_usuario').text(data.Data[0].Nombre + ' ' + data.Data[0].ApellidoPaterno + ' ' + data.Data[0].ApellidoMaterno)
                $('#lbl_correo_usuario').text(data.Data[0].Email)
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

//ValidateAcceso()
//GetUser()