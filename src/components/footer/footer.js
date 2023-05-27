import React from "react";
import "./footer.css";
import { FaInstagram, FaLinkedin, FaGoogle } from "react-icons/fa";

const footer = () => {
    return (
        <footer>
            <div className="footer-content">
                <h3>Tech shop</h3>
                <p>
                    Made with <span className="heart">&#10084;</span> by Julian Dus
                </p>
                <ul className="socials">
                    <li>
                        <a href="#">
                            <FaGoogle size={30} color="#DB4437" />
                        </a>
                    </li>
                    {/* <li>
            <a href="#">
              <FaInstagram size={30} color="#C13584" />
            </a>
          </li>
          <li>
            <a href="#">
              <FaInstagram size={30} color="#C13584" />
            </a>
          </li> */}
                    <li>
                        <a href="#">
                            <FaInstagram size={30} color="#C13584" />
                        </a>
                    </li>
                    <li>
                        <a href="#">
                            <FaLinkedin size={30} color="#0077B5" />
                        </a>
                    </li>
                </ul>
            </div>
            <div className="footer-bottom">
                <p>
                    copyright &copy; <a href="#">Tech shop</a>{" "}
                </p>

            </div>
        </footer>
    );
};

export default footer;
