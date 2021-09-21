import React, { useEffect, useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { FirebaseContext } from "../firebase";
import ReactTooltip from "react-tooltip";

const Logout = () => {
  const [checked, setCheked] = useState(false);
  const firebase = useContext(FirebaseContext);
  const history = useHistory();
  const handleChange = (event) => {
    setCheked(event.target.checked);
  };

  useEffect(() => {
    if (checked) {
      firebase.signoutUser();
      history.push("/login");
    }
  }, [checked, firebase]);
  return (
    <div className="logoutContainer">
      <label className="switch">
        <input type="checkbox" checked={checked} onChange={handleChange} />{" "}
        <span className="slider round" data-tip="Disconnect"></span>
      </label>
      <ReactTooltip place="left" type="error" effect="solid" />
    </div>
  );
};

export default Logout;
