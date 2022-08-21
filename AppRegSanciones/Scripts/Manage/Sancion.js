

var listSancion = new Array()
var indexListSancion = 1

// -- TABLE
var tableDataSancion= $('#tbl_data_sancion').DataTable({
    //responsive: true,
    //order: [[0, "desc"]]
})

function cargarTipoSancion() {
   
        $.ajax({
            type: "GET",
            url: urlGetTipoSancion,
            dataType: 'json',
            success: function (data) {
                let obj = data.response.data
                //console.log(obj)


                let html = ''
                //html += '<option value="0">[Seleccionar]</option>'
                // --
              
                // --
                if (obj.length > 0) { // -- Verificar si tiene datos
                    // --
                    $.each(obj, function (key, value) {
                        // --
                        html += '<option value="' + value.id_tipo_sancion + '"> ' + value.des_breve_sancion + '</option>'
                    });
                }
                $('#idTipoSancion').html(html);
            }
        });
    
}

function buscarInfracion() {


    $("#tbl_data_sancion").DataTable().clear().draw()

    var txtcodinfra = $('#idCodigoInfra').val()
    var txtNombreInfra = $('#idNombreInfra').val()
    var idTipoSancion = $('#idTipoSancion').val()
    
      
    // -- OBJECT
    var objectData = {
        // --
        "codigo_infraccion": txtcodinfra,
        "des_infraccion": txtNombreInfra,
        "id_tipo_sancion": idTipoSancion
    }
    console.log(objectData);

    $.ajax({
        type: "POST",
        url: urlGetSearchSanciones,
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

                    tableDataSancion.row.add([
                        element.codigo_infraccion,
                        element.des_infraccion,
                        element.des_breve_sancion,
                        ' <div style="text-align:center;"><i  style="color: #50BDBA;cursor:pointer" class="fa fa-check"></i></div>' 
                    ]).draw(false);
                    tableDataSancion.columns.adjust()
                        .responsive.recalc();
                })
                   
               

            }
        }
    });
    
}

$('#btnbuscarInfracion').on('click', function () {
    console.log("asaaaaaa");
    buscarInfracion();
});

cargarTipoSancion();

$('#idCodigoInfra').focus();