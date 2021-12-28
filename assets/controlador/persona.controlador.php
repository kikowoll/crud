<?php
require "CORS.php";

include "../modelo/persona.modelo.php";

if($_POST) {
    $persona = new Persona();

    switch($_POST['accion']) {
        case "CONSULTAR":
            echo json_encode($persona->Consultar());
            break;
        case "CONSULTAR_ID":
            echo json_encode($persona->ConsultarPorId($_POST['idPersona']));
            break;
        case "GUARDAR":
            $nombre = $_POST['nombre'];
            $apellidos = $_POST['apellidos'];
            $nacimiento = $_POST['nacimiento'];
            $direcion = $_POST['direcion'];
            $telefono = $_POST['telefono'];

            if($nombre == "") {
                echo json_encode('El campo NOMBRE esta vacio');
                return;
            }

            if($apellidos == "") {
                echo json_encode('El campo APELLIDOS esta vacio');
                return;
            }

            if($telefono == "") {
                echo json_encode('El campo TELEFONO esta vacio');
                return;
            }

            $respuesta = $persona->Guardar($nombre,$apellidos,$nacimiento,$direcion,$telefono);
            echo json_encode($respuesta);
            break;
        case "MODIFICAR":
            $idPersona = $_POST['idPersona'];
            $nombre = $_POST['nombre'];
            $apellidos = $_POST['apellidos'];
            $nacimiento = $_POST['nacimiento'];
            $direcion = $_POST['direcion'];
            $telefono = $_POST['telefono'];
            $respuesta = $persona->Modificar($idPersona,$nombre,$apellidos,$nacimiento,$direcion,$telefono);
            echo json_encode($respuesta);
            break;
        case "ELIMINAR":
            $idPersona = $_POST['idPersona'];
            $respuesta = $persona->Eliminar($idPersona);
            echo json_encode($respuesta);
            break;
    }
}