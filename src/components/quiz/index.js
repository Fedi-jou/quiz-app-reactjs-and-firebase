import React, { Component } from "react";
import Levels from "../levels";
import Progressbar from "../progressbar";
import { QuizMarvel } from "../quizMarvel";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Quizover from "../quizover";
import { FaChevronRight } from "react-icons/fa";
toast.configure();

const initialState = {
  quizLevel: 0,
  maxQuestions: 10,
  storedQuestions: [],
  question: null,
  options: [],
  idQuestion: 0,
  btnDisabled: true,
  userAnswer: null,
  score: 0,
  showWelcomeMsg: false,
  quizend: false,
  percent: 0,
};

const levelNames = ["debutant", "confirme", "expert"];

class Quiz extends Component {
  constructor(props) {
    super(props);

    this.state = initialState;
    this.storedDataRef = React.createRef();
  }

  loadQuestions = (quizz) => {
    const fetchedArray = QuizMarvel[0].quizz[quizz];

    if (fetchedArray.length >= this.state.maxQuestions) {
      this.storedDataRef.current = fetchedArray;
      const newArray = fetchedArray.map(({ answer, ...keepRest }) => keepRest);
      this.setState({
        storedQuestions: newArray,
      });
    } else {
      console.log("not enough questions");
    }
  };

  showMSG = (pseudo) => {
    if (!this.state.showWelcomeMsg) {
      this.setState({
        showWelcomeMsg: true,
      });

      toast.warn(`Bienvenue ${pseudo}, et bonne chance!`, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        // bodyClassName: "toastify-color-welcome",
      });
    }
  };

  componentDidMount() {
    this.loadQuestions(levelNames[this.state.quizLevel]);
  }

  nextQuestion = () => {
    if (this.state.idQuestion === this.state.maxQuestions - 1) {
      console.log("game over");
      //
      this.setState({
        quizend: true,
      });
    } else {
      this.setState((prevState) => ({ idQuestion: prevState.idQuestion + 1 }));
    }
    const goodAnswer = this.storedDataRef.current[this.state.idQuestion].answer;
    if (this.state.userAnswer === goodAnswer) {
      this.setState((prevState) => ({ score: prevState.score + 1 }));
      toast.success("Good +1", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    } else {
      toast.error("Wrong 0", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };
  componentDidUpdate(prevProps, prevState) {
    const {
      maxQuestions,
      storedQuestions,

      idQuestion,

      score,

      quizend,
      percent,
    } = this.state;

    if (
      storedQuestions !== prevState.storedQuestions &&
      storedQuestions.length
    ) {
      /*  console.log(this.state.storedQuestions[0].question);
      console.log(this.state.storedQuestions[this.state.idQuestion].options); */
      this.setState({
        question: storedQuestions[idQuestion].question,
        options: storedQuestions[idQuestion].options,
      });
    }
    if (idQuestion !== prevState.idQuestion && storedQuestions.length) {
      this.setState({
        question: storedQuestions[idQuestion].question,
        options: storedQuestions[idQuestion].options,
        userAnswer: null,
        btnDisabled: true,
      });
    }

    if (quizend !== prevState.quizend) {
      const gradePercent = this.getPercentage(maxQuestions, score);

      this.gameover(gradePercent);
    }

    if (this.props.userData.pseudo !== prevProps.userData.pseudo) {
      this.showMSG(this.props.userData.pseudo);
    }
  }

  submitAnswer = (selectedAnswer) => {
    this.setState({
      userAnswer: selectedAnswer,
      btnDisabled: false,
    });
  };
  getPercentage = (maxQuest, ourScore) => (ourScore / maxQuest) * 100;
  gameover = (percent) => {
    if (percent >= 50) {
      this.setState({
        quizLevel: this.state.quizLevel + 1,
        percent: percent,
      });
    } else {
      this.setState({
        percent: percent,
      });
    }
  };

  loadLevelQuestions = (param) => {
    this.setState({ ...initialState, quizLevel: param });
    this.loadQuestions(levelNames[param]);
  };

  render() {
    const {
      quizLevel,
      maxQuestions,
      //storedQuestions,
      question,
      options,
      idQuestion,
      btnDisabled,
      userAnswer,
      score,
      //showWelcomeMsg,
      quizend,
      percent,
    } = this.state;

    const { pseudo } = this.props.userData;
    const displayoptions = options.map((option, index) => {
      return (
        <p
          onClick={() => this.submitAnswer(option)}
          key={index}
          className={`answerOptions ${
            userAnswer === option ? "selected" : null
          }`}
        >
          <FaChevronRight /> {option}
        </p>
      );
    });
    return quizend ? ( //add "!"
      <Quizover
        ref={this.storedDataRef}
        levelNames={levelNames}
        score={score}
        maxQuestions={maxQuestions}
        quizLevel={quizLevel}
        percent={percent}
        loadLevelQuestions={this.loadLevelQuestions}
      />
    ) : (
      <>
        <h2>Pseudo : {pseudo} </h2>
        <Levels levelNames={levelNames} quizLevel={quizLevel} />
        <Progressbar idQuestion={idQuestion} maxQuestions={maxQuestions} />
        <h2> {question}</h2>
        {displayoptions}
        <button
          onClick={this.nextQuestion}
          disabled={btnDisabled}
          className="btnSubmit"
        >
          {idQuestion < maxQuestions - 1 ? "Next" : "Finished"}
        </button>
      </>
    );
  }
}

export default Quiz;
