import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import CookieConsentUi from "./CookieConsentUi";

const CookieConsent = () => {
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const consent = Cookies.get("cookieConsent");
    if (!consent) {
      setIsVisible(true);
    }
  }, []);

  const handleAccept = () => {
    Cookies.set("cookieConsent", "accepted", { expires: 365 });
    setIsVisible(false);
  };

  const handleDecline = () => {
    Cookies.set("cookieConsent", "declined", { expires: 365 });
    setIsVisible(false);
  };

  const handleClose = () => {
    setIsVisible(false);
  };

  if (!isVisible) {
    return null;
  }

  return (
    <CookieConsentUi
      handleAccept={handleAccept}
      handleClose={handleClose}
      handleDecline={handleDecline}
    />
  );
};

export default CookieConsent;
