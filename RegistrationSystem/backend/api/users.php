<?php
// backend/api/users.php

require_once "../vendor/autoload.php";
$productionDAO = new \App\Model\ProductionDAO();

// Verifica o método da requisição
$method = $_SERVER['REQUEST_METHOD'];

// Se a requisição for do tipo OPTIONS, retorne com status 200 (OK) para indicar que o método é permitido
if ($method === 'OPTIONS') {
    header("Access-Control-Allow-Origin: http://localhost:5173");
    header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type");
    header("Access-Control-Max-Age: 86400");
    http_response_code(204);
    exit;
}

header("Access-Control-Allow-Origin: http://localhost:5173");
header("Content-Type: application/json");

require_once "../vendor/autoload.php";
$productionDAO = new \App\Model\ProductionDAO();

// Verifica o método da requisição
if ($method === 'GET') {
    // Recupera a lista de usuários do banco de dados
    $users = $productionDAO->read();

    // Retorna os usuários como JSON
    echo json_encode($users);
} elseif ($method === 'POST') {
    // Recebe os dados do frontend para inserção de novo usuário
    $data = json_decode(file_get_contents("php://input"), true);

    // Verifica se todos os campos obrigatórios foram preenchidos antes de inserir no banco
    if (empty($data['nome']) || empty($data['sobrenome']) || empty($data['email']) || empty($data['cpf']) || empty($data['dataNascimento']) || empty($data['genero'])) {
        // Retorna um erro informando que todos os campos são obrigatórios
        http_response_code(400);
        echo json_encode(array("message" => "Todos os campos são obrigatórios"));
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
    exit;
} elseif ($method === 'DELETE') {
    // Recebe o ID do usuário a ser removido
    $id = $_GET['id'];

    // Verifica se o ID é válido (não vazio e numérico)
    if (empty($id) || !is_numeric($id)) {
        http_response_code(400);
        echo json_encode(array("message" => "ID inválido"));
        exit;
    }

    // Remove o usuário do banco de dados
    $productionDAO->delete($id);

    // Retorna uma mensagem de sucesso
    http_response_code(200);
    echo json_encode(array("message" => "Usuário removido com sucesso"));
    exit;
}

?>