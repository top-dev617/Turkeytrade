import moment from "moment-timezone";

const useLocalTime = () => {
  const inputTime = (createdAt, dateFormat, timeZone) => {
    let dateF = "";
    if (dateFormat) {
      dateF = dateFormat;
    }
    const detectedTimeZone = timeZone || moment.tz.guess(); // Use provided timeZone or detect it
    const is24HourFormat = moment()
      .tz(detectedTimeZone)
      .format("LT")
      .includes("H");
    const timeFormat = is24HourFormat ? "HH:mm A" : "h:mm A";

    const formattedTime = moment(createdAt)
      .tz(detectedTimeZone)
      .format(`${dateF} ${timeFormat}`);
    return formattedTime;
  };

  const fromNow = (createdAt, timeZone) => {
    const detectedTimeZone = timeZone || moment.tz.guess();
    const formattedFromNow = moment(createdAt).tz(detectedTimeZone).fromNow();
    return formattedFromNow;
  };

  return {
    inputTime,
    fromNow,
  };
};

export default useLocalTime;
