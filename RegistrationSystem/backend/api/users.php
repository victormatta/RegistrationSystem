<?php
// backend/api/users.php

require_once "../vendor/autoload.php";


$production = new \App\Model\Production();
$production->setNome("Shockz");
$production->setSobrenome("Fornite");
$production->setCpf("23456787645");
$production->setEmail("shockz@fn.com");
$production->setDataNascimento("2000-10-12");
$production->setGenero("Masculino");




$productionDAO = new \App\Model\ProductionDAO();
// $productionDAO->create($production);
$users = $productionDAO->read();
// $productionDAO->delete(32);

header("Content-Type: application/json");
echo json_encode($users);
?>