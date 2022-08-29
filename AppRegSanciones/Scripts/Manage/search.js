

const functions = new Functions()


var listaPapeletas;

var tableDataPapeleta = $('#table_lista_papeletas').DataTable({
    //responsive: true,
    //order: [[0, "desc"]]
})
var puntaje_posterior;


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

var idpapelera = 0 ;

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
function getPuntaje() {


    $.ajax({
        type: "POST",
       // url: urlGetPuntajeActual,
        url: urlGetUsuario,
        dataType: 'json',
        cache: false,
        success: function (data) {
      
            console.log(data);
            if (data != null) {

                let objectData = {
                    "id_mes": mesactual,
                    "cip_sancionado": data.response.data.CIP
                }

                $.ajax({
                    type: "POST",
                     url: urlGetPuntajeActual,
                    //url: 'GetUsuario',
                    data: objectData,
                    dataType: 'json',
                    cache: false,
                    success: function (data) {
                        console.log(data);
                        var obj = data.response.data;
                        console.log(obj);
                       
                        $('#idpuntaje').html(obj.puntaje_posterior);
                        puntaje_posterior = obj.puntaje_posterior;
                        cant_arresto_rigor = obj.cant_arresto_rigor;
                        cant_arresto_simple = obj.cant_arresto_simple;
                        if (c3 != undefined) {
                        var chart = c3.generate({
                            bindto: '#visitor',
                            data: {
                                columns: [
                                    
                                    ['BAJA', obj.cant_arresto_rigor],
                                    ['A/R', obj.cant_arresto_simple],
                                    ['A/S', obj.puntaje_posterior]
                                ],

                                type: 'donut',
                                onclick: function (d, i) { console.log("onclick", d, i); },
                                onmouseover: function (d, i) { console.log("onmouseover", d, i); },
                                onmouseout: function (d, i) { console.log("onmouseout", d, i); }
                            },
                            donut: {
                                label: {
                                    show: false
                                },
                                title: "% Sanciones",
                                width: 20,

                            },

                            legend: {
                                hide: true
                                //or hide: 'data1'
                                //or hide: ['data1', 'data2']
                            },
                            color: {
                                pattern: ['#24d2b5', '#6772e5', '#20aee3']
                            }
                        });
                        }
                    }
                });
            }
        }
    });
}
$('#btnIncidencia').on('click', function () {

    window.location.href = RouteRegistrarInfr;


});


function limpiarcampos() {


}

function showModalDetalle(idpapelera) {
    idpapelera = idpapelera;

    var item = listaPapeletas.find(x => x.id_papeleta_infraccion_disc = idpapelera);


    $('#txtcodigoPape').val(item.codigo_papeleta_infraccion_disc);
    $('#txtfechaRegistro').val(item.fecha_registro_sancionado);
    $('#txtfechaAprobacion').val(item.fecha_aprobacion_sancionador);
    $('#txtgradosancionado').val(item.des_grado_sancionado);
    $('#txtnombresancionado').val(item.cadete_sancionado);

    $('#txtgradosancionador').val(item.des_grado_sancionador);
    $('#txtnombresancionador').val(item.cadete_sancionador);
    $('#txtcodigoInfra').val(item.codigo_infraccion);
    $('#txtnombreInfra').val(item.des_infraccion);

    $('#txtestadoInfra').val(item.nom_estado);
    $('#txtnotaInfra').val(item.Nota);


    $('#modalDetallePapelera').modal('show');
}
$('#btnbuscar').on('click', function () {
    // --
    $(".preloader").show()

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

                listaPapeletas = listSancion;



                console.log(listSancion);
                listSancion.forEach((element) => {

                    tableDataPapeleta.row.add([
                        element.codigo_papeleta_infraccion_disc,
                        element.des_infraccion,
                        element.fecha_registro_sancionado,
                        element.cadete_sancionador,
                        element.nom_estado,
                        //' <div style="text-align:center;" data-id="' + element.codigo_infraccion + '" id="btn_seleccionar_sancion_row"><i style="color: #50BDBA" class="fa fa-check"></i></div>' +
                        '<div onClick="showModalDetalle(' + element.id_papeleta_infraccion_disc + ')" style="cursor:pointer;text-align:center;"><i style="color: #50BDBA" class="fa fa-list-ul"></i></div>'
                    ]).draw(false);
                    tableDataPapeleta.columns.adjust()
                        .responsive.recalc();
                })
                $(".preloader").hide()
                functions.notify_message(MESSAGE.es.success_insert, 'success')
            }
        },
        error: function (e) {
            $(".preloader").hide();
        }
    });

})

getPuntaje();


