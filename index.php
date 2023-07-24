<?php

require_once "./vendor/autoload.php";

$production = new \App\Model\Production();
$production->setCpf("748.478.167.25");
$production->setNome("Barbie");
$production->setSobrenome("Girl");
$production->setDataNascimento("1950-07-22");
$production->setEmail("barbie@girl.com");
$production->setGenero("Feminino");
// $production->setId(3);



$productionDAO = new \App\Model\ProductionDAO();

// $productionDAO->create($production);
$productionDAO->read();
// $productionDAO->update($production);
$productionDAO->delete(5);

foreach ($productionDAO->read() as $production):
    echo $production["nome"] . " ";
    echo $production["sobrenome"] . "<br>";
    echo $production["email"] . "<br>";
    echo $production["dataNascimento"] . "<br>";
    echo $production["genero"] . "<br>";
    echo $production["cpf"] . "<br>" . "<hr>";
endforeach;


?>