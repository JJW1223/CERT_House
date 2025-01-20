// imports/ui/Navbar.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; // CSS 파일 import

const Navbar = () => {
  return (
    <nav>
      <Link to="/" className="cert">CERT</Link>
      <ul>
        <li className="notices"><Link to="/notices">Notices</Link></li>
        <li className="login-signup">
          <Link to="/login">Login</Link>
          <Link to="/signup">Signup</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
