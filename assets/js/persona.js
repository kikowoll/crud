var urls = "http://localhost/apps/crud/assets/controlador/persona.controlador.php"

function Consultar() {
    $.ajax({
        url: urls,
        type: 'post',
        dataType: 'JSON',
        data: {
            accion: 'CONSULTAR'
        }
    }).done(function(response) {
        var html = ''
        $.each(response, function (index, data) {
            html += '<tr>' 
            html += '<td>'+ data.nombre +'</td>'
            html += '<td>'+ data.apellidos +'</td>'
            html += '<td>'+ data.nacimiento +'</td>'
            html += '<td>'+ data.direcion +'</td>'
            html += '<td>'+ data.telefono +'</td>'
            html += '<td>'
            html += '<div class="btn-group" role="group" aria-label="Basic example"><button type="button" class="btn bg-secondary text-white" onclick="ConsultarPorId('+ data.id +')"><i class="fa fa-pencil"></i></button>'
            html += '<button class="btn btn-danger" onclick="Eliminar('+ data.id +')"><i class="fa fa-trash"></i></button></div>'
            html += '</td>'
            html += '</tr>'
        })
        $('#datos').html(html)
        limpiar()
    }).fail(err => {
        console.log('Error al mostrar ' + err.message + '' + err);
    })
}

function ConsultarPorId(idPersona) {
    $.ajax ({
        url: urls,
        data: {
            idPersona: idPersona, 
            accion: 'CONSULTAR_ID'
        },
        type: 'post',
        dataType: 'JSON'
    }).done(response => {
        document.getElementById('nombre').value = response.nombre;
        document.getElementById('apellidos').value = response.apellidos;
        document.getElementById('nacimiento').value = response.nacimiento;
        document.getElementById('direcion').value = response.direcion;
        document.getElementById('telefono').value = response.telefono;
        document.getElementById('idPersona').value = response.id;
        bloquearBotones(false);
    }).fail(err => {
        console.log('Error al mostrar con id  ' + err.message);
    })
}

function Guardar() {
    $.ajax ({
        url: urls,
        data: {
            nombre: document.getElementById('nombre').value,
            apellidos: document.getElementById('apellidos').value,
            nacimiento: document.getElementById('nacimiento').value,
            direcion: document.getElementById('direcion').value,
            telefono: document.getElementById('telefono').value,
            accion: 'GUARDAR'
        },
        type: 'post',
        dataType: 'JSON'
    }).done( response => {
        if(response == 'OK') {
            mostrarAlerta("EXITO!", "Datos guardados correctamente.", "success")
            Consultar()
        } else {
            mostrarAlerta("ERROR!", "Error al guardar datos.", "error")
        }
    }).fail(err => {
        console.log('Error al Guardar' + err.message);
    })
}

function Modificar() {
    $.ajax ({
        url: urls,
        data: {
            nombre: document.getElementById('nombre').value,
            apellidos: document.getElementById('apellidos').value,
            nacimiento: document.getElementById('nacimiento').value,
            direcion: document.getElementById('direcion').value,
            telefono: document.getElementById('telefono').value,
            accion: 'MODIFICAR',
            idPersona: document.getElementById('idPersona').value
        },
        type: 'post',
        dataType: 'json'
    }).done(response => {
        console.log(response);
        if(response == 'OK') {
            mostrarAlerta("EXITO!", "Datos modificados correctamente.", "success")
            Consultar()
        } else {
            mostrarAlerta("Error!", "Error al guardar los datos.", "error")
        }
    }).fail(err => {
        console.log('Error al modificar' + err.message);
    })
}

function Eliminar(idPersona) {
    $.ajax ({
        url: urls,
        data: {accion: 'ELIMINAR', idPersona: idPersona},
        type: 'POST',
        dataType: 'json'
    }).done(response => {
        if(response == 'OK') {
            mostrarAlerta("EXITO!", "Datos borrados correctamente.", "success")
            Consultar()
        } else {      
            mostrarAlerta("Error!", "Error al eliminar los datos", "error")
        }
    }).fail(err => {
        console.log('Error al eliminar' + err.message);
    })
}

function validar() {
    nombre = $('#nombre').val();
    apellidos = $('#apellidos').val();
    nacimiento = $('#nacimiento').val();
    direcion = $('#direcion').val();
    telefono = $('#telefono').val();

    if(nombre == "" || apellidos == "" || telefono == "") {
        return false;
    }
    return true;
}

function limpiar() {
    document.getElementById('nombre').value = ""
    document.getElementById('apellidos').value = ""
    document.getElementById('nacimiento').value = ""
    document.getElementById('direcion').value = ""
    document.getElementById('telefono').value = ""
    bloquearBotones(true)
}

function bloquearBotones(guardar) {
    if(guardar) {
        document.getElementById('btn-guardar').disabled = false
        document.getElementById('btn-modificar').disabled = true
    } else {
        document.getElementById('btn-guardar').disabled = true
        document.getElementById('btn-modificar').disabled = false
    }
}

function mostrarAlerta(titulo, descripcion, tipoAlerta) {
    Swal.fire(
        titulo,
        descripcion,
        tipoAlerta
      )
}

Consultar()