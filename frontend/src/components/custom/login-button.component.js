import React from "react";
import styled from "styled-components";

const fireOpalColor = "#EF6461";
const eerieBlackColor = "#1c1f21";

const LoginButton = styled.button`
  font-family: "Montserrat", sans-serif;
  font-weight: bold;
  font-size: 1.3rem;
  letter-spacing: 0.1em;
  text-align: center;
  color: #fff;

  width: 310px;
  height: 60px;
  border-radius: 40px;
  background: ${(props) => (props.disabledButton ? "gray" : fireOpalColor)};
  border: 3px solid
    ${(props) => (props.disabledButton ? "gray" : fireOpalColor)};
  outline: none;
  transition: all 0.1s;
  box-shadow: inset 0 -0.6em 1em -0.35em rgba(0, 0, 0, 0.17),
    inset 0 0.6em 2em -0.3em rgba(255, 255, 255, 0.15),
    inset 0 0 0em 0.05em rgba(255, 255, 255, 0.12);

  &:hover {
    cursor: pointer;
  }

  &:active {
    box-shadow: inset 0 0.6em 2em -0.3em rgba(0, 0, 0, 0.15),
      inset 0 0 0em 0.05em rgba(255, 255, 255, 0.12);
  }
`;

export default LoginButton;
