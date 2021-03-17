import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Events.css";
import { useQuery } from "urql";
import useIsLoggedIn from "../../../hooks/login";
import { parseType, parseSpeakers, parseDate } from "../../../support/parse";

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

const formatRows = (event) => (
  <tr>
    <td>
      {parseDate(event.start_time, event.end_time)}
    </td>
    <td>
      <Link className="event-link" to={`/events/${event.id}`}>
        {event.name}
      </Link>
      <br />
      <br />
      <span>{`Type: ${parseType(event.event_type)}`}</span>
      <br />
      {event.speakers !== undefined && event.speakers.length !== 0 && (
        <span>{`Speakers: ${parseSpeakers(event.speakers)}`}</span>
      )}
    </td>
  </tr>
);

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

  const PublicEventsTable = (
    <table>
      {sortedEvents.map(
        (event) => event.permission === "public" && formatRows(event)
      )}
    </table>
  );

  const PrivateEventsTable = (
    <table>
      {sortedEvents.map(
        (event) => event.permission === "private" && formatRows(event)
      )}
    </table>
  );

  return (
    <React.Fragment>
      <div className="events-page">
        {isLoggedIn ? (
          <div>
            <h1>Private Events</h1>
            <div>{PrivateEventsTable}</div>
          </div>
        ) : (
          <span>Please log in to see hacker only events!</span>
        )}
        <br /><br />
        <h1>Public Events</h1>
        <div>{PublicEventsTable}</div>
      </div>
    </React.Fragment>
  );
};

export default Events;
