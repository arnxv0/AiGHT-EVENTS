import React from "react";
import { useHistory } from "react-router-dom";
import "./eventCard.css";

function EventCard(props) {
  const history = useHistory();

  function handleViewEventClick() {
    const path = "/event/view/" + props.eventDetails._id;
    history.push({
      pathname: path,
      state: { eventDetails: props.eventDetails },
    });
  }

  return (
    <>
      <div className="event-card-container">
        <div className="event-icon"></div>
        <h1 className="event-title">{props.eventDetails.title}</h1>
        <button className="read-more-button" onClick={handleViewEventClick}>
          Read More...
        </button>
      </div>
    </>
  );
}

//{props.eventDetails.title}
///event/view/20102901

export default EventCard;
