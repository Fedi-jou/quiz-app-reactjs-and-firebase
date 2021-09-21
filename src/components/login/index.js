import React, { useContext } from "react";
import { useEffect, useState } from "react/cjs/react.development";
import { FirebaseContext } from "../firebase";
import { useHistory, Link } from "react-router-dom";

const Login = () => {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [btn, setBtn] = useState(false);
  const [error, setError] = useState("");
  const firebase = useContext(FirebaseContext);

  useEffect(() => {
    if (email !== "" && password !== "" && password.length > 5) setBtn(true);
    else if (btn) setBtn(false);
  }, [email, password, btn]);

  const handleSubmit = (e) => {
    e.preventDefault();
    firebase
      .loginUser(email, password)
      .then((user) => {
        console.log(user);
        setEmail("");
        setPassword("");
        history.push("/welcome");
      })
      .catch((error) => {
        setError(error);
        setPassword("");
        setEmail("");
      });
  };

  return (
    <div className="signUpLoginBox">
      <div className="slContainer">
        <div className="formBoxLeftLogin"></div>
        <div className="formBoxRight">
          <div className="formContent">
            {error !== "" && <span>{error.message}</span>}

            <h2>Connexion</h2>
            <form onSubmit={handleSubmit}>
              <div className="inputBox">
                <input
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  type="email"
                  autoComplete="off"
                  required
                />
                <label htmlFor="email">Email</label>
              </div>

              <div className="inputBox">
                <input
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  type="password"
                  autoComplete="off"
                  required
                />
                <label htmlFor="password">Mot de passe</label>
              </div>

              {btn ? (
                <button>Connexion</button>
              ) : (
                <button disabled>Connexion</button>
              )}
            </form>
            <div className="linkContainer">
              <Link className="simpleLink" to="/signup">
                You don't have an account signup here
              </Link>
              <br />
              <Link className="simpleLink" to="/forgetpassword">
                Mot de passe oublié? Récupérez-le ici.
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Login;
