import React from "react";
import batman from "../../images/batman.png";

const Errorpage = () => {
  const centerH2 = {
    textAlign: "center",
    marginTop: "50px",
  };
  const centerImg = {
    display: "block",
    margin: "40px auto",
  };
  return (
    <div className="quiz-bg">
      <div className="container">
        <h2 style={centerH2}>Oops ,Page Not Found</h2>
        <img style={centerImg} src={batman} alt="not found page" />
      </div>
    </div>
  );
};

export default Errorpage;
