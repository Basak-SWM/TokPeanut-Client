import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import GlobalStyle from "./style/GlobalStyle";
import Topbar from "./component/layout/Nav";

import LandingPage from "./component/LandingPage";

import PresentationList from "./component/presentation/PresentationList/PresentationList";
import Summary from "./component/presentation/Summary/Summary";
import Speech from "./component/presentation/Speech/Speech";
import Practice from "./component/presentation/Practice/Practice";
import NewPresentation from "./component/presentation/NewPresentation/NewPresentation";

import CoachList from "./component/coach/CoachList";
import Portfolio from "./component/coach/Portfolio";

import Login from "./component/login/Login";
import SignIn from "./component/signin/SignIn";
import SignInCoach from "./component/signin/SignInCoach";

import MyPage from "./component/user/MyPage";
import MyMatching from "./component/user/MyMatching";
import UpdatePortfolio from "./component/user/UpdatePortfolio";

import Notfound from "./component/Notfound";
import dayjs from "dayjs";
import "dayjs/locale/ko";
import * as relativeTime from "dayjs/plugin/relativeTime";
dayjs.locale("ko");
dayjs.extend(relativeTime);
function App() {
  return (
    <>
      <GlobalStyle />
      <Router>
        {/* <Topbar /> */}
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/presentation" element={<PresentationList />} />
          <Route path="/presentation/summary" element={<Summary />} />
          <Route path="/presentation/speech" element={<Speech />} />
          <Route
            path="/presentation/practice"
            element={<Practice isNew={false} />}
          />
          <Route path="/presentation/new" element={<NewPresentation />} />
          <Route
            path="/presentation/new/practice"
            element={<Practice isNew={true} />}
          />

          <Route path="/coach" element={<CoachList />} />
          <Route path="/coach/portfolio" element={<Portfolio />} />

          <Route path="/login" element={<Login />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signin/coach" element={<SignInCoach />} />

          <Route path="/user/mypage" element={<MyPage />} />
          <Route path="/user/mymatching" element={<MyMatching />} />
          <Route path="/user/portfolio/update" element={<UpdatePortfolio />} />

          <Route path="/*" element={<Notfound />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
