import "./Header.css"

const Header=({ proShop, notify })=>{
  return(
    <header className="navbar">
      <h3 className="navbar-logo">Store</h3>
      <nav className="navbar-nav">
        <ul className="navbar-items">
          <li className="navbar-item"><a href="/" className="navbar-link">Acceuil</a></li>
          <li className="navbar-item"><a href="/products" className="navbar-link">Products</a></li>
          <li className="navbar-item craft"><a href="/craft" className="navbar-link">Craft</a><span className={proShop.length===0?"desible-notify":"notify"}>{notify.length}</span></li>
        </ul>
      </nav>
    </header>
  )
}
export default Header;
