import React from "react";
import { triangleConfig, flickerDotsConfig } from "./particlesConfig";
import Particles from "react-particles-js";

function AnimatedBackgroundComponent(props) {
  let config;

  if (props.config === "triangle") {
    config = triangleConfig;
  } else if (props.config === "flickerDots") {
    config = flickerDotsConfig;
  }

  return <Particles params={config} />;
}

export default AnimatedBackgroundComponent;
