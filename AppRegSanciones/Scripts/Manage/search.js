

const functions = new Functions();
console.log("aaa");



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

$('#btnbuscar').on('click', function () {
    // --
    let datos = {
        "fecha_inicio": "01/08/2022",
        "fecha_fin": "30/08/2022"
    }


    $.ajax({
        url: '/Sancion/GetListPapeletaInfraccion',
        type: 'POST',
        data: datos,
        dataType: 'json',
        cache: false,
        success: function (data) {
            console.log(data);
            // --
            //if (data.Status === 'OK') {

            //} else {
            //    functions.notify_message('Ups! Crendenciales incorrectas :(', 'warning')
            //}
        }
    })
})


