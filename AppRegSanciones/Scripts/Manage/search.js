

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

const now = new Date();

const today = new Date(now.getFullYear(), now.getMonth(), 1);
console.log(today);

var fechaInicial = convertDatetoString(today);
var fechaFinal = convertDatetoString(new Date());

$('#txt_fecha_inicio').val(fechaInicial);
$('#txt_fecha_final').val(fechaFinal);

$("#divPersonModal").click(function () {
    getPerson();
});

function convertDatetoString(today) {
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    return dd + '/' + mm + '/' + yyyy;

}

function getPerson(cip, nombre) {

    $('#ModalPersonSearch').modal('hide');
    $('#txtSancionador').val(nombre);

}
function ShowRegistrarIncidencia() {
   
}
$('#btnIncidencia').on('click', function () {
    
    window.location.href = RouteRegistrar;


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


