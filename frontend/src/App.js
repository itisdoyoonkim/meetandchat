import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import ReactGA from "react-ga";
import { Affix } from "antd";

import Header from "./components/Header";
// import Advertisement from "./components/Advertisement";
// import FilterBar from "./components/FilterBar";
import MenuBar from "./components/MenuBar";
import OpenChatPage from "./components/OpenChatPage";
import MeetupPage from "./components/MeetupPage";
import NewMeetup from "./components/NewMeetup";

import "./App.css";

const GA_ID = process.env.REACT_APP_GA_ID;
ReactGA.initialize(GA_ID);
ReactGA.pageview(window.location.pathname + window.location.search);

function App(props) {
  return (
    <BrowserRouter>
      <div className="container">
        <Header />
        <Affix offsetTop={0}>
          <MenuBar />
        </Affix>
        {/* <Advertisement /> */}

        <Switch>
          <Route exact path="/" component={OpenChatPage} />
          <Route exact path="/meetup" component={MeetupPage} />
          <Route exact path="/meetup/new" component={NewMeetup} />
          <Redirect to="/" />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
