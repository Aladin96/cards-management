import React, { useState } from "react";
import { login } from "../../services/authService";
import { UncontrolledAlert } from "reactstrap";

const Login = ({ history }) => {
  const [emailFocus, setEmailFocus] = useState(false);
  const [passwordFocus, setPasswordFocus] = useState(false);

  const [name, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [alert, setAlert] = useState({ status: false, message: "", type: "" });

  //login();

  const handleLogin = async (e) => {
    e.preventDefault();
    const response = await login(name, password);
    if (response.type === "success") window.location = "/home";
    else setAlert(response);
  };

  return (
    <div className="login-area">
      <div className="container">
        <div className="login-box ptb--100">
          <form onSubmit={handleLogin}>
            <div className="login-form-head">
              <h5 style={{ color: "#fff" }}>Connexion à votre compte</h5>
            </div>
            <div className="login-form-body">
              <UncontrolledAlert
                color={alert.type}
                isOpen={alert.status}
                toggle={() => setAlert({ status: false })}
              >
                {alert.message}
              </UncontrolledAlert>
              <div
                className={
                  emailFocus || name.length > 0 ? "form-gp focused" : "form-gp"
                }
              >
                <label forhtml="exampleInputEmail1">Pseudo</label>
                <input
                  type="text"
                  id="exampleInputEmail1"
                  onBlur={() => setEmailFocus(!emailFocus)}
                  onFocus={() => setEmailFocus(!emailFocus)}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <i className="ti-email"></i>
                <div className="text-danger"></div>
              </div>
              <div
                className={
                  passwordFocus || password.length > 0
                    ? "form-gp focused"
                    : "form-gp"
                }
              >
                <label forhtml="exampleInputPassword1">Mot de passe:</label>
                <input
                  type="password"
                  id="exampleInputPassword1"
                  onBlur={() => setPasswordFocus(!passwordFocus)}
                  onFocus={() => setPasswordFocus(!passwordFocus)}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <i className="ti-lock"></i>
                <div className="text-danger"></div>
              </div>

              <div className="submit-btn-area">
                <button id="form_submit" type="submit">
                  Connexion <i className="ti-arrow-right"></i>
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
