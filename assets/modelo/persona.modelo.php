<?php

require "conexion.php";

class Persona {

    public function Consultar() {
        $conexion = new Conexion();
        $stmt = $conexion->prepare("SELECT * FROM personas");
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_OBJ);
    }

    public function ConsultarPorId($idPersona) {
        $conexion = new Conexion();
        $stmt = $conexion->prepare("SELECT * FROM personas WHERE id = $idPersona");
        $stmt->bindValue(":idPersona", $idPersona, PDO::PARAM_INT);
        $stmt->execute();
        return $stmt->fetch(PDO::FETCH_OBJ);
    }

    public function Guardar($nombre, $apellidos, $nacimiento, $direcion, $telefono) {
        $conexion = new Conexion();
        $stmt = $conexion->prepare("INSERT INTO personas (nombre, apellidos, nacimiento, direcion, telefono) VALUES (:nombre, :apellidos, :nacimiento, :direcion, :telefono)");

        $stmt->bindValue(":nombre", $nombre, PDO::PARAM_STR);
        $stmt->bindValue(":apellidos", $apellidos, PDO::PARAM_STR);
        $stmt->bindValue(":nacimiento", $nacimiento, PDO::PARAM_STR);
        $stmt->bindValue(":direcion", $direcion, PDO::PARAM_STR);
        $stmt->bindValue(":telefono", $telefono, PDO::PARAM_STR);

        if($stmt->execute()) {
            return 'OK';
        } else {
            return 'Error al guardar';
        }
    }

    public function Modificar($idPersona, $nombre, $apellidos, $nacimiento, $direcion, $telefono) {
        $conexion = new Conexion();
        $stmt = $conexion->prepare("UPDATE personas SET nombre=:nombre, apellidos= :apellidos, nacimiento=:nacimiento, direcion=:direcion, telefono=:telefono WHERE id = :idPersona");

        $stmt->bindValue(":nombre", $nombre, PDO::PARAM_STR);
        $stmt->bindValue(":apellidos", $apellidos, PDO::PARAM_STR);
        $stmt->bindValue(":nacimiento", $nacimiento, PDO::PARAM_STR);
        $stmt->bindValue(":direcion", $direcion, PDO::PARAM_STR);
        $stmt->bindValue(":telefono", $telefono, PDO::PARAM_STR);
        $stmt->bindValue(":idPersona", $idPersona, PDO::PARAM_INT);

        if($stmt->execute()) {
            return 'OK';
        } else {
            return 'Error al modificar';
        }
    }

    public function Eliminar($idPersona) {
        $conexion = new Conexion();
        $stmt = $conexion->prepare("DELETE FROM personas WHERE id = :idPersona");

        $stmt->bindValue(":idPersona", $idPersona, PDO::PARAM_INT);

        if($stmt->execute()) {
            return 'OK';
        } else {
            return 'Error al eliminar';
        }
    }
}