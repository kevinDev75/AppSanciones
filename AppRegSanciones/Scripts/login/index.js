// --
const functions = new Functions()
// --

var captcha = "";

GetCaptcha();

if (document.getElementById("sectionRecover") != null) {
    document.getElementById("sectionRecover").style.cssText = 'display:none !important';
}



function changeOpc(value) {
    console.log(value);
    if (value == 0) {
        //$("#sectionLogin").hide();
        document.getElementById("sectionRecover").style.cssText = 'display:flex !important';
        $("#txtEmailRecover").val("");
        document.getElementById("sectionLogin").style.cssText = 'display:none !important';
        ("#sectionRecover").show();
    } else {
        document.getElementById("sectionLogin").style.cssText = 'display:flex !important';
        document.getElementById("sectionRecover").style.cssText = 'display:none !important';
    }


}


function GetCaptcha() {
    $.ajax({
        type: "GET",
        url: urlCaptcha,
        data: null,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: true,
        success: function (data) {
            $("#sp-captcha").text(data.Captcha);
            captcha = data.Captcha;
            console.log(captcha);
        },
        error: function (err) {
            swal({ title: "Información", text: err.statusText, icon: "warning", });
        }
    });
}

$("#refresh").click(function () {
    GetCaptcha();
});

$("#btn_changePassword").click(function () {
    console.log("asd");
    changePassword();

});

function changePassword(){
    if ($("#txtpasswordRepeat").val() !== "" && $("#txtpassword").val() !== "") {
        console.log($("#txtpasswordRepeat").val());
        console.log($("#txtpassword").val());
        if ($("#txtpasswordRepeat").val() == $("#txtpassword").val()) {

            let datos = {
                'IdUsuario': $("#txtIdUsuario").val(),
                'Password': $("#txtpassword").val(),
            }

            console.log(datos);

            $.ajax({
                url: urlChangePassword,
                type: 'POST',
                data: datos,
                dataType: 'json',
                cache: false,
                success: function (d) {
                    // --
                    console.log(d);
                    if (d.apiResponse.status.toUpperCase() === 'OK') {


                        console.log(BASE_URL);

                        Swal.queue([{
                            title: 'Cambio de contraseña',
                            confirmButtonText: 'OK',
                            text: "Se actualizo Corectamente!",
                            icon: "success",
                            showLoaderOnConfirm: true,
                            preConfirm: () => {
                                return fetch()
                                    .then(window.location.href = '/home')
                                    .catch(() => {
                                    })
                            }
                        }]);
                    } else {
                        functions.notify_message('Ocurrio un problema al guardar', 'warning')
                    }
                }
            })

        } else {

                Swal.queue([{
                            title: 'Cambio de contraseña',
                            confirmButtonText: 'OK',
                            text: "La contraseña ingresada no son las mismas",
                            icon: "error",
                            showLoaderOnConfirm: true,
                            preConfirm: () => {
                                return fetch()
                                    .then()
                                    .catch(() => {
                                    })
                            }
                        }]);
        }
  


    }
    else {

        swal({ title: "Información", text: "Debe ingresar todos los campos", icon: "warning", });
    }


}

$("#sp-captcha").on('copy', function (e) {
    e.preventDefault();
    //console.log('Esta acción está prohibida');
    return;
});

$(function () {
    $("#sp-captcha").bind("contextmenu", function (e) {
        return false;
    });
});


function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

function recover() {
    // --
   
    let txtEmailRecover = $('#txtEmailRecover').val()

    if (!validateEmail(txtEmailRecover)) {
        functions.notify_message('Ingrese un correo valido !', 'warning');
        return;
    }
    // -- 
    if (txtEmailRecover === '') {
        // --
        functions.notify_message('Ups! Es necesario un correo valido', 'warning')
        return;
    }
    if ($("#txtEmailRecover").val() !== "") {
           showLoader();
            let datos = {
                'email': txtEmailRecover,
            }
            // --
            $.ajax({
                url: urlSendMailRecover,
                type: 'POST',
                data: datos,
                dataType: 'json',
                cache: false,
                success: function (data) {
                    // --
                    hideLoader();
                    console.log(data);
                    console.log(BASE_URL);
                    if (data.status === 'OK') {

                        Swal.queue([{
                            title: 'Cambio de contraseña',
                            confirmButtonText: 'OK',
                            text: "Se envio el correo correctamente!",
                            icon: "success",
                            showLoaderOnConfirm: true,
                            preConfirm: () => {
                                return fetch()
                                    .then(window.location.href = '/home')
                                    .catch(() => {
                                    })
                            }
                        }]);

                    } else {
                        functions.notify_message('Error al enviar el correo', 'warning');
                    }
                },
                error: function (d) {
                    hideLoader();
                }
            })

      
    } else {
        functions.notify_message('Ingresar el código captcha', 'warning');
        hideLoader();
    }


    
}

function hideLoader() {
    $('#content_loader_main').css('display', 'none');
}

// --
function showLoader() {
    $('#content_loader_main').css('display', 'block');
}

// --
$("#btn_login").on("click", function () {
    // --
    login()
})
$("#btn_recover").on("click", function () {
    // --
    console.log("recuperando contraseña");
    recover()
})



// -- 
$("#password").keypress(function (e) {
    // -- 
    let code = (e.keyCode ? e.keyCode : e.which)
    if (code === 13) {
        login()
    }
})

function defaultIdioma2(IdIdioma) {
    // -- Verified
    if (IdIdioma == 1) {
        $.i18n({
            locale: "es",
        });
        $('#username').attr('placeholder', 'Usuario')
        $('#password').attr('placeholder', 'Contraseña')
    } else {
        $.i18n({
            locale: "pt_BR",
        });
        $('#username').attr('placeholder', 'Usuário')
        $('#password').attr('placeholder', 'Senha')
    }
    // -- Load
    $(document).ready(() => {
        $('body').i18n();
    })
}

// -- No hagan esto en casa, solo en casos de emergnecias

var verifiedCaptcha = false

var captcha = sliderCaptcha({
    id: 'captcha',
    repeatIcon: 'fa fa-redo',
    onSuccess: function () {
        //var handler = setTimeout(function () {
            console.log("Exito ")
            verifiedCaptcha = true
            // --
            login()
        //}, 500);
    }
});

function login() {
    // --
    let username = $('#username').val()
    let password = $('#password').val()
    // -- 
    if (username === '' || password === '') {
        // --
        functions.notify_message('Ups! Es necesario ingresar usuario y contraseña :(', 'warning')
        return;
    }
   // if ($("#txtcaptcha").val() !== "") {
    // if (captcha === $("#txtcaptcha").val()) {
    if (verifiedCaptcha) {
        let datos = {
            'username': username,
            'password': password,
        }
        console.log(BASE_URL + 'Login/Login')
        // --
        $.ajax({
            url: BASE_URL + 'Login/login',
            type: 'POST',
            data: datos,
            dataType: 'json',
            cache: false,
            success: function (data) {
                // --
                console.log(data);
                if (data.status === 'OK') {
                    window.location.href = urlMain;
                    // window.location.replace(BASE_URL + 'Home/Main')
                } else {
                    functions.notify_message('Ups! Crendenciales incorrectas :(', 'warning')
                }
            }
        })
    } else {
        functions.notify_message('Ingresar el código captcha', 'warning');
    }
           

       /* } else {
            functions.notify_message('El código captcha no es el correcto', 'warning');
        }*/
   /* } else {
        functions.notify_message('Ingresar el código captcha', 'warning');
    }*/
}