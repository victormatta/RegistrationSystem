import "./FormularioCadastro.css";
import React, { useState } from "react";

const FormularioCadastro = () => {
  const [formData, setFormData] = useState({
    nome: "",
    sobrenome: "",
    email: "",
    cpf: "",
    dataNascimento: "",
    genero: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === "cpf" && value.length > 11) {
      setFormData({ ...formData, [name]: value.slice(0, 11) });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleDateChange = (event) => {
    // Obtém o valor da data no formato "DD-MM-YYYY"
    const { value } = event.target;

    // Ajusta o formato da data para "YYYY-MM-DD"
    const [day, month, year] = value.split("-");
    const dataNascimento = `${year}-${month}-${day}`;

    // Atualiza o estado do formData com a data no formato correto
    setFormData({ ...formData, dataNascimento });
  };

  const checkCpfExists = async (cpf) => {
    try {
      const response = await fetch(
        `http://localhost/RegistrationSystem/RegistrationSystem/backend/api/checkCpf.php?cpf=${cpf}`
      );
      const data = await response.json();
      return data.exists;
    } catch (error) {
      console.error("Erro ao verificar CPF: ", error);
      throw new Error("Erro ao verificar CPF. Tente novamente.");
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Verifica se todos os campos foram preenchidos antes de enviar o formulário
    for (const value of Object.values(formData)) {
      if (value === "") {
        console.error("Preencha todos os campos antes de enviar o formulário.");
        return;
      }
    }

    // Faz a requisição para o backend usando o método POST
    fetch(
      "http://localhost/RegistrationSystem/RegistrationSystem/backend/api/users.php",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      }
    )
      .then((response) => {
        // Verifica se a resposta da API foi bem-sucedida
        if (!response.ok) {
          throw new Error(
            "Erro ao enviar os dados. Verifique os campos do formulário."
          );
        }
        return response.json();
      })
      .then((data) => {
        // Aqui você pode lidar com a resposta da API, se necessário
        console.log("Dados enviados com sucesso:", data);

        // Exibe uma mensagem de sucesso para o usuário
        alert("Dados enviados com sucesso!");
        setSubmitted(true);
      })
      .catch((error) => {
        console.error("Erro ao enviar os dados: ", error);
        alert(
          "Ocorreu um erro ao enviar os dados. Verifique os campos do formulário e tente novamente."
        );
      });
  };

  const handleReset = () => {
    setFormData({
      nome: "",
      sobrenome: "",
      email: "",
      cpf: "",
      dataNascimento: "",
      genero: "",
    });
    setSubmitted(false);
  };

  return (
    <div className="paper">
      <div className="form">
        <form onSubmit={handleSubmit}>
          <div className="text">
            <label htmlFor="nome">Nome:</label>
            <input
              type="text"
              id="nome"
              name="nome"
              value={formData.nome}
              onChange={handleChange}
              placeholder="Digite seu nome"
              required
            />
          </div>

          <div className="text">
            <label htmlFor="sobrenome">Sobrenome:</label>
            <input
              type="text"
              id="sobrenome"
              name="sobrenome"
              value={formData.sobrenome}
              onChange={handleChange}
              placeholder="Digite seu sobrenome"
              required
            />
          </div>

          <div className="text">
            <label htmlFor="email">E-mail:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Digite seu E-mail"
              required
            />
          </div>

          <div className="text">
            <label htmlFor="cpf">CPF:</label>
            <input
              type="text"
              id="cpf"
              name="cpf"
              value={formData.cpf}
              onChange={handleChange}
              placeholder="Digite seu CPF"
              required
            />
          </div>

          <div className="data">
            <label htmlFor="dataNascimento">Data de Nascimento:</label>
            <input
              type="date"
              id="dataNascimento"
              name="dataNascimento"
              value={formData.dataNascimento}
              onChange={handleChange}
              required
            />
          </div>

          <label className="labelG">Gênero:</label>
          <div className="generoFMO">
            <input
              type="radio"
              id="generoMasculino"
              name="genero"
              value="Masculino"
              checked={formData.genero === "Masculino"}
              onChange={handleChange}
              required
            />
            <label htmlFor="generoMasculino">Masculino</label>
            <input
              type="radio"
              id="generoFeminino"
              name="genero"
              value="Feminino"
              checked={formData.genero === "Feminino"}
              onChange={handleChange}
              required
            />
            <label htmlFor="generoFeminino">Feminino</label>
            <input
              type="radio"
              id="generoOutro"
              name="genero"
              value="Outro"
              checked={formData.genero === "Outro"}
              onChange={handleChange}
              required
            />
            <label htmlFor="generoOutro">Outro</label>
          </div>

          <div className="buttonForm">
            <button type="submit">Inserir</button>
            <button type="button" onClick={handleReset}>
              Recomeçar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormularioCadastro;
