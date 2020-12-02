import React from "react";
import Button from "../custom/custom-button.component";
import Navbar from "../navbar/navbar.component";
import { useHistory } from "react-router-dom";
import "./home-page.css";
import AnimatedBackgroundComponent from "../animatedBackground/animatedBackground.component";

function HomePage() {
  const fireOpalColor = "#EF6461";
  const eerieBlackColor = "#1c1f21";

  const onMobile = window.innerWidth < 960 ? true : false;

  const history = useHistory();

  const redirectToLogin = (isOrganizer) => {
    history.push({
      pathname: "/login",
      state: { isOrganizer: isOrganizer },
    });
  };

  return (
    <div className="page-section">
      <div className="home-page-particles-container">
        <AnimatedBackgroundComponent config="triangle" />
      </div>

      <Navbar />

      <h1 className="home-heading">participate now</h1>
      <div className="home-buttons">
        <div className="student-button">
          {onMobile ? (
            <Button background onClick={() => redirectToLogin(false)} big>
              I'm a student
            </Button>
          ) : (
            <Button background onClick={() => redirectToLogin(false)}>
              I'm a student
            </Button>
          )}
        </div>
        <div className="organizer-button">
          {onMobile ? (
            <Button onClick={() => redirectToLogin(true)} big>
              I'm an organizer
            </Button>
          ) : (
            <Button onClick={() => redirectToLogin(true)}>
              I'm an organizer
            </Button>
          )}
        </div>
      </div>

      <img
        className="home-page-left-img"
        src="images/home-page/home-screen-left-illustration.png"
        alt="illustration"
      />

      <img
        className="home-page-right-img"
        src="images/home-page/home-screen-right-illustration.png"
        alt="illustration"
      />
    </div>
  );
}

export default HomePage;
