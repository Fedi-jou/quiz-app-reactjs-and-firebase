import "../../App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Errorpage from "../errorpage";
import Footer from "../footer";
import Header from "../header";
import Landing from "../landing";
import Login from "../login";
import Signup from "../signup";
import Welcome from "../welcome";
import Forgetpassword from "../forgetpassword";
import { IconContext } from "react-icons";

function App() {
  return (
    <Router>
      <IconContext.Provider value={{ style: { verticalAlign: "middle" } }}>
        <Header />
        <Switch>
          <Route exact path="/" component={Landing} />
          <Route path="/welcome" component={Welcome} />
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
          <Route path="/forgetpassword" component={Forgetpassword} />
          <Route path="*" component={Errorpage} />
        </Switch>
        <Footer />
      </IconContext.Provider>
    </Router>
  );
}

export default App;
