import React, { Suspense, useEffect, useMemo, useState } from "react";
import axios from "axios";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import HomePage from "./components/pages/home-page";
import LoginPage from "./components/pages/login-page";
import DashboardPage from "./components/pages/dashboard-page";
import ProtectedRoute from "./authentication/protectedRoute";
import LoadingPage from "./components/pages/loading-page";
import UserContext from "./contexts/userContext";
import EditEventPage from "./components/pages/editEvent-page";
import ViewEventPage from "./components/pages/viewEvent-page";
import UnderConstructionPage from "./components/404andConstrution/underConstruction-page";

function App() {
  const [loading, setLoading] = useState(true);
  const defaultUserValues = {
    isAuthenticated: false,
    isLoading: false,
    details: null,
    isOrganizer: false,
  };

  const [user, setUser] = useState(defaultUserValues);

  useEffect(() => {
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();

    const checkAuth = () => {
      axios
        .get("/api/user/isAuthenticated", {
          withCredentials: true,
          cancelToken: source.token,
        })
        .then(function (response) {
          setUser((prevValue) => ({
            ...prevValue,
            isAuthenticated: response.data.isAuthenticated,
          }));
          setLoading(false);
        })
        .catch(function (error) {
          console.log(error);
        })
        .then(function () {});
    };

    checkAuth();
    return () => {
      source.cancel();
    };
  }, []);

  const userProviderValue = useMemo(
    () => ({
      user,
      setUser,
    }),
    [user, setUser]
  );

  if (loading) {
    return <LoadingPage />;
  }

  return (
    <Router>
      <Suspense fallback={<LoadingPage />}>
        <Switch>
          <UserContext.Provider value={userProviderValue}>
            <Route path="/" exact component={HomePage} />
            <Route path="/login" exact component={LoginPage} />
            <ProtectedRoute path="/dashboard" exact component={DashboardPage} />
            <ProtectedRoute path="/event/new" exact component={EditEventPage} />
            <Route path="/event/view/:id" exact component={ViewEventPage} />
          </UserContext.Provider>
        </Switch>
      </Suspense>
    </Router>
  );
}

export default App;
