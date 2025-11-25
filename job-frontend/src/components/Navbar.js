import React from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";

function Navbar({ isLoggedIn, onLogout }) {
  const navigate = useNavigate();

  return (
    <nav className="nav">
      <div className="nav-container">
        <div className="nav-logo" onClick={() => navigate("/")}>
          <h2>JobPortal</h2>
        </div>
        <div className="nav-list">
          {!isLoggedIn ? (
            <>
              <div className="nav-item">
                <button
                  className="nav-link"
                  onClick={() => navigate("/register")}
                >
                  Đăng ký
                </button>
              </div>
              <div className="nav-item">
                <button
                  className="nav-link login"
                  onClick={() => navigate("/login")}
                >
                  Đăng nhập
                </button>
              </div>
            </>
          ) : (
            <>
              <div className="nav-item">
                <button
                  className="nav-link profile-link"
                  onClick={() => navigate("/profile")}
                >
                   Tài khoản
                </button>
              </div>
              <div className="nav-item">
                <button className="nav-link logout" onClick={onLogout}>
                  Đăng xuất
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;