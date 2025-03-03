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

//WordPage
import ConsonantPage from "./pages/MainPage/ClassPage/WordPage/PhonPage/ConsonantPage/ConsonantPage";
import StudyPage from "./pages/MainPage/ClassPage/WordPage/PhonPage/ConsonantPage/StudyPage";

//SentencePage
import RestaurantPage from "./pages/MainPage/ClassPage/SentencePage/SpecialPage/RestaurantPage/RestaurantPage";
import ChurchPage from "./pages/MainPage/ClassPage/SentencePage/SpecialPage/ChurchPage/ChurchPage";
import HospitalPage from "./pages/MainPage/ClassPage/SentencePage/SpecialPage/HospitalPage/HospitalPage";
import AirportPage from "./pages/MainPage/ClassPage/SentencePage/SpecialPage/AirportPage/AirportPage";
import ShoppingPage from "./pages/MainPage/ClassPage/SentencePage/SpecialPage/ShoppingPage/ShoppingPage";
import TripPage from "./pages/MainPage/ClassPage/SentencePage/SpecialPage/TripPage/TripPage";
import TransportPage from "./pages/MainPage/ClassPage/SentencePage/SpecialPage/TransportPage/TransportPage";

import ITPage from "./pages/MainPage/ClassPage/SentencePage/BusinessPage/ITPage/ITPage";
import MarketingPage from "./pages/MainPage/ClassPage/SentencePage/BusinessPage/MarketingPage/MarketingPage";
import SalesPage from "./pages/MainPage/ClassPage/SentencePage/BusinessPage/SalesPage/SalesPage";
import HRPage from "./pages/MainPage/ClassPage/SentencePage/BusinessPage/HRPage/HRPage";
import DesignPage from "./pages/MainPage/ClassPage/SentencePage/BusinessPage/DesignPage/DesignPage";
import ResearchPage from "./pages/MainPage/ClassPage/SentencePage/BusinessPage/ResearchPage/ResearchPage";

function AppContent() {
  const location = useLocation();
  const hideHeaderPaths = ["/", "/login", "/signup"];

  const routes = [
    { path: "/", element: <LandingPage /> },
    { path: "/login", element: <LoginPage /> },
    { path: "/signup", element: <SignupPage /> },
    { path: "/main", element: <MainPage /> },
    { path: "/word", element: <WordPage /> },
    { path: "/report", element: <ReportPage /> },

    //word
    { path: "/word", element: <WordPage /> },
    //phon
    { path: "/phon/consonant", element: <ConsonantPage /> },
    { path: "/phon/consonant/study/:letter", element: <StudyPage /> },

    //sentence
    { path: "/sentence", element: <SentencePage /> },
    //special
    { path: "/sentence/church", element: <ChurchPage /> },
    { path: "/sentence/restaurant", element: <RestaurantPage /> },
    { path: "/sentence/hospital", element: <HospitalPage /> },
    { path: "/sentence/airport", element: <AirportPage /> },
    { path: "/sentence/shopping", element: <ShoppingPage /> },
    { path: "/sentence/trip", element: <TripPage /> },
    { path: "/sentence/transport", element: <TransportPage /> },
    //business
    { path: "/sentence/IT", element: <ITPage /> },
    { path: "/sentence/marketing", element: <MarketingPage /> },
    { path: "/sentence/sales", element: <SalesPage /> },
    { path: "/sentence/HR", element: <HRPage /> },
    { path: "/sentence/design", element: <DesignPage /> },
    { path: "/sentence/research", element: <ResearchPage /> },

    //grammer
    { path: "/grammer", element: <GrammerPage /> },
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
