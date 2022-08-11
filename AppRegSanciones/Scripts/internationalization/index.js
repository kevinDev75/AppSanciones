
// --
function readCookie(name) {
	// --
	return decodeURIComponent(document.cookie.replace(new RegExp("(?:(?:^|.*;)\\s*" + name.replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=\\s*([^;]*).*$)|^.*$"), "$1")) || null;

}

$.i18n().load({
	es: '../Scripts/internationalization/languages/es.json',
	pt_BR: '../Scripts/internationalization/languages/pt.json'
}).done(function () {
	// --
	$('.switch-locale').on('click', 'a', function (e) {
		e.preventDefault();
		console.log($(this).data('locale'));
		$.i18n().locale = $(this).data('locale');
		// --
		saveIdioma($(this).data('locale'))
		// --
		$('body').i18n();
	});
	// --
	defaultIdioma()
});

function saveIdioma(value) {
	// --
	let idIdioma = null
	// --
	if (value == "es") {
		idIdioma = 1
	} else if ("pt_BR") {
		idIdioma = 2
	}

	// --
	if (idIdioma != null) {
		// --
		$.ajax({
			url: '/Home/SetIdioma?IdIdioma=' + idIdioma,
			type: 'GET',
			dataType: 'json',
			success: function (data) {
				// --
				console.log(data)
			}
		})
    }
	
}

function defaultIdioma () {
	// --
	var miCookie = readCookie("Ididioma");
	// -- Verified
	if (miCookie == 1) {
		$.i18n({
			locale: "es",
		});
	} else {
		$.i18n({
			locale: "pt_BR",
		});
    }
	// -- Load
	$(document).ready(() => {
		$('body').i18n();
	})
}
