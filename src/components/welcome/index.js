import React, { useState, useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Logout from "../logout";
import Quiz from "../quiz";
import { FirebaseContext } from "../firebase";
import Loader from "../loader";

const Welcome = () => {
  const [usersession, setUsersession] = useState(null);
  const [userData, setUserData] = useState({});
  const firebase = useContext(FirebaseContext);
  const history = useHistory();

  useEffect(() => {
    let listener = firebase.auth.onAuthStateChanged((user) => {
      user ? setUsersession(user) : history.push("/");
    });

    usersession &&
      firebase
        .user(usersession.uid)
        .get()
        .then((doc) => {
          if (doc && doc.exists) {
            const myData = doc.data();
            setUserData(myData);
          }
        })
        .catch((error) => {
          console.log(error);
        });

    return () => {
      listener();
    };
  }, [usersession]);
  return usersession === null ? (
    <>
      <Loader
        loadingMsg={"Loading"}
        styling={{ textAlign: "center", color: "#ffffff" }}
      />
    </>
  ) : (
    <div className="quiz-bg">
      <div className="container">
        Welcome
        <Logout />
        <Quiz userData={userData} />
      </div>
    </div>
  );
};

export default Welcome;
