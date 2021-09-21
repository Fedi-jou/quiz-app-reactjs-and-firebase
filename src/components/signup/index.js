import React, { useState, useContext } from "react";
import { FirebaseContext } from "../firebase";
import { Link, useHistory } from "react-router-dom";

const Signup = () => {
  const firebase = useContext(FirebaseContext);
  const [error, setError] = useState("");
  const history = useHistory();

  const data = {
    pseudo: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const [logindata, setLogindata] = useState(data);
  const { pseudo, email, password, confirmPassword } = logindata;

  const handleChange = (e) => {
    e.preventDefault();
    setLogindata({ ...logindata, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { email, password, pseudo } = logindata;
    firebase
      .signupUser(email, password)
      .then((authUser) => {
        return firebase.user(authUser.user.uid).set({
          pseudo,
          email,
        });
      })
      .then(() => {
        setLogindata({ ...data });
        history.push("/welcome");
      })
      .catch((error) => {
        setError(error);
        setLogindata({ ...data });
      });
  };

  const btn =
    pseudo === "" ||
    email === "" ||
    password === "" ||
    password !== confirmPassword ? (
      <button disabled>Inscription</button>
    ) : (
      <button>Inscription</button>
    );
  const errormsg = error !== "" && <span>{error.message}</span>;
  return (
    <div className="signUpLoginBox">
      <div className="slContainer">
        <div className="formBoxLeftSignup"></div>
        <div className="formBoxRight">
          <div className="formContent">
            {errormsg}
            <h2>Inscription</h2>
            <form onSubmit={handleSubmit}>
              <div className="inputBox">
                <input
                  type="text"
                  id="pseudo"
                  value={pseudo}
                  autoComplete="off"
                  required
                  onChange={handleChange}
                />
                <label htmlFor="pseudo">Pseudo</label>
              </div>

              <div className="inputBox">
                <input
                  type="email"
                  id="email"
                  value={email}
                  autoComplete="off"
                  required
                  onChange={handleChange}
                />
                <label htmlFor="email">Email</label>
              </div>

              <div className="inputBox">
                <input
                  type="password"
                  id="password"
                  value={password}
                  autoComplete="off"
                  required
                  onChange={handleChange}
                />
                <label htmlFor="password">Mot de passe</label>
              </div>

              <div className="inputBox">
                <input
                  type="password"
                  id="confirmPassword"
                  value={confirmPassword}
                  autoComplete="off"
                  required
                  onChange={handleChange}
                />
                <label htmlFor="confirmPassword">
                  Confirmer le mot de passe
                </label>
              </div>
              {btn}
            </form>
            <div className="linkContainer">
              Already have an account ?{" "}
              <Link to="/login" className="simpleLink">
                Connect HERE
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
