import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import axios from "axios";
import LoadingPage from "./loading-page";
import "./viewEvent-page.css";

function ViewEventPage(props) {
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const [eventDetails, setEventDetails] = useState({});
  const { id } = useParams();

  useEffect(() => {
    async function getEvent() {
      await axios
        .get("/api/event/getEvent/" + id)
        .then((response) => {
          setEventDetails(response.data.event);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
        });
    }

    if (location.state) {
      setEventDetails(location.state.eventDetails);
      setLoading(false);
    } else {
      getEvent();
    }
  }, [location]);

  if (loading) {
    return <LoadingPage />;
  }

  function handleRegisterButtonClick() {
    window.open(eventDetails.formLink, "_blank");
  }

  return (
    <>
      <div className="view-page-container">
        <div className="title-icon-container">
          <div className="icon-placeholder"></div>
          <span className="view-page-title-heading-text">
            {eventDetails.title}
          </span>
        </div>
        <h2 className="view-event-description">Description:</h2>
        <p className="view-event-description-text">
          {eventDetails.description}
        </p>
        <button
          className="view-event-page-form-button"
          onClick={handleRegisterButtonClick}
        >
          REGISTER
        </button>
      </div>
    </>
  );
}

export default ViewEventPage;

/*Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Nibh sit
          amet commodo nulla. A scelerisque purus semper eget duis at tellus.
          Nam at lectus urna duis convallis convallis tellus id interdum.
          Consectetur adipiscing elit pellentesque habitant morbi. Et tortor at
          risus viverra adipiscing at in. Viverra suspendisse potenti nullam ac
          tortor vitae purus. Diam quam nulla porttitor massa id neque aliquam
          vestibulum morbi. Aenean pharetra magna ac placerat vestibulum lectus.
          Vel eros donec ac odio tempor orci dapibus. Et netus et malesuada
          fames. Lectus nulla at volutpat diam ut venenatis tellus in metus.
          Arcu bibendum at varius vel pharetra vel turpis nunc. Pulvinar etiam
          non quam lacus suspendisse faucibus interdum posuere lorem. Phasellus
          vestibulum lorem sed risus ultricies tristique nulla. Nunc sed velit
          dignissim sodales ut eu sem integer. Egestas congue quisque egestas
          diam in arcu. Et tortor consequat id porta nibh venenatis cras sed
          felis. Turpis nunc eget lorem dolor sed viverra ipsum nunc aliquet.
          Tortor at risus viverra adipiscing at in. Donec ultrices tincidunt
          arcu non sodales neque sodales ut. Cras adipiscing enim eu turpis.
          Arcu odio ut sem nulla pharetra diam sit amet nisl. Ultricies leo
          integer malesuada nunc vel. Risus sed vulputate odio ut enim blandit
          volutpat maecenas. Orci porta non pulvinar neque. Ut morbi tincidunt
          augue interdum.*/
