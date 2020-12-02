import styled from "styled-components";

const GoogleLoginButton = styled.button`
  font-family: "Montserrat", sans-serif;
  font-weight: 500;
  font-size: 1.1rem;
  letter-spacing: 0.1em;
  text-align: center;
  color: black;

  vertical-align: middle;
  align-content: center;
  width: 310px;
  height: 60px;
  border-radius: 40px;
  background: white;
  border: 3px solid white;
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

export default GoogleLoginButton;
