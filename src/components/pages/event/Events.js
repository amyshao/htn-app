import React from "react";
import classNames from "classnames";
import styles from "./Events.css";

const Events = () => (
  <React.Fragment>
    <div className="events-page">
      <h1 className={classNames("text-center", "text-md-left", styles.header)}>
        Events here
      </h1>
    </div>
  </React.Fragment>
);

export default Events;
