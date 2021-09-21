import React, { useEffect, useState } from "react";
import { GiTrophyCup } from "react-icons/gi";
import Loader from "../loader";
import Modal from "../modal";
import axios from "axios";

const Quizover = React.forwardRef((props, ref) => {
  const [asked, setAsked] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [characterinfo, setCharacterinfo] = useState([]);
  const [loading, setLoading] = useState(true);
  const {
    levelNames,
    score,
    maxQuestions,
    quizLevel,
    percent,
    loadLevelQuestions,
  } = props;

  const API_PUBLIC = process.env.REACT_APP_PUBLIC_KEY;
  const hash = "c524aef2bb1f9351e250d5432021d737";
  console.log(API_PUBLIC);

  useEffect(() => {
    setAsked(ref.current);
    if (localStorage.getItem("marvelStorageDate")) {
      const date = localStorage.getItem("marvelStorageDate");
      checkDataAge(date);
    }
  }, [ref]);

  const checkDataAge = (date) => {
    const today = Date.now();
    const timeDifference = today - date;

    const daysDifference = timeDifference / (1000 * 3600 * 24);

    if (daysDifference >= 15) {
      localStorage.clear();
      localStorage.setItem("marvelStorageDate", Date.now());
    }
  };

  const showModal = (id) => {
    setOpenModal(true);

    if (localStorage.getItem(id)) {
      setCharacterinfo(JSON.parse(localStorage.getItem(id)));
      setLoading(false);
    } else {
      axios
        .get(
          `https://gateway.marvel.com/v1/public/characters/${id}?ts=1&apikey=${API_PUBLIC}&hash=${hash}`
        )
        .then((response) => {
          setCharacterinfo(response.data);
          setLoading(false);
          console.log(characterinfo);
          localStorage.setItem(id, JSON.stringify(response.data));
          if (!localStorage.getItem("marvelStorageDate")) {
            localStorage.setItem("marvelStorageDate", Date.now());
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const hideModal = () => {
    setOpenModal(false);
    setLoading(true);
  };

  const capitalizeFirstletter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const averagegrade = maxQuestions / 2;

  if (score < averagegrade) {
    /*    setTimeout(() => {
      loadLevelQuestions(0);
    }, 3000); */
    setTimeout(() => {
      loadLevelQuestions(quizLevel);
    }, 3000);
  }

  const decision =
    score >= averagegrade ? (
      <>
        <div className="stepsBtnContainer">
          {quizLevel < levelNames.length ? (
            <>
              <p className="successMsg">Bravo, passez au niveau suivant!</p>
              <button
                onClick={() => loadLevelQuestions(quizLevel)}
                className="btnResult success"
              >
                Niveau Suivant
              </button>
            </>
          ) : (
            <>
              <p className="successMsg">
                <GiTrophyCup size="50px" />
                Bravo, vous êtes un expert !
              </p>
              <button
                onClick={() => loadLevelQuestions(0)}
                className="btnResult gameOver"
              >
                Home page
              </button>
            </>
          )}
        </div>
        <div className="percentage">
          <div className="progressPercent">Réussite: {percent} %</div>
          <div className="progressPercent">
            Note: {score}/{maxQuestions}
          </div>
        </div>
      </>
    ) : (
      <>
        <div className="stepsBtnContainer">
          <p className="failureMsg">Vous avez échoué !</p>
        </div>

        <div className="percentage">
          <div className="progressPercent">Réussite: {percent} %</div>
          <div className="progressPercent">
            Note: {score}/{maxQuestions}
          </div>
        </div>
      </>
    );

  const questionAnswer =
    score >= averagegrade ? (
      asked.map((question) => {
        return (
          <tr key={question.id}>
            <td>{question.question}</td>
            <td>{question.answer}</td>
            <td>
              <button
                onClick={() => showModal(question.heroId)}
                className="btnInfo"
              >
                Infos
              </button>
            </td>
          </tr>
        );
      })
    ) : (
      <tr>
        <td colSpan="3">
          <Loader
            loadingMsg={"pas de reponse"}
            styling={{ textAlign: "center", color: "red" }}
          />
        </td>
      </tr>
    );

  const resultinmodal = !loading ? (
    <>
      <div className="modalHeader">
        <h2>{characterinfo.data.results[0].name}</h2>
      </div>
      <div className="modalBody">
        <div className="comicImage">
          <img
            src={
              characterinfo.data.results[0].thumbnail.path +
              "." +
              characterinfo.data.results[0].thumbnail.extension
            }
            alt={characterinfo.data.results[0].name}
          />

          <p>{characterinfo.attributionText}</p>
        </div>
        <div className="comicDetails">
          <h3>Description</h3>
          {characterinfo.data.results[0].description ? (
            <p>{characterinfo.data.results[0].description}</p>
          ) : (
            <p>Description indisponible ...</p>
          )}
          <h3>Plus d'infos</h3>
          {characterinfo.data.results[0].urls &&
            characterinfo.data.results[0].urls.map((url, index) => {
              return (
                <a
                  key={index}
                  href={url.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {capitalizeFirstletter(url.type)}
                </a>
              );
            })}
        </div>
      </div>
      <div className="modalFooter">
        <button className="modalBtn" onClick={hideModal}>
          Close
        </button>
      </div>
    </>
  ) : (
    <>
      <div className="modalHeader">
        <h2>Loading informations ..</h2>
      </div>
      <div className="modalBody">
        <h3>
          <Loader />
        </h3>
      </div>
    </>
  );

  return (
    <>
      {decision}
      <hr />
      <p>Answers to asked questions</p>
      <div className="answerContainer">
        <table className="answers">
          <thead>
            <tr>
              <th>Question</th>
              <th>Answer</th>
              <th>Info</th>
            </tr>
          </thead>
          <tbody>{questionAnswer}</tbody>
        </table>
      </div>
      <Modal openModal={openModal} hideModal={hideModal}>
        {resultinmodal}
      </Modal>
    </>
  );
});

export default React.memo(Quizover);
