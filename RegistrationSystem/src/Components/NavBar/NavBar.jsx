import "./NavBar.css";
import ip4y from "../../assets/ip4y.png";

function NavBar() {
  return (
    <div className="NavBar">
      <div className="logo">
        <img src={ip4y} alt="Logo IP4Y" />
      </div>
      <div className="formTittle">
        <h1>Formulário de Cadastro</h1>
      </div>
      <div>
        <button className="buttonUser">Acessar Usuários</button>
      </div>
    </div>
  );
}

export default NavBar;
