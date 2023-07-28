import "../../NavBar/NavBar.css";
import ip4y from "../../../assets/ip4y.png";
import { Link } from "react-router-dom";

function UsersNavBar() {
  return (
    <div className="NavBar">
      <div className="logo">
        <img src={ip4y} alt="Logo IP4Y" />
      </div>
      <div className="formTittle">
        <h1>Formulário de Cadastro</h1>
      </div>
      <div>
        <Link to="/" className="buttonUser">
          Acessar Formulário
        </Link>
      </div>
    </div>
  );
}

export default UsersNavBar;
