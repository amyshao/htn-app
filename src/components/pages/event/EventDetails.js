import React from "react";
import { Link } from "react-router-dom";
import "./Events.css";
import useIsLoggedIn from "../../../hooks/login";


const EventDetails = (data) => {
  const { isLoggedIn } = useIsLoggedIn();

  return (
    <React.Fragment>
      <div className="events-page">
        {data.permission === "private" && !isLoggedIn ? (
          <span>Please log in to view this event.</span>
        ) : (
          <div>
            <h1>{data.name}</h1>
            <h2>{data.start_time}</h2>
            <span>{data.description}</span>
            {data.related_events.map((id) => {
              <Link to={`/events/${id}`}>{`${id} `}</Link>
            })}
          </div>
        )}
      </div>
    </React.Fragment>
  );
};

export default EventDetails;
