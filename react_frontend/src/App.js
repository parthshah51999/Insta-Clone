import React, { Suspense, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import isEqual from "lodash/isEqual";
import Routes from "./shared/js/components/Routes";
import Navbar from "./components/Navbar/Navbar";
import "react-toastify/dist/ReactToastify.css";
import { UserContext } from "./shared/api/contexts";
import { getUser } from "./shared/js/utils";
import "./App.scss";

function App() {
  const [user, setUser] = useState(null);
  const storedUser = getUser();

  if (!isEqual(user, storedUser)) {
    setUser(storedUser);
  }

  return (
    <BrowserRouter>
      <UserContext.Provider value={{ user, setUser }}>
        <Navbar />
        <Suspense fallback={<div />}>
          <Routes />
        </Suspense>
        <ToastContainer position="bottom-right" />
      </UserContext.Provider>
    </BrowserRouter>
  );
}

export default App;
