import Link from "next/link";
import React from "react";

const RegistrationSuccess = ({ closeModalRef }) => {
  const handleClose = () => {
    closeModalRef.current.click();
  };
  return (
    <div>
      <div style={{ gap: "26px" }} className="d-flex flex-column">
        <h3>
          Thank you for applying to become a seller on <br /> Turkeytrademarket!
        </h3>
        <div>
          <p>
            We appreciate your interest in joining our platform. Rest assured
            that we have received your submission, and our team will now review
            the information provided. The verification process typically takes
            1-4 days, and we will notify you as soon as it is complete. <br />{" "}
            <br /> In the meantime, if you have any questions or need further
            assistance, feel free to reach out to our support team. We look
            forward to welcoming you as a verified seller and helping you
            explore new opportunities in the marketplace. <br /> <br /> Best
            regards,
          </p>
        </div>
        <h5>The Turkeytrademarket Team</h5>
        <Link className="mx-auto" href="/">
          <button onClick={handleClose} className="register_btn">
            Back to Turkeytrademarket
          </button>
        </Link>
      </div>
    </div>
  );
};

export default RegistrationSuccess;
