import React from "react";
import { Link, useLocation } from "react-router-dom";
import { ShoppingCart } from "phosphor-react";
import "./navbar.css";

export const Navbar = () => {
  const location = useLocation();
  const userName = localStorage.getItem("username");
  return (
    <div className="navbar">
      <div className="logo">
        <Link to="/" id="NavTitle">
          Tech Shop
        </Link>
      </div>
      <div className="links">
        <Link to="/" className={location.pathname === "/" ? "active-link" : ""}>
          Shop
        </Link>

        <Link to="/cart" id="cartlink" className={location.pathname === "/cart" ? "active-link" : ""}>
          <ShoppingCart size={32} />
        </Link>
        <Link to="/login"  className={location.pathname === "/login" ? "active-link" : ""}>
            {(userName)?userName:"Login"}
        </Link>
      </div>
    </div>
  );
};
