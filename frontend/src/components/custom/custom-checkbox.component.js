import React from "react";
import "./custom-checkbox.css";

function CustomCheckBox(props) {
  return (
    <div
      className="custom-checkbox"
      onClick={props.handleCheckBoxInput}
      id={props.id}
      unselectable="on"
    >
      {props.checked && "✓"}
    </div>
  );
}

export default CustomCheckBox;
