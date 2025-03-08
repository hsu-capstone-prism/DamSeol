import React from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import LandingPage from "./pages/StartPage/LandingPage";
import LoginPage from "./pages/StartPage/LoginPage";
import Header from "./components/Header";
import MainPage from "./pages/MainPage/MainPage";
import WordPage from "./pages/MainPage/ClassPage/WordPage";
import SentencePage from "./pages/MainPage/ClassPage/SentencePage";
import GrammerPage from "./pages/MainPage/ClassPage/GrammerPage";
import SignupPage from "./pages/StartPage/SignupPage";
import ReportPage from "./pages/MainPage/ReportPage/ReportPage";

// WordPage
import ConsonantPage from "./pages/MainPage/ClassPage/WordPage/PhonPage/ConsonantPage/ConsonantPage";
import StudyPage from "./pages/MainPage/ClassPage/WordPage/PhonPage/ConsonantPage/StudyPage";

// SentencePage
import BusinessPage from "./pages/MainPage/ClassPage/SentencePage/BusinessPage/BusinessPage";
import SpecialPage from "./pages/MainPage/ClassPage/SentencePage/SpecialPage/SpecialPage";
import sentenceData from "./data/sentenceData";

function AppContent() {
  const location = useLocation();
  const hideHeaderPaths = ["/", "/login", "/signup"];
  const shouldHideHeader = hideHeaderPaths.some((path) =>
    location.pathname.startsWith(path)
  );

  const routes = [
    { path: "/", element: <LandingPage /> },
    { path: "/login", element: <LoginPage /> },
    { path: "/signup", element: <SignupPage /> },
    { path: "/main", element: <MainPage /> },
    { path: "/report", element: <ReportPage /> },

    // word
    { path: "/word", element: <WordPage /> },
    { path: "/phon/consonant", element: <ConsonantPage /> },
    { path: "/phon/consonant/study/:letter", element: <StudyPage /> },

    // sentence
    { path: "/sentence", element: <SentencePage /> },
    { path: "/sentence/business", element: <BusinessPage /> },
    { path: "/sentence/special", element: <SpecialPage /> },

    // grammer
    { path: "/grammer", element: <GrammerPage /> },
  ];

  return (
    <div>
      {!shouldHideHeader && <Header />}
      <Routes>
        {routes.map(({ path, element }, key) => (
          <Route path={path} element={element} key={key} />
        ))}
        {sentenceData.map(({ id, category }) => (
          <Route
            key={id}
            path={`/sentence/${category}`}
            element={<BusinessPage />}
          />
        ))}
        <Route path={`/sentence/:category`} element={<SpecialPage />} />
      </Routes>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
