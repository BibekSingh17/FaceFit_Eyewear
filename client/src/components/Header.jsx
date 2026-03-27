import "../styles/header.scss";
import { useNavigate } from "react-router";



const Header = () => {

  const navigate = useNavigate();
  return (
    <header className="header">
      <div className="header-brand">
        <h1 className="header-title">
          FaceFit <span className="header-highlight">Eyewear</span>
        </h1>
      </div>

      <nav className="header-nav">
        <a onClick={() => navigate("/")}>Home</a>
        <a onClick={() => navigate("/tryon")}>VirtualTryOn</a>
        <a href="#">Recommendation</a>
      </nav>

      <div className="header-login">
        <button className="btn-login" onClick={() => navigate("/login")}>Login</button>
      </div>
    </header>
  );
};

export default Header;