import moment from "moment-timezone";

const useLocalTime = () => {
  // const inputTime = (createdAt, dateFormat, timeZone) => {
  //   let dateF = "";
  //   if (dateFormat) {
  //     dateF = dateFormat;
  //   }
  //   const detectedTimeZone = timeZone || moment.tz.guess(); // Use provided timeZone or detect it
  //   const momentObject = moment().tz(detectedTimeZone);
  //   // const is24HourFormat =
  //   //   zoneDetails.includes("a") || zoneDetails.includes("A");

  //   const is12HourFormat = momentObject._locale._meridiemParse.test("12:00am");

  //   console.log(is12HourFormat);
  //   const timeFormat = is12HourFormat ? "h:mm A" : "HH:mm";

  //   const formattedTime = moment(createdAt)
  //     .tz(detectedTimeZone)
  //     .format(`${dateF} ${timeFormat}`);
  //   return formattedTime;
  // };

  const inputTime = (createdAt, dateFormat, timeZone) => {
    let dateF = "";
    if (dateFormat) {
      dateF = dateFormat;
    }
    const detectedTimeZone = timeZone || moment.tz.guess(); // Use provided timeZone or detect it
    const momentObject = moment().tz(detectedTimeZone);

    // Check if the locale's default formatting uses AM/PM indicators
    const is12HourFormat =
      momentObject.format("LT").includes("a") ||
      momentObject.format("LT").includes("A");

    const timeFormat = is12HourFormat ? "h:mm A" : "HH:mm";

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
