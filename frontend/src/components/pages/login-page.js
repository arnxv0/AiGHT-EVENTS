import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import { useHistory, useLocation } from "react-router-dom";
import CustomInput from "../custom/custom-input.component";
import Navbar from "../navbar/navbar.component";
import LoginButton from "../custom/login-button.component";
import GoogleLoginButton from "../custom/google-login-button.component";
import "./login-page.css";
import UserContext from "../../contexts/userContext";
import LoadingIcon from "../loadingStuff/loading.component";
import AnimatedBackgroundComponent from "../animatedBackground/animatedBackground.component";

axios.defaults.withCredentials = true;

function LoginPage(props) {
  const location = useLocation();
  const history = useHistory();
  const { user, setUser } = useContext(UserContext);

  const [loading, setLoading] = useState(true);
  const [validDeatils, setValidDetails] = useState(true);

  const isOrganizer = location.state ? location.state.isOrganizer : false;

  const [userDetails, setUserDetails] = useState({
    loginEmail: "",
    loginPassword: "",
    registerEmail: "",
    registerPassword: "",
    confirmPassword: "",
    isOrganizer: isOrganizer,
  });

  // location.state.isOrganizer ? "true" : "false"

  function handleInput(event) {
    const callerName = event.target.name;
    const callerValue = event.target.value;

    setUserDetails((prevValue) => ({
      ...prevValue,
      [callerName]: callerValue,
    }));
  }

  /////////////////////////////////////////////////////////////Login methods////////////////////////////////////////////////////
  async function loginUser(loginUser) {
    setUser((prevValue) => ({ ...prevValue, isLoading: true }));
    let responseData = { isSuccessful: false };
    let reqData = {
      username: loginUser.loginEmail,
      email: loginUser.loginEmail,
      password: loginUser.loginPassword,
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

  async function googleLogin() {
    history.push({
      pathname: "/auth/google",
    });
    window.location.reload();
  }

  /////////////////////////////////////////////////////////////Login methods////////////////////////////////////////////////////

  async function handleSubmit(submitType) {
    if (!validDeatils) {
      //popup
    } else if (submitType === "register") {
      registerUser(userDetails).then((value) => {
        if (value.isSuccessful) {
          history.push({
            pathname: "/dashboard",
          });
        } else {
          //popup
          console.log("failed");
        }
      });
    } else if (submitType === "login") {
      loginUser(userDetails).then((value) => {
        if (value.isSuccessful) {
          history.push({
            pathname: "/dashboard",
          });
        } else {
          //popup
        }
      });
    }
  }

  useEffect(() => {
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();

    async function checkAuth() {
      await axios
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
        });
    }

    checkAuth();
    return () => {
      source.cancel();
    };
  }, []);

  if (user.isAuthenticated) {
    history.push("/dashboard");
  }

  return (
    <div className="login-page-container">
      <div className="login-page-particles-container">
        <AnimatedBackgroundComponent config="triangle" />
      </div>

      <Navbar />

      <div className="login-page-section">
        {isOrganizer === false ? (
          <>
            <div className="register-section">
              <span className="login-titles">REGISTER</span>
              <div className="login-page-inputs-section">
                <div className="login-page-input">
                  <CustomInput
                    placeholder="Email"
                    type="email"
                    name="registerEmail"
                    onChange={handleInput}
                    value={userDetails.registerEmail}
                  />
                </div>

                <div className="login-page-input">
                  <CustomInput
                    placeholder="Password"
                    type="password"
                    name="registerPassword"
                    onChange={handleInput}
                    value={userDetails.registerPassword}
                  />
                </div>

                <div className="login-page-input">
                  <CustomInput
                    placeholder="Confirm Password"
                    type="password"
                    name="confirmPassword"
                    onChange={handleInput}
                    value={userDetails.confirmPassword}
                  />
                </div>

                <LoginButton
                  onClick={() => {
                    handleSubmit("register");
                  }}
                >
                  {user.isLoading ? <LoadingIcon /> : "Sign Up"}
                </LoginButton>
              </div>
              <GoogleLoginButton
                className="google-button"
                onClick={googleLogin}
              >
                <i className="fab fa-google fa-2x google-icon"></i>
                <span>Sign up with Google</span>
              </GoogleLoginButton>
            </div>
            <div className="login-divider"></div>
          </>
        ) : (
          <></>
        )}

        <div className="login-section">
          <span className="login-titles">LOGIN</span>
          <div className="login-page-inputs-section">
            <div className="login-page-input">
              <CustomInput
                placeholder="Email"
                type="email"
                name="loginEmail"
                onChange={handleInput}
                value={userDetails.loginEmail}
              />
            </div>

            <div className="login-page-input">
              <CustomInput
                placeholder="Password"
                type="password"
                name="loginPassword"
                onChange={handleInput}
                value={userDetails.loginPassword}
              />
            </div>

            <LoginButton
              onClick={() => {
                handleSubmit("login");
              }}
            >
              {user.isLoading ? <LoadingIcon /> : "Sign In"}
            </LoginButton>
          </div>
          {isOrganizer ? (
            <>
              <span className="dont-have-an-account-text">
                Need an organizer account?
                <span className="email-us-organizer-text"> Email us</span>
              </span>
            </>
          ) : (
            <GoogleLoginButton className="google-button" onClick={googleLogin}>
              <i className="fab fa-google fa-2x google-icon"></i>
              <span>Sign in with Google</span>
            </GoogleLoginButton>
          )}
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
