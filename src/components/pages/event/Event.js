import React, { useEffect, useState } from "react";
import "./Event.css";
import { useQuery } from "urql";
import useIsLoggedIn from "../../../hooks/login";
import RelatedEvent from "./RelatedEvent";
import {
  parseType,
  parseSpeakers,
  parseDate,
  parseImage,
} from "../../../support/parse";

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

const detailRow = (label, value) => (
  <tr>
    <td className="label">
      <span>{label}</span>
    </td>
    <td>{value}</td>
  </tr>
);

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

  console.log(event && event.permission);
  console.log("isLoggedin: ", isLoggedIn)

  return (
    <React.Fragment>
      <div className="event-page">
        {event &&
          (event.permission === "private" && !isLoggedIn ? (
            <span>Please log in to view this event.</span>
          ) : (
            <div className="event-container">
              <h2>{event.name}</h2>
              {parseImage(event.speakers)}
              <table>
                {detailRow(
                  "Time: ",
                  parseDate(event.start_time, event.end_time)
                )}
                {detailRow("Type: ", parseType(event.event_type))}
                {detailRow("Description: ", event.description)}
                {parseSpeakers(event.speakers) !== '' && detailRow("Speakers: ", parseSpeakers(event.speakers))}
                {event.public_url && detailRow("Public Link: ", <a href={event.public_url}>{event.public_url}</a>)}
                {isLoggedIn && event.private_url &&  detailRow("Hacker Link: ", <a href={event.private_url}>{event.private_url}</a>)}
                <br />
                {detailRow(
                  "Related Events: ",
                  event.related_events.map((id) => {
                    return <RelatedEvent id={id} />;
                  })
                )}
              </table>
            </div>
          ))}
      </div>
    </React.Fragment>
  );
};

export default Event;
