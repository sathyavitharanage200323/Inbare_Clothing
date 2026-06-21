function Navbar() {
  return (
    <header className="navbar">
      <div className="logo">INBARE</div>

      <nav>
        <a href="/">Home</a>
        <a href="/shop">Shop</a>
        <a href="/collections">Collections</a>
        <a href="/about">About</a>
      </nav>

      <button className="cart-btn">Cart (0)</button>
    </header>
  );
}

export default Navbar;
