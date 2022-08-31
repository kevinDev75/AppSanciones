const functions = new Functions()


$('#txt_fecha_inicio').datepicker({
    showOtherMonths: true,
    selectOtherMonths: true,
    dateFormat: 'dd/mm/yy'
})

$('#txt_fecha_final').datepicker({
    showOtherMonths: true,
    selectOtherMonths: true,
    dateFormat: 'dd/mm/yy'
})

var nowDia = new Date();

var mesactual = String(new Date().getMonth() + 1).padStart(2, '0');

var todayFilteraaaa = new Date(nowDia.getFullYear(), nowDia.getMonth(), 1);
//console.log(today);

var fechaInicial = convertDatetoString(todayFilteraaaa);
var fechaFinal = convertDatetoString(new Date());

var idpapelera = 0;

$('#txt_fecha_inicio').val(fechaInicial);
$('#txt_fecha_final').val(fechaFinal);







function convertDatetoString(today) {
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    return dd + '/' + mm + '/' + yyyy;

}



$('#btnbuscar').on('click', function () {
    // --
    $(".preloader").show()

    let objectData = {
        "fecha_inicio": $('#txt_fecha_inicio').val(),
        "fecha_fin": $('#txt_fecha_final').val(),
        "cip_sancionador": $('#txtSancionador').val()

    }
    console.log(objectData);

    $.ajax({
        type: "POST",
        url: urlgetReporteListaSancionador,
        data: objectData,
        dataType: 'json',
        cache: false,
        success: function (data) {
            $(".preloader").hide();
            let obj = data.response.data
            console.log(data);
            console.log(window.location.origin);
            if (obj != "") {
                var ruta = window.location.origin;
                console.log(ruta);
                let a = document.createElement('a');
                a.target = '_blank';
                a.href = ruta + "/" + obj;
                a.click();

                functions.notify_message(MESSAGE.es.success_insert, 'success')
            }
        },
        error: function (e) {
            $(".preloader").hide();
        }
    });

})