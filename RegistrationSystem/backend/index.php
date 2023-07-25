<?php

require_once "./vendor/autoload.php";

$production = new \App\Model\Production();
$production->setCpf("333.777.888.25");
$production->setNome("Teste");
$production->setSobrenome("API");
$production->setDataNascimento("1980-08-20");
$production->setEmail("Teste@Api.com");
$production->setGenero("Masculino");
// $production->setId(3);



$productionDAO = new \App\Model\ProductionDAO();

// $productionDAO->create($production);
// $productionDAO->read();
// $productionDAO->update($production);
// $productionDAO->delete(16);

// foreach ($productionDAO->read() as $production):
//     echo $production["nome"] . " ";
//     echo $production["sobrenome"] . "<br>";
//     echo $production["email"] . "<br>";
//     echo $production["dataNascimento"] . "<br>";
//     echo $production["genero"] . "<br>";
//     echo $production["cpf"] . "<br>" . "<hr>";
// endforeach;

?>