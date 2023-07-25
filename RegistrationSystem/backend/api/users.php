<?php
// backend/api/users.php

require_once "../vendor/autoload.php";

$productionDAO = new \App\Model\ProductionDAO();

// Verifica o método da requisição
$method = $_SERVER['REQUEST_METHOD'];

// Verifica se é uma requisição POST (para inserção de novo usuário)
if ($method === 'POST') {
    // Recebe os dados do frontend
    $data = json_decode(file_get_contents("php://input"), true);

    // Verifica se todos os campos foram preenchidos antes de inserir no banco
    if (empty($data['nome']) || empty($data['sobrenome']) || empty($data['email']) || empty($data['cpf']) || empty($data['dataNascimento']) || empty($data['genero'])) {
        // Retorna um erro informando que todos os campos são obrigatórios
        http_response_code(400);
        echo json_encode(array("message" => "Todos os campos são obrigatórios"));
        exit;
    }

    // Verifica se o CPF já existe no banco
    if ($productionDAO->cpfExists($data['cpf'])) {
        // Retorna um erro ou mensagem indicando que o CPF já está cadastrado
        http_response_code(400);
        echo json_encode(array("message" => "CPF já cadastrado"));
        exit;
    }

    // Insere o novo registro no banco
    $production = new \App\Model\Production();
    $production->setCpf($data['cpf']);
    $production->setNome($data['nome']);
    $production->setSobrenome($data['sobrenome']);
    $production->setDataNascimento($data['dataNascimento']);
    $production->setEmail($data['email']);
    $production->setGenero($data['genero']);

    $productionDAO->create($production);

    // Retorna uma mensagem de sucesso
    http_response_code(200);
    echo json_encode(array("message" => "Usuário cadastrado com sucesso"));
} else {
    // Retorna os dados existentes
    $users = $productionDAO->read();
    header("Content-Type: application/json");
    echo json_encode($users);
}