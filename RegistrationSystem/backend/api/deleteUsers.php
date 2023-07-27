<?php
// backend/api/delete_users.php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

// Verifica o método da requisição
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Recebe os IDs dos usuários a serem excluídos do frontend
    $data = json_decode(file_get_contents("php://input"), true);

    // Verifica se foram enviados IDs válidos
    if (empty($data['ids']) || !is_array($data['ids'])) {
        http_response_code(400);
        echo json_encode(array("message" => "IDs inválidos"));
        exit;
    }

    // Realiza a exclusão dos usuários no banco de dados
    require_once "../vendor/autoload.php";
    $productionDAO = new \App\Model\ProductionDAO();
    foreach ($data['ids'] as $id) {
        $productionDAO->delete($id);
    }

    // Retorna uma mensagem de sucesso
    http_response_code(200);
    echo json_encode(array("message" => "Usuários removidos com sucesso"));
    exit;
} else {
    http_response_code(405); // Método não permitido
    echo json_encode(array("message" => "Método não permitido"));
    exit;
}