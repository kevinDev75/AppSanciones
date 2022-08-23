

const functions = new Functions();


var tableDataPapeleta = $('#table_lista_papeletas').DataTable({
    //responsive: true,
    //order: [[0, "desc"]]
})


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
//console.log(today);

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

    window.location.href = RouteRegistrarInfr;


})
$('#btnbuscar').on('click', function () {
    // --

    $("#table_lista_papeletas").DataTable().clear().draw()

    let objectData = {
        "fecha_inicio": $('#txt_fecha_inicio').val(),
        "fecha_fin": $('#txt_fecha_final').val(),
        "codigo_papeleta_infraccion_disc": $('#txtcodigoPapeleta').val(),
        "cip_sancionador": $('#txtSancionador').val(),
        "cip_sancionado": null,
        "id_estado_papeleta": $('#idestadoPapeleta').val()
    }
    console.log(objectData);


       


    $.ajax({
        type: "POST",
        url: RouteRegistrar,
        data: objectData,
        dataType: 'json',
        cache: false,
        success: function (data) {
            let obj = data.response.data

            if (obj != null) {

                // -- CADETES
                let lista = obj
                listSancion = lista

                listSancion.forEach((element) => {

                    tableDataPapeleta.row.add([
                        element.codigo_papeleta_infraccion_disc,
                        element.des_infraccion,
                        element.fecha_registro_sancionado,
                        element.cadete_sancionador,
                        element.nom_estado,
                        //' <div style="text-align:center;" data-id="' + element.codigo_infraccion + '" id="btn_seleccionar_sancion_row"><i style="color: #50BDBA" class="fa fa-check"></i></div>' +
                        '<div style="cursor:pointer;text-align:center;"><i style="color: #50BDBA" class="fa fa-folder"></i></div>'
                    ]).draw(false);
                    tableDataPapeleta.columns.adjust()
                        .responsive.recalc();
                })

                functions.notify_message(MESSAGE.es.success_insert, 'success')
            }
        }
    });

})


