$('#date-start').datepicker({
	showOtherMonths: true,
	selectOtherMonths: true,
	dateFormat: 'dd/mm/yy'
})

$('#date-end').datepicker({
	showOtherMonths: true,
	selectOtherMonths: true,
	dateFormat: 'dd/mm/yy'
})


$(document).ready(() => {
	getInterestInformationCurrentDay();
}) 

var assetFiles = new Array();


$("#btn_guardar_file").on('click', function () {
	// -- Constantes para validar el tamaño de un archivo
	const byte = 1048576 // -- 1 MB	-> 1048576 Byte
	const maxSize = 25 // -- 25 Megabytes
	// --
	let formData = new FormData();
	// --
	var input_file_asset_manager = $('#input_file_asset_manager').prop("files")[0];
	var txt_asunto_asset_manager = $('#txt_asunto_asset_manager').val()
	// --
	var ext_input_file_asset_manager = ""
	// --
	if (input_file_asset_manager !== undefined) {
		// --
		// -- Validamos tamaño que sea menor a 25 MB
		if ((input_file_asset_manager.size / byte) <= maxSize) {

			// --
			if (txt_asunto_asset_manager.length > 0 && txt_asunto_asset_manager != "") {
				// --
				ext_input_file_asset_manager = getFileExtension(input_file_asset_manager.name)
				ext_input_file_asset_manager = ext_input_file_asset_manager.toLowerCase()
				// --
				formData.append("dataFile", input_file_asset_manager, input_file_asset_manager.name);
				new InterestInformation(0, input_file_asset_manager.name, "/", ext_input_file_asset_manager.toLowerCase(), 0, 0).toObject();
				// --
				let objectData = {
					"IdInfoInteres": 0,
					"NombreArchivo": input_file_asset_manager.name,
					"RutaArchivo": null,
					"ExtensionArchivo": ext_input_file_asset_manager,
					"IdUsuarioRegistro": 0,
					"IdEmpresa": 0,
					"Asunto": txt_asunto_asset_manager
				}
				// --
				formData.append(
					"JsonMaster",
					JSON.stringify(objectData)
				);
				// --
				save(formData)
			} else {
				console.log('Completar formulario, verificar')
				Swal.fire({
					icon: 'error',
					title: 'Completar formulario, verificar'
				})
			}
		} else {
			// --
			Swal.fire({
				icon: 'error',
				title: 'El archivo supera el tamaño establecido (25 MB), verificar'
			})
        }
	} else {
		console.log('No hay archivo adjunto, verificar')
		Swal.fire({
			icon: 'error',
			title: 'No hay archivo adjunto, verificar'
		})
    }
	
})
//$('#upload-file').click(() => {
//	const inputFile = $('#input-file');

//	inputFile.click();

//	inputFile.change((e) => {
//		const files = e.target.files;

//		for (let index = 0; index < files.length; index++) {
//			let file = files[index];
//			const extension = getExtension(file);
//			const interestInformation = new InterestInformation(0, file.name, "test", extension, 0, 0).toObject();	
//			save(interestInformation, file);
//		}
//	});
//});

function list(interestInformation) {
	const tableAssetsFiles = $('#tbl-assets-files');	
	const row = itemFileForTable(interestInformation);
	tableAssetsFiles.append(row);
}

function save(formData) {	
	const urlInterestInformation = '/Safe/SaveOrUpdateInterestInformation';
	
	//formData.append("dataFile", file);
	//formData.append("JsonMaster", JSON.stringify(interestInformation));

	//$.ajax({
	//	type: "POST",
	//	url: urlInterestInformation,
	//	data: formData,
	//	dataType: 'json',
	//	cache: false,
	//	contentType: false,
	//	processData: false,
	//	success: function (data) {
	//		$('#tbl-assets-files').empty();
	//		getInterestInformationCurrentDay();

	//	},
	//	error: function (err) {
	//		console.log(err);
	//	},
	//});

	Swal.queue([{
		icon: 'info',
		title: '¿Desea guardar el registro?',
		confirmButtonText: 'Guardar',
		cancelButtonText: 'Cancelar',
		cancelButtonColor: '#d33',
		showCancelButton: true,
		showLoaderOnConfirm: true,
		preConfirm: () => {

			return $.ajax({
				type: "POST",
				url: urlInterestInformation,
				data: formData,
				dataType: 'json',
				cache: false,
				contentType: false,
				processData: false,
				success: function (data) {
					console.log('DATA', data)
					var typeAlert = (data.response.status == "OK") ? 'success' : 'error';
					var Message = (data.response.status == "OK") ? 'Se guardo la información correctamente' : 'Ocurrio un problema, Comuniquese con sistemas';
					// --
					Swal.queue([{
						title: 'Correcto',
						confirmButtonText: 'OK',
						text: Message,
						icon: typeAlert,
						showLoaderOnConfirm: true,
						preConfirm: () => {
							return fetch()
								.then(window.location.reload())
								.catch(() => {
								})
						}
					}]);
				}
			});
		}
	}])
}


function deleteFile(IdInforInteres) {
	// --
	const urlInterestInformation = '/Safe/UpdateStatusInterestInformation?IdInfoInteres='+IdInforInteres+'&Flg_Estado=false';

	Swal.queue([{
		icon: 'info',
		title: '¿Desea eliminar el registro?',
		confirmButtonText: 'Eliminar',
		cancelButtonText: 'Cancelar',
		cancelButtonColor: '#d33',
		showCancelButton: true,
		showLoaderOnConfirm: true,
		preConfirm: () => {

			return $.ajax({
				type: "GET",
				url: urlInterestInformation,
				dataType: 'json',
				cache: false,
				success: function (data) {
					console.log('DATA', data)
					var typeAlert = (data.response.status == "OK") ? 'success' : 'error';
					var Message = (data.response.status == "OK") ? 'Se elimino la información correctamente' : 'Ocurrio un problema, Comuniquese con sistemas';
					// --
					Swal.queue([{
						title: 'Correcto',
						confirmButtonText: 'OK',
						text: Message,
						icon: typeAlert,
						showLoaderOnConfirm: true,
						preConfirm: () => {
							return fetch()
								.then(window.location.reload())
								.catch(() => {
								})
						}
					}]);
				}
			});
		}
	}])
}

$('#btn_search').click(() => {
	const dateStart = $('#date-start').val();
	const dateEnd = $('#date-end').val();
	getInterestInformation(dateStart, dateEnd);
});

function getInterestInformationCurrentDay() {
	const date = new Date();
	const formatDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
	getInterestInformation(formatDate, formatDate);
}


function getInterestInformation(dateStart, dateEnd) {	
	const url = `/Safe/GetListInterestInformation?FechaInicio=${dateStart}&FechaFin=${dateEnd}`;
	console.log(url)
	$.ajax({
		type: "GET",
		url: url,		
		cache: false,
		contentType: false,
		processData: false,
		success: function (data) {
			//data.Data.forEach(interestInformation => list(interestInformation));	
			$('#tbl-assets-files').html("")
			data.Data.forEach((element) => {
				list(element)
			})
			assetFiles = data.Data;
		},
		error: function (err) {
			console.log(err);
		},
	})
}

function getExtension(file) {
	let arrNameFile = file.name.split('.');
	const extension = arrNameFile[arrNameFile.length - 1];
	return extension;
}

function downloadFileAsset(value) {
	const urlGetdownloadFile = '/Safe/GetFileDownload';	
	let Object = assetFiles.find(file => file.IdInfoInteres == value);
	let url = urlGetdownloadFile + "?ruta=" + Object.RutaArchivo;

	$.ajax({
		url: url,
		type: 'GET',
		dataType: 'json',
		success: function (data) {
			if (data.DataBase) {
				console.log(data);
				let arr = base64ToArrayBuffer(data.DataBase);
				saveByteArray(Object.NombreArchivo, arr, Object.ExtensionArchivo);
			}
		}
	});
}

function saveByteArray(reportName, byte, type) {
	console.log(byte);
	var blob = new Blob([byte], { type: type });
	var link = document.createElement('a');
	link.href = window.URL.createObjectURL(blob);
	var fileName = reportName;
	link.download = fileName;
	link.click();
}

function base64ToArrayBuffer(base64) {
	var binaryString = atob(base64);
	var binaryLen = binaryString.length;
	var bytes = new Uint8Array(binaryLen);
	for (var i = 0; i < binaryLen; i++) {
		var ascii = binaryString.charCodeAt(i);
		bytes[i] = ascii;
	}
	return bytes;
}
function itemFileForTable(item) {
	return `<tr>
				<td class="valign-middle">
					<label class="ckbox mg-b-0">
						<input type="checkbox"><span></span>
					</label>
				</td>
				<td>
					<i class="far fa-file tx-24 tx-warning lh-0 valign-middle"></i>
						<span class="pd-l-5">${item.NombreArchivo}</span>
				</td>
				<td>
						<span class="pd-l-5">${item.Asunto}</span>
				</td>
				<td class="hidden-xs-down">${item.FecModificacion}</td>
				<td class="dropdown">
					<a href="#" data-toggle="dropdown" class="btn pd-y-3 tx-gray-500 hover-info"><i class="icon ion-more"></i></a>
					<div class="dropdown-menu dropdown-menu-right pd-10">
						<nav class="nav nav-style-1 flex-column">
							<a onclick="downloadFileAsset(${item.IdInfoInteres})" class="nav-link">Descarga</a>
							<a  onclick="deleteFile(${item.IdInfoInteres})" class="nav-link">Eliminar</a>
						</nav>
					</div>
				</td>
			</tr>`;
}

function load() {
	// --
	let FechaInicio = new Date()
	FechaInicio.setMonth(FechaInicio.getMonth() - 1)
	// --
	let FechaInicio_in_string = FechaInicio.toLocaleDateString('es-ES', { year: 'numeric', month: '2-digit', day: '2-digit' })
	let FechaFin_in_string = new Date().toLocaleDateString('es-ES', { year: 'numeric', month: '2-digit', day: '2-digit' })
	// --
	$('#date-start').val(FechaInicio_in_string)
	$('#date-end').val(FechaFin_in_string)
}

// --
class InterestInformation {
	constructor(id, name, route, extension, idUserRegister, idEnterprise) {
		this.id = id;
		this.name = name;
		this.route = route;
		this.extension = extension;
		this.idUserRegister = idUserRegister;
		this.idEnterprise = idEnterprise;
	}

	toObject() {
		return {
			"IdInfoInteres": this.id,
			"NombreArchivo": this.name,
			"RutaArchivo": this.route,
			"ExtensionArchivo": this.extension,
			"IdUsuarioRegistro": this.idUserRegister,
			"IdEmpresa": this.idEnterprise,
		}
	}
}


// -- INIT
load()