import styled from "styled-components";

const NewEventButton = styled.button`
  font-family: "Montserrat", sans-serif;
  font-weight: normal;
  font-size: 2.5rem;
  letter-spacing: 0.1em;
  text-align: center;
  color: #fff;

  width: 80%;
  height: 80px;
  border-radius: 40px;
  margin-left: 40px;
  margin-bottom: 40px;
  background: none;
  border: 4px solid white;
  outline: none;
  transition: all 0.3s;

  &:hover {
    background-color: white;
    color: black;
    cursor: pointer;
  }
`;

export default NewEventButton;
