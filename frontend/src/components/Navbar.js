import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="container">
        <div className="navbar-content">
          <Link to="/" className="navbar-brand">
            🛒 PepeStore
          </Link>
          <div className="navbar-links">
            <Link to="/" className="navbar-link">
              Inicio
            </Link>
            <Link to="/cart" className="navbar-link">
              Carrito
            </Link>
            <Link to="/admin/products" className="navbar-link">
              Admin
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

