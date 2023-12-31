<?php

namespace App\Model;

class ProductionDAO
{
    public function create(Production $p)
    {
        $cpf = $p->getCpf();

        if ($this->cpfExists($cpf)) {
            throw new \Exception("CPF já cadastrado no sistema.");
        }


        $sql = "INSERT INTO register (cpf, nome, sobrenome, dataNascimento, email, genero) VALUES (?,?,?,?,?,?)";

        $stmt = Connection::getConn()->prepare($sql);
        $stmt->bindValue(1, $p->getCpf());
        $stmt->bindValue(2, $p->getNome());
        $stmt->bindValue(3, $p->getSobrenome());
        $stmt->bindValue(4, $p->getDataNascimento());
        $stmt->bindValue(5, $p->getEmail());
        $stmt->bindValue(6, $p->getGenero());

        $stmt->execute();
    }

    public function read()
    {
        $sql = "SELECT * FROM register";

        $stmt = Connection::getConn()->prepare($sql);
        $stmt->execute();

        if ($stmt->rowCount() > 0):
            $result = $stmt->fetchAll(\PDO::FETCH_ASSOC);
            return $result;
        else:
            return [];
        endif;
    }

    public function update(Production $p)
    {
        $sql = "UPDATE register SET cpf =?, nome=?, sobrenome=?, dataNascimento=?, email=?, genero=? WHERE id = ?";

        $stmt = Connection::getConn()->prepare($sql);
        $stmt->bindValue(1, $p->getCpf());
        $stmt->bindValue(2, $p->getNome());
        $stmt->bindValue(3, $p->getSobrenome());
        $stmt->bindValue(4, $p->getDataNascimento());
        $stmt->bindValue(5, $p->getEmail());
        $stmt->bindValue(6, $p->getGenero());
        $stmt->bindValue(7, $p->getId());

        $stmt->execute();
    }

    public function delete($id)
    {
        $sql = "DELETE FROM register WHERE id = ?";

        $stmt = Connection::getConn()->prepare($sql);
        $stmt->bindValue(1, $id);

        $stmt->execute();
    }

    public function cpfExists($cpf, $id = null)
    {
        $sql = "SELECT COUNT(*) AS count FROM register WHERE cpf = ? AND id != ?";
        $stmt = Connection::getConn()->prepare($sql);
        $stmt->bindValue(1, $cpf);
        $stmt->bindValue(2, $id, \PDO::PARAM_INT);
        $stmt->execute();

        $result = $stmt->fetch(\PDO::FETCH_ASSOC);
        return $result["count"] > 0;
    }
}
?>