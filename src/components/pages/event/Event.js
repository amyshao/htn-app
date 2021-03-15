import React, { useEffect, useState } from "react";
import "./Events.css";
import { useQuery } from "urql";
import useIsLoggedIn from "../../../hooks/login";
import RelatedEvent from './RelatedEvent';

const fetchEventQuery = `
  query($id: Float!) {
    event(id: $id) {
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

const Event = (props) => {
  const { eventId } = props;
  const { isLoggedIn } = useIsLoggedIn();
  const [event, setEvent] = useState();
  const [fetchEventResult] = useQuery({
    query: fetchEventQuery,
    variables: { id: parseInt(eventId) },
  });

  useEffect(() => {
    if (
      !fetchEventResult.error &&
      !fetchEventResult.fetching &&
      fetchEventResult?.data?.event
    ) {
      const result = fetchEventResult.data.event;
      setEvent(result);
    }
  }, [event, fetchEventResult]);

  return (
    <React.Fragment>
      <div className="events-page">
        {event &&
          (event.permission === "private" && !isLoggedIn ? (
            <span>Please log in to view this event.</span>
          ) : (
            <div>
              <h1>{event.name}</h1>
              <h2>{event.start_time}</h2>
              <span>{event.description}</span>
              <h2>Related Events:</h2>
              {event.related_events.map(id => {
                return <RelatedEvent id={id}/>
              })}
            </div>
          ))}
      </div>
    </React.Fragment>
  );
};

export default Event;
