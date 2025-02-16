import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/StartPage/LandingPage";
import LoginPage from "./pages/StartPage/LoginPage";
import "./App.css";

function App() {
  const routes = [
    { path: "/", element: <LandingPage /> },
    { path: "/login", element: <LoginPage /> },
  ];

  const routeComponents = routes.map(({ path, element }, key) => (
    <Route path={path} element={element} key={key} />
  ));

  return (
    <div className="app">
      <BrowserRouter>
        <Routes>{routeComponents}</Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
