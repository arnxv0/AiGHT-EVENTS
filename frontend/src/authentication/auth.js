import axios from "axios";
import { useContext } from "react";
import UserContext from "../contexts/userContext";

function Auth() {
  const { setUser } = useContext(UserContext);

  async function registerUser(user) {
    setUser((prevValue) => ({ ...prevValue, isLoading: true }));

    let responseData = { isSuccessful: false };
    let reqData = {
      username: user.registerEmail,
      email: user.registerEmail,
      password: user.registerPassword,
      confirmPassword: user.confirmPassword,
    };

    await axios
      .post("/api/user/register", reqData, { withCredentials: true })
      .then(function (response) {
        responseData = response.data;
      })
      .catch(function (error) {})
      .then(function () {});

    setUser((prevValue) => ({
      ...prevValue,
      isLoading: false,
      ...responseData,
    }));
    return responseData;
  }

  async function loginUser(user) {
    setUser((prevValue) => ({ ...prevValue, isLoading: true }));
    let responseData = { isSuccessful: false };
    let reqData = {
      username: user.loginEmail,
      email: user.loginEmail,
      password: user.loginPassword,
    };

    await axios
      .post("/api/user/login", reqData, { withCredentials: true })
      .then(function (response) {
        responseData = response.data;
      })
      .catch(function (error) {})
      .then(function () {});

    setUser((prevValue) => ({
      ...prevValue,
      isLoading: false,
      ...responseData,
    }));
    return responseData;
  }

  async function checkIsAuthenticated() {
    setUser((prevValue) => ({ ...prevValue, isLoading: true }));
    let isAuthRes = false;

    await axios
      .get("/api/user/isAuthenticated", { withCredentials: true })
      .then(function (response) {
        isAuthRes = response.data.isAuthenticated;
      })
      .catch(function (error) {
        console.log(error);
      })
      .then(function () {});

    setUser((prevValue) => ({
      ...prevValue,
      isLoading: false,
      isAuthenticated: isAuthRes,
    }));
    return isAuthRes;
  }

  async function getUser() {
    setUser((prevValue) => ({ ...prevValue, isLoading: true }));
    let user;
    await axios
      .get("/api/user/getCurrentUser", { withCredentials: true })
      .then(function (response) {
        user = response.data;
      })
      .catch(function (error) {
        user = { isAuthenticated: false, details: {} };
        console.log(error);
      })
      .then(function () {});

    setUser((prevValue) => ({ ...prevValue, isLoading: false, ...user }));
    return user;
  }

  async function logoutUser() {
    setUser((prevValue) => ({ ...prevValue, isLoading: true }));

    await axios
      .get("/api/user/logout", { withCredentials: true })
      .then(function (response) {})
      .catch(function (error) {
        console.log(error);
      })
      .then(function () {});

    setUser((prevValue) => ({
      ...prevValue,
      isLoading: false,
      isAuthenticated: false,
    }));
  }
}

export default Auth;
