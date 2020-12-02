import React from "react";
import "./loading.component.css";

function LoadingIcon(props) {
  return (
    <>
      <div className={props.black ? "lds-ellipsis black" : "lds-ellipsis"}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </>
  );
}

export default LoadingIcon;
