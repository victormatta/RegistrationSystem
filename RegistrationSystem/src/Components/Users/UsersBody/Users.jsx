import React, { useEffect, useState } from "react";
import "./UsersBody.css";

function Users() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch(
      "http://localhost/RegistrationSystem/RegistrationSystem/backend/api/users.php"
    )
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((error) => console.error("Erro ao buscar usuários: ", error));
  }, []);

  return (
    <div className="userRegister">
      <h2>Lista de Usuários:</h2>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            <div>
              {user.nome} {user.sobrenome}
            </div>
            <div>Email: {user.email}</div>
            <div>CPF: {user.cpf}</div>
            <div>Gênero: {user.genero}</div>
            <div>Data de Nascimento: {user.dataNascimento}</div>
            {/* Adicione aqui outros campos que você queira mostrar */}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Users;
