import { BrowserRouter, Route, Switch } from "react-router-dom";
import ReactGA from "react-ga";
import { Affix } from "antd";

import Header from "./components/Header";
// import Advertisement from "./components/Advertisement";
// import FilterBar from "./components/FilterBar";
import MenuBar from "./components/MenuBar";
import OpenChatPage from "./components/OpenChatPage";
import Meetup from "./components/Meetup";
import NewMeetup from "./components/NewMeetup";

import "./App.css";

const GA_ID = process.env.REACT_APP_GA_ID;
ReactGA.initialize(GA_ID);
ReactGA.pageview(window.location.pathname + window.location.search);

function App(props) {
  // const [openChatList, setOpenChatList] = useState([]);
  // const [tags, setTags] = useState([]);
  // const [filteredList, setFilteredList] = useState([]);

  // useEffect(() => {
  //   async function fetchOpenChatList() {
  //     const res = await axios.get("/getLinks", {
  //       headers: { "Access-Control-Allow-Origin": "*" },
  //     });

  //     // let tagsArray = [];
  //     // for (let i = 0; i < res.data.result.lists.length; i++) {
  //     //   tagsArray.push(
  //     //     ...res.data.result.lists[i].tags.map((tag) => {
  //     //       return tag;
  //     //     })
  //     //   );
  //     // }
  //     // let duplicateRemovedTagsArray = [...new Set(tagsArray)];

  //     // setTags([...tags, duplicateRemovedTagsArray]);
  //   }

  //   fetchOpenChatList();

  //   //   return () => {};
  // }, []);

  // function filterList(selectedTag) {
  //   console.log(selectedTag);
  // }

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
          <Route exact path="/meetup" component={Meetup} />
          <Route exact path="/meetup/new" component={NewMeetup} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
