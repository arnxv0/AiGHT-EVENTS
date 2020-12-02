import React from "react";
import LoadingIcon from "../loadingStuff/loading.component";
import "./loading-page.css";

function LoadingPage(props) {
  return (
    <>
      <div className="loading-page-background">
        <div className="loading-icon">
          <LoadingIcon />
        </div>
      </div>
    </>
  );
}

export default LoadingPage;
