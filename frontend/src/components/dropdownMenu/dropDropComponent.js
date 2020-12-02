import React, { useState } from "react";
import "./dropDownComponent.css";

function DropDownMenu(props) {
  const list = [
    "PES University",
    "hi",
    "hi1",
    "hi2",
    "hi3",
    "hi4",
    "hi5",
    "hi6",
    "hi7",
  ];

  const [showDropDown, setShowDropDown] = useState(true);

  const [currentValue, setCurrentValue] = useState("");

  function handleSelect(event) {
    setCurrentValue(event.target.getAttribute("value"));
    props.setSelected({
      name: props.name,
      value: event.target.getAttribute("value"),
    });
    setShowDropDown(!showDropDown);
  }

  function createListItem(item) {
    return (
      <li key={item} onClick={handleSelect} value={item}>
        {item}
      </li>
    );
  }

  return (
    <>
      <div className="drop-down-menu-container">
        <span className="drop-down-menu-heading">{props.heading}</span>
        <div
          className="drop-down-menu-button"
          onClick={() => {
            setShowDropDown(!showDropDown);
          }}
        >
          <span className="drop-down-menu-selected-option">{currentValue}</span>
          <div className="drop-down-menu-icon">
            {showDropDown ? (
              <i className="fas fa-chevron-down"></i>
            ) : (
              <i className="fas fa-chevron-up"></i>
            )}
          </div>
        </div>
        <div
          className={
            showDropDown
              ? "drop-down-list-container hidden"
              : "drop-down-list-container"
          }
        >
          <ul className="drop-down-ul">{props.list.map(createListItem)}</ul>
        </div>
      </div>
    </>
  );
}

export default DropDownMenu;

//<i class="fas fa-chevron-down"></i>
//<i class="fas fa-chevron-up"></i>
