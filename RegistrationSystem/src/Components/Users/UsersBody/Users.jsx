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

  return (
    <div className="userBody">
      <h2>Lista de Usuários:</h2>
      <div className="userGrid">
        {users.map((user) => (
          <div key={user.id} className="userCard">
            <div>
              {user.nome} {user.sobrenome}
            </div>
            <div>Email: {user.email}</div>
            <div>CPF: {user.cpf}</div>
            <div>Gênero: {user.genero}</div>
            <div>Data de Nascimento: {user.dataNascimento}</div>
            {/* Adicione aqui outros campos que você queira mostrar */}
            <button onClick={() => handleDelete(user.id)}>Excluir</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Users;

// import React, { useEffect, useState } from "react";
// import "./UsersBody.css";

// function Users() {
//   const [users, setUsers] = useState([]);
//   const [usersToDelete, setUsersToDelete] = useState([]);

//   useEffect(() => {
//     fetch(
//       "http://localhost/RegistrationSystem/RegistrationSystem/backend/api/users.php"
//     )
//       .then((response) => {
//         if (!response.ok) {
//           throw new Error("Erro ao buscar usuários.");
//         }
//         return response.json();
//       })
//       .then((data) => setUsers(data))
//       .catch((error) => console.error("Erro ao buscar usuários: ", error));
//   }, []);

//   const handleDelete = (id) => {
//     // Adiciona o ID do usuário à lista de usuários a serem excluídos
//     setUsersToDelete((prevUsersToDelete) => [...prevUsersToDelete, id]);
//   };

//   const handleSaveChanges = () => {
//     // Faz a requisição para o backend com os IDs dos usuários a serem excluídos
//     fetch(
//       "http://localhost/RegistrationSystem/RegistrationSystem/backend/api/delete_users.php",
//       {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ ids: usersToDelete }),
//       }
//     )
//       .then((response) => {
//         if (!response.ok) {
//           throw new Error("Erro ao excluir usuários.");
//         }
//         return response.json();
//       })
//       .then((data) => {
//         console.log(data);
//         // Atualiza a lista de usuários no estado após a exclusão bem-sucedida
//         setUsers((prevUsers) =>
//           prevUsers.filter((user) => !usersToDelete.includes(user.id))
//         );
//         // Limpa a lista de usuários a serem excluídos
//         setUsersToDelete([]);
//       })
//       .catch((error) => {
//         console.error("Erro ao excluir usuários:", error);
//       });
//   };

//   return (
//     <div className="userBody">
//       <h2>Lista de Usuários:</h2>
//       <div className="userGrid">
//         {users.map((user) => (
//           <div key={user.id} className="userCard">
//             <div>
//               {user.nome} {user.sobrenome}
//             </div>
//             <div>Email: {user.email}</div>
//             <div>CPF: {user.cpf}</div>
//             <div>Gênero: {user.genero}</div>
//             <div>Data de Nascimento: {user.dataNascimento}</div>
//             {/* Adicione aqui outros campos que você queira mostrar */}
//             <button onClick={() => handleDelete(user.id)}>Excluir</button>
//           </div>
//         ))}
//       </div>
//       <button onClick={handleSaveChanges}>Salvar Alterações</button>
//     </div>
//   );
// }

// export default Users;
