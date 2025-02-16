import React from "react";
import Header from "./components/Header";
import MainPage from "./pages/MainPage/MainPage";
import LandingPage from "./pages/StartPage/LandingPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/StartPage/LoginPage";
import "./App.css";

function App() {
  const routes = [
    { path: "/", element: <LandingPage /> },
    { path: "/login", element: <LoginPage /> },
    { path: "/main", element: <MainPage /> },
  ];

  const routeComponents = routes.map(({ path, element }, key) => (
    <Route path={path} element={element} key={key} />
  ));

  return (
    <div className="app">
      <BrowserRouter>
        <Header />
        <Routes>{routeComponents}</Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
