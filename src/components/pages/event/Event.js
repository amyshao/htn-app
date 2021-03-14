import React from "react";
import classNames from "classnames";
import styles from "./Event.css";

const Event = () => (
  <React.Fragment>
    <div className="events-page">
      <h1 className={classNames("text-center", "text-md-left", styles.header)}>
        This is an event
      </h1>
    </div>
  </React.Fragment>
);

export default Event;
