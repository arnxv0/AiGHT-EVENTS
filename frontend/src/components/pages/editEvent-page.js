import React from "react";
import { useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import DropDownMenu from "../dropdownMenu/dropDropComponent";
import LoadingIcon from "../loadingStuff/loading.component";
import axios from "axios";
import "./editEvent-page.css";

function EditEventPage() {
  const history = useHistory();
  const location = useLocation();
  const [newEventDetails, setNewEventDetails] = useState({});
  const [createEventLoading, setCreateEventLoading] = useState(false);
  function eventDetailsChangeHandler(event) {
    const callerName = event.target ? event.target.name : event.name;
    const callerValue = event.target ? event.target.value : event.value;
    setNewEventDetails((prevValue) => ({
      ...prevValue,
      [callerName]: callerValue,
    }));
  }

  async function createEvent() {
    setCreateEventLoading(true);
    await axios
      .post("/api/event/add", newEventDetails)
      .then((response) => {
        console.log(response);
        if (response.data.isSuccessful == true) {
          history.push({
            pathname: "/dashboard",
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <>
      <div className="edit-page-container">
        <h1 className="edit-page-heading-text">Title</h1>
        <input
          type="text"
          name="title"
          className="title-input"
          value={newEventDetails.title ? newEventDetails.title : ""}
          onChange={eventDetailsChangeHandler}
        />
        <h1 className="edit-page-heading-text">Description</h1>
        <textarea
          name="description"
          className="description-input"
          value={newEventDetails.description ? newEventDetails.description : ""}
          onChange={eventDetailsChangeHandler}
        ></textarea>
        <div className="edit-event-dropdown-button-container">
          <DropDownMenu
            heading="College"
            name="college"
            setSelected={eventDetailsChangeHandler}
            list={location.state.collegeList}
          />
        </div>
        <div className="edit-event-dropdown-button-container">
          <DropDownMenu
            heading="Category"
            name="category"
            setSelected={eventDetailsChangeHandler}
            list={location.state.categoryList}
          />
        </div>
        <h1 className="edit-page-heading-text">Form Link</h1>
        <input
          type="text"
          name="formLink"
          className="form-link-input"
          value={newEventDetails.formLink ? newEventDetails.formLink : ""}
          onChange={eventDetailsChangeHandler}
        />
        <button className="edit-event-page-form-button" onClick={createEvent}>
          {createEventLoading ? "Loading..." : "CREATE EVENT"}
        </button>
      </div>
    </>
  );
}

export default EditEventPage;
