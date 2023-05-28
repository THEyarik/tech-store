import React from "react";
import { Link, useLocation } from "react-router-dom";
import { ShoppingCart } from "phosphor-react";
import "./navbar.css";

export const Navbar = ({getShowModalState,role}) => {
  const location = useLocation();
  const userInfo =JSON.parse(localStorage.getItem("userInfo")) ;


  const checkIsLogin = (e) =>{
      if(userInfo === null){
          getShowModalState(true);
      }
  }

  return (
    <div className="navbar">
      <div className="logo">
        <Link to="/" id="NavTitle">
          Tech Shop
        </Link>
      </div>
      <div className="links">
        <Link to="/" >
          Shop
        </Link>
          {(role !== "admin")?
              <Link to={(userInfo === null)?'#':'/cart'} id="cartlink" onClick={checkIsLogin}>
                  <ShoppingCart size={32}  />
              </Link> : ""
          }
          {(userInfo)?
        <Link to="/client" >
                <div>
                    <div className="personal__office">
                        <p className="personal__office__name">
                            {userInfo.username}
                        </p>
                        <svg
                            className="personal__office__icon"
                            xmlns="http://www.w3.org/2000/svg"
                            width="40"
                            height="40"
                            viewBox="0 0 32 32"
                            fill="#FFFFFF"
                        >
                            <path d="M16 15.503A5.041 5.041 0 1016 5.42a5.041 5.041 0 000 10.083zm0 2.215c-6.703 0-11 3.699-11 5.5v3.363h22v-3.363c0-2.178-4.068-5.5-11-5.5z"></path>
                        </svg>
                    </div>

                </div>

        </Link>
              :
              <Link to="/login"  className={location.pathname === "/login" ? "active-link" : ""}>
                  <p className="login__url">Login</p>
              </Link>}
      </div>
    </div>

  );
};
