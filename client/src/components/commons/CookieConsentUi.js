import React from "react";

const CookieConsentUi = ({ handleAccept, handleClose, handleDecline }) => {
  return (
    <div className="fixed bottom-0 left-0 w-full bg-pm/95 border-t-2 border-pm text-white p-4 flex justify-between items-center !z-[9999999999]">
      <div className="container flex justify-between items-center gap-2">
        <div className="flex-grow">
          <p className="text-[14px] font-medium font-inter leading-normal">
            Our website uses cookies to enhance your experience. To provide
            tailored services and personalize your browsing experience, we
            utilize cookies while protecting your privacy. You can adjust your
            preferences anytime by clicking{" "}
            <span className="text-red-600 font-bold">'Change Settings'</span> in
            the Privacy Policy.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleDecline}
            className="bg-red-500 hover:bg-red-700 text-white py-2 px-4 rounded font-semibold text-[14px] leading-normal font-inter"
          >
            Reject
          </button>
          <button
            onClick={handleAccept}
            className="bg-white hover:bg-pmd border !border-gray-100 text-pm py-2 px-4 rounded font-semibold text-[14px] leading-normal font-inter"
          >
            Agree
          </button>
        </div>
      </div>
      <button
        onClick={handleClose}
        className="text-white text-xl font-bold focus:outline-none"
      >
        ×
      </button>
    </div>
  );
};

export default CookieConsentUi;
