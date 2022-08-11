// -- Class Functions
class Functions {

    /**
     * Notify Message
     * @param {*} title 
     * @param {*} type 
     */
    notify_message(title, type) {
        // -- Documentation Notify http://bootstrap-notify.remabledesigns.com/
        $.notify({
            icon: 'ni ni-bell-55',
            title: title,
            message: ''
        }, {
            type: type, z_index: 2000, // -- danger, info, warning, success
            placement: {
                from: 'bottom', // -- Bottom, top
                align: 'right' // -- Right, left, center
            }
        }
        )
    }


    /**
     * Decrypt code in hexadecimal and base64
     * @param {*} string 
     */
    decrypt_hex64JS(string) {
        // --
        let i = 0
        let l = string.length - 1
        let bytes = []
        // --
        for (i; i < l; i += 2) {
            bytes.push(parseInt(string.substr(i, 2), 16))
        }
        // --
        let code = String.fromCharCode.apply(String, bytes)
        code = atob(code)
        // -- 
        return code
    }


    /**
     * Encrypt code in hexadecimal and base64
     * @param {*} string 
     */
    encrypt_hex64JS(string) {
        // --
        let i = 0
        let l = string.length
        let chr
        let hex = ''
        // --
        for (i; i < l; i++) {
            // --
            chr = string.charCodeAt(i).toString(16)
            hex += chr.length < 2 ? '0' + chr : chr
        }
        // --
        let code = btoa(hex)
        // --
        return code
    }

    /**
     * @param {any} filename
     */
    getFileExtension(filename) {
        return filename.slice((filename.lastIndexOf(".") - 1 >>> 0) + 2);
    }


    /**
     * @param {any} fecha
     */
    calcularEdad(fecha) {
        var hoy = new Date();
        var cumpleanos = new Date(fecha);
        var edad = hoy.getFullYear() - cumpleanos.getFullYear();
        var m = hoy.getMonth() - cumpleanos.getMonth();

        if (m < 0 || (m === 0 && hoy.getDate() <= cumpleanos.getDate())) {
            edad--;
        }

        return edad;
    }

    validateFileSize(file) {
        // --
        const byte = 1048576 // -- 1 MB	-> 1048576 B
        const maxSize = 20 // -- 20 Megabytes
        // --
        if ((file.size / byte) <= maxSize) {
            return true
        } else {
            return false
        }
    }

    /**
     * @param {any} cookie
     */
    readCookie(cookie) {
        // --
        return decodeURIComponent(document.cookie.replace(new RegExp("(?:(?:^|.*;)\\s*" + cookie.replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=\\s*([^;]*).*$)|^.*$"), "$1")) || null;

    }

}