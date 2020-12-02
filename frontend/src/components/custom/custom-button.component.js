import React from "react";
import styled from "styled-components";

const fireOpalColor = "#EF6461";
const eerieBlackColor = "#1c1f21";

const Button = styled.button`
  font-family: "Montserrat", sans-serif;
  font-weight: bold;
  font-size: ${(props) => (props.big ? "1.7rem" : "1.2rem")};
  letter-spacing: 0.1em;
  text-align: center;
  color: #fff;

  padding: 20px 34px;
  width: ${(props) => (props.big ? "350px" : "270px")};
  border-radius: 20px;
  background: ${(props) =>
    props.background ? fireOpalColor : eerieBlackColor};
  border: 3px solid
    ${(props) => (props.borderColor ? eerieBlackColor : fireOpalColor)};
  outline: none;
  transition: all 0.1s;
  box-shadow: inset 0 -0.6em 1em -0.35em rgba(0, 0, 0, 0.17),
    inset 0 0.6em 2em -0.3em rgba(255, 255, 255, 0.15),
    inset 0 0 0em 0.05em rgba(255, 255, 255, 0.12);

  &:hover {
    background-color: ${(props) =>
      props.hoverBackground ? eerieBlackColor : fireOpalColor};
    cursor: pointer;
  }

  &:active {
    box-shadow: inset 0 0.6em 2em -0.3em rgba(0, 0, 0, 0.15),
      inset 0 0 0em 0.05em rgba(255, 255, 255, 0.12);
  }
`;

export default Button;
