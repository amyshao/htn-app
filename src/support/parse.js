import Moment from "react-moment";
import "moment-timezone";

export const parseType = (type) => {
  if (type === "tech_talk") return "Tech Talk";
  if (type === "workshop") return "Workshop";
  if (type === "activity") return "Activity";
};

export const parseSpeakers = (speakers) => {
  var speakersFormatted = "";
  speakers.forEach((speaker) => {
    speakersFormatted += ` ${speaker.name}`;
  });
  return speakersFormatted;
};

// unix time params in ms
export const parseDate = (start, end) => {
  return (
    <div>
      <Moment tz="America/Toronto" format="MMM D YYYY" unix>
        {new Date(start / 1000)}
      </Moment>
      <br />
      <br />
      <Moment tz="America/Toronto" format="h:mm" unix>
        {new Date(start / 1000)}
      </Moment>
      <span> - </span>
      <Moment tz="America/Toronto" format="h:mm" unix>
        {new Date(end / 1000)}
      </Moment>
    </div>
  );
};

export const parseImage = (speakers) => (
  <div>
    {speakers.map((speaker) => {
      return <image url={speaker.profile_pic}></image>;
    })}
  </div>
);
