import React, { useEffect, useState } from "react";
import "./UsersBody.css";

function Users() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch(
      "http://localhost/RegistrationSystem/RegistrationSystem/backend/api/users.php"
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erro ao buscar usuários.");
        }
        return response.json();
      })
      .then((data) => setUsers(data))
      .catch((error) => console.error("Erro ao buscar usuários: ", error));
  }, []);

  const handleDelete = (id) => {
    fetch(
      `http://localhost/RegistrationSystem/RegistrationSystem/backend/api/users.php?id=${id}`,
      {
        method: "DELETE",
      }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erro ao excluir usuário.");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        // Atualize a lista de usuários após a exclusão bem-sucedida
        setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
      })
      .catch((error) => {
        console.error("Erro ao excluir usuário:", error);
      });
  };

  const sendAllUsersData = () => {
    try {
      // Cria um objeto JSON contendo todos os dados dos usuários
      const allUsersData = JSON.stringify(users);

      // Faz a requisição para a API usando o método POST
      fetch("https://api-teste.ip4y.com.br/cadastro", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: allUsersData,
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Erro ao enviar dados para a API.");
          }
          return response.json();
        })
        .then((data) => {
          console.log("Dados enviados com sucesso para a API:", data);
          // Aqui você pode lidar com a resposta da API, se necessário
          alert("Dados enviados com sucesso para a API!");
        })
        .catch((error) => {
          console.error("Erro ao enviar dados para a API: ", error);
          alert(
            "Ocorreu um erro ao enviar os dados para a API. Tente novamente."
          );
        });
    } catch (error) {
      console.error("Erro ao criar JSON de dados dos usuários: ", error);
      alert("Ocorreu um erro ao criar JSON de dados dos usuários.");
    }
  };

  return (
    <div className="userBody">
      <h2>Lista de Usuários:</h2>
      <div className="userGrid">
        {users.map((user) => (
          <div key={user.id} className="userCard">
            <div>
              <h3>
                {user.nome} {user.sobrenome}
              </h3>
            </div>
            <div>
              <strong>Email:</strong> <em>{user.email}</em>
            </div>
            <div>
              <strong>CPF:</strong> <em>{user.cpf}</em>
            </div>
            <div>
              <strong>Gênero:</strong> <em>{user.genero}</em>
            </div>
            <div>
              <strong>Data de Nascimento:</strong>{" "}
              <em>{user.dataNascimento}</em>
            </div>
            <div className="spaceButton">
              <button
                className="userButton"
                onClick={() => handleDelete(user.id)}
              >
                Excluir
              </button>
            </div>
          </div>
        ))}
      </div>
      <div>
        <button className="sendButtonContainer" onClick={sendAllUsersData}>
          Enviar Todos os Usuários para API
        </button>
      </div>
    </div>
  );
}

export default Users;
