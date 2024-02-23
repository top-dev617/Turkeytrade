import moment from "moment-timezone";

const useLocalTime = () => {
  const inputTime = (createdAt, dateFormat, timeZone) => {
    let dateF = "";
    if (dateFormat) {
      dateF = dateFormat;
    }
    const detectedTimeZone = timeZone || moment.tz.guess();
    console.log(detectedTimeZone);

    const d = new Date();
    const fTime = d.toLocaleTimeString();
    const is24HourFormat = !fTime.includes("AM") && !fTime.includes("PM");

    const timeFormat = is24HourFormat ? "HH:mm" : "h:mm A";

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
