import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Events.css";
import { useQuery } from "urql";
import useIsLoggedIn from "../../../hooks/login";

const fetchEventsQuery = `
  query {
    events {
      id
      name
      event_type
      permission
      start_time
      end_time
      description
      speakers {
        name
        profile_pic
      }
      public_url
      private_url
      related_events
    }
  }
`;

const parseDate = (unixTimestamp) => {
  var options = {
    weekday: "long",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  };
  const date = new Date(unixTimestamp);
  return date.toLocaleDateString("en-US", options);
};

const Events = () => {
  const { isLoggedIn } = useIsLoggedIn();
  const [events, setEvents] = useState([]);
  const [fetchEventsResult] = useQuery({
    query: fetchEventsQuery,
  });

  useEffect(() => {
    if (
      !fetchEventsResult.error &&
      !fetchEventsResult.fetching &&
      fetchEventsResult?.data?.events
    ) {
      const results = fetchEventsResult.data.events;
      setEvents(results);
    }
  }, [events, fetchEventsResult]);

  const sortedEvents = events.sort((a, b) => a.start_time - b.start_time);

  const allPublicEvents = sortedEvents.map((event) => {
    return (
      event.permission === "public" && (
        <div>
          <span>{parseDate(event.start_time)}</span>
          <Link to={`/events/${event.id}`}>{event.name}</Link>
        </div>
      )
    );
  });
  
  const allPrivateEvents = sortedEvents.map((event) => {
    return (
      event.permission === "private" && (
        <div>
          <span>{parseDate(event.start_time)}</span>
          <Link to={`/events/${event.id}`}>{event.name}</Link>
        </div>
      )
    );
  });

  return (
    <React.Fragment>
      <div className="events-page">
        {isLoggedIn ? (
          <div>
            <h1>Private Events</h1>
            <div>{allPrivateEvents}</div>
          </div>
        ) : (
          <span>Please log in to see hacker only events!</span>
        )}
        <h1>Public Events</h1>
        <div>{allPublicEvents}</div>
      </div>
    </React.Fragment>
  );
};

export default Events;
