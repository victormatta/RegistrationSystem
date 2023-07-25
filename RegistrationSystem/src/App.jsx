import "./App.css";
import React, { useState, useEffect } from "react";

function App() {
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
            {user.nome} {user.sobrenome}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
