import React from "react";
import ReactDOM from "react-dom";
import App from "./components/app";
import Firebase, { FirebaseContext } from "./components/firebase";

ReactDOM.render(
  <React.StrictMode>
    <FirebaseContext.Provider value={new Firebase()}>
      <App />
    </FirebaseContext.Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
