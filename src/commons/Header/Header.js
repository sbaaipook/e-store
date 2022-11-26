import "./Header.css"
import { Link } from "react-router-dom";
const Header=({ proShop, notify })=>{
  return(
    <header className="navbar">
      <h3 className="navbar-logo">Store</h3>
      <nav className="navbar-nav">
        <ul className="navbar-items">
          <li className="navbar-item"><Link to="/" className="navbar-link">Home</Link></li>
          <li className="navbar-item"><Link to="/products" className="navbar-link">Products</Link></li>
          <li className="navbar-item craft"><Link to={notify.length!==0?"/cart":"/"} className="navbar-link">Cart</Link><span className={proShop.length===0?"desible-notify":"notify"}>{notify.length}</span></li>
        </ul>
      </nav>
    </header>
  )
}
export default Header;
