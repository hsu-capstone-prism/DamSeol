import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import MainPage from "./pages/MainPage/MainPage";

function App() {
  const routes = [{ path: "/main", element: <MainPage /> }];

  const routeComponents = routes.map(({ path, element }, key) => (
    <Route exact path={path} element={element} key={key} />
  ));

  return (
    <div>
      <Header />
      <BrowserRouter>
        <Routes>{routeComponents}</Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
