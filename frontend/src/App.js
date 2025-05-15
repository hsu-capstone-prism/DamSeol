import React, { useState } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import LandingPage from "./pages/StartPage/LandingPage";
import LoginPage from "./pages/StartPage/LoginPage";
import Logout from "./pages/StartPage/LogoutPage";
import Header from "./components/Header";
import MainPage from "./pages/MainPage/MainPage";
import WordPage from "./pages/MainPage/ClassPage/WordPage";
import SentencePage from "./pages/MainPage/ClassPage/SentencePage";
import GrammerPage from "./pages/MainPage/ClassPage/GrammerPage";
import SignupPage from "./pages/StartPage/SignupPage";
import ReportPage from "./pages/MainPage/ReportPage/ReportPage";
import ProfilePage from "./pages/MainPage/ProfilePage";
import GamePage from "./pages/MainPage/GamePage/GamePage";

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

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const hideHeaderPaths = ["/", "/login", "/signup"];

  const routes = [
    { path: "/", element: <LandingPage /> },
    { path: "/login", element: <LoginPage /> },
    { path: "/logout", element: <Logout /> },
    { path: "/signup", element: <SignupPage /> },
    { path: "/main", element: <MainPage /> },
    { path: "/report", element: <ReportPage /> },
    { path: "/profile", element: <ProfilePage /> },
    { path: "/game", element: <GamePage /> },

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
      {!hideHeaderPaths.includes(location.pathname) && (
        <Header isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
      )}
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
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=block" />
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
