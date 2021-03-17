import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./EventList.css";
import { useQuery } from "urql";

const fetchEventQuery = `
  query($id: Float!) {
    event(id: $id) {
      id
      name
    }
  }
`;

const RelatedEvent = (props) => {
  const { id } = props;

  const [event, setEvent] = useState();
  const [fetchEventResult] = useQuery({
    query: fetchEventQuery,
    variables: { id: parseInt(id) },
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
      <div className="related-events">
        <div>
          {event && (
            <div>
              <Link className="event-link" to={`/events/${event.id}`}>{`${event.name}`}</Link>
            </div>
          )}
        </div>
      </div>
    </React.Fragment>
  );
};

export default RelatedEvent;
