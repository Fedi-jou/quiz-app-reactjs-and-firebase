import React, { useRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Landing = () => {
  const [button, setButton] = useState(false);
  const refwolverine = useRef(null);

  useEffect(() => {
    refwolverine.current.classList.add("startingImg");
    setTimeout(() => {
      refwolverine.current.classList.remove("startingImg");
      setButton(true);
    }, 1000);
  }, []);
  const setLeftImg = () => {
    refwolverine.current.classList.add("leftImg");
  };
  const setRightImg = () => {
    refwolverine.current.classList.add("rightImg");
  };
  const removeLeftImg = () => {
    refwolverine.current.classList.remove("leftImg");
  };
  const removeRightImg = () => {
    refwolverine.current.classList.remove("rightImg");
  };
  return (
    <main ref={refwolverine} className="welcomePage">
      <div
        className="leftBox"
        onMouseOver={setLeftImg}
        onMouseOut={removeLeftImg}
      >
        {button && (
          <Link to="signup" className="btn-welcome">
            Inscription
          </Link>
        )}
      </div>
      <div
        className="rightBox"
        onMouseOver={setRightImg}
        onMouseOut={removeRightImg}
      >
        {button && (
          <Link to="login" className="btn-welcome">
            Connection
          </Link>
        )}
      </div>
    </main>
  );
};

export default Landing;
