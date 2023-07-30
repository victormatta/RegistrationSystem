import "../../NavBar/NavBar.css";
import { Link } from "react-router-dom";

function UsersNavBar() {
  return (
    <div className="NavBar">
      <div className="formTittle">
        <h1>Lista de Usuários</h1>
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
