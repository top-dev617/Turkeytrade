import React from "react";
import styles from "@/styles/WelcomeModal.module.css";

const WelcomeModal = () => {
  const handleClose = () => {
    localStorage.removeItem("welcomeModal");
  };
  return (
    <div>
      <div
        className="modal fade"
        id="exampleModalToggle1"
        aria-hidden="true"
        aria-labelledby="exampleModalToggleLabel"
        tabIndex="-1"
        data-backdrop="static"
      >
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className={`modal-content ${styles.modalContentContainer}`}>
            <div className={`modal-header ${styles.modalHeader}`}>
              <h1 className="modal-title fs-5" id="exampleModalToggleLabel">
                Welcome to Tukeytrademarket!
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={handleClose}
              ></button>
            </div>
            <div className={`modal-body ${styles.bodyContainer}`}>
              <p style={{ marginBottom: "30px" }}>
                We are delighted to have you on board. Here on our platform, you
                can discover quality products from Turkey and also promote your
                own if you are a Turkish supplier.
              </p>

              <p>
                Thank you for choosing Turkeytrademarket. Together, we create
                successful business opportunities!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeModal;
