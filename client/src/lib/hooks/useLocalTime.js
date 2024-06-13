import { AuthContext } from "@/components/context/AuthContext";
import moment from "moment-timezone";
import { useContext } from "react";

const useLocalTime = () => {
  const { user } = useContext(AuthContext);

  const inputTime = (createdAt, dateFormat, timeZone) => {
    let dateF = "";
    if (dateFormat) {
      dateF = dateFormat;
    }
    const detectedTimeZone = timeZone || moment.tz.guess();

    const timeFormat = user?.time_format === "12h" ? "h:mm A" : "HH:mm";

    const formattedTime = moment(createdAt)
      .tz(detectedTimeZone)
      .format(`${dateF} ${timeFormat}`);
    return formattedTime;
  };

  const fromNow = (createdAt, timeZone) => {
    if (createdAt === undefined) return null;
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
