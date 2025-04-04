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
import ProfilePage from "./pages/MainPage/ProfilePage";

//WordPage
import ConsonantPage from "./pages/MainPage/ClassPage/WordPage/PhonPage/ConsonantPage";
import VowelPage from "./pages/MainPage/ClassPage/WordPage/PhonPage/VowelPage";
import WordStudyPage from "./pages/MainPage/ClassPage/WordPage/WordStudyPage";
import PhonPage from "./pages/MainPage/ClassPage/WordPage/PhonPage/PhonPage";
import AlterPage from "./pages/MainPage/ClassPage/WordPage/AlterPage/AlterPage";
import AddPage from "./pages/MainPage/ClassPage/WordPage/AddPage/AddPage";

//SentencePage
import SenStudyPage from "./pages/MainPage/ClassPage/SentencePage/SenStudyPage";

//GrammerPage
import GramStudyPage from "./pages/MainPage/ClassPage/GrammerPage/GramStudyPage";

function AppContent() {
  const location = useLocation();
  const hideHeaderPaths = ["/", "/login", "/signup"];

  const routes = [
    { path: "/", element: <LandingPage /> },
    { path: "/login", element: <LoginPage /> },
    { path: "/signup", element: <SignupPage /> },
    { path: "/main", element: <MainPage /> },
    { path: "/report", element: <ReportPage /> },
    { path: "/profile", element: <ProfilePage /> },

    //word
    { path: "/word", element: <WordPage /> },
    //phon
    { path: "/phon/consonant", element: <ConsonantPage /> },
    {
      path: "/phon/consonant/words/:subcategoryId",
      element: <WordStudyPage />,
    },
    { path: "/phon/vowel", element: <VowelPage /> },
    {
      path: "/phon/vowel/words/:subcategoryId",
      element: <WordStudyPage />,
    },
    { path: "/phon/study", element: <PhonPage /> },
    { path: "/phon/study/words/:subcategoryId", element: <WordStudyPage /> },
    //alter
    { path: "/alter/study", element: <AlterPage /> },
    { path: "/alter/study/words/:subcategoryId", element: <WordStudyPage /> },
    //add
    { path: "/add/study", element: <AddPage /> },
    { path: "/add/study/words/:subcategoryId", element: <WordStudyPage /> },

    //sentence
    { path: "/sentence/", element: <SentencePage /> },
    {
      path: "/sentence/study/:subcategoryId",
      element: <SenStudyPage />,
    },

    //grammer
    { path: "/grammer", element: <GrammerPage /> },
    { path: "/grammer/study/:subcategoryId", element: <GramStudyPage /> },
  ];

  return (
    <div>
      {!hideHeaderPaths.includes(location.pathname) && <Header />}
      <Routes>
        {routes.map(({ path, element }, key) => (
          <Route path={path} element={element} key={key} />
        ))}
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
