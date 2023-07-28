import React from "react";
import { Link } from "react-router-dom";
import ip4y from "../../assets/ip4y.png";
import "./NavBar.css";

function NavBar() {
  return (
    <div className="NavBar">
      <div className="logo">
        <a href="https://www.ip4y.com.br" target="_blank">
          <img src={ip4y} alt="Logo IP4Y" />
        </a>
      </div>
      <div className="formTittle">
        <h1>Formulário de Cadastro</h1>
      </div>
      <div>
        <Link to="/users" className="buttonUser">
          Acessar Usuários
        </Link>
      </div>
    </div>
  );
}

export default NavBar;
