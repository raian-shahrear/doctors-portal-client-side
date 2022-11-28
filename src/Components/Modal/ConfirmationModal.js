import React from "react";

const ConfirmationModal = ({title, message, closeModal, successAction, successData}) => {
  return (
    <div>
      <input type="checkbox" id="confirmation-modal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">
            {title}
          </h3>
          <p className="py-4">
            {message}
          </p>
          <div className="modal-action gap-5">
            <label onClick={() => successAction(successData)} htmlFor="confirmation-modal" className="btn btn-outline btn-sm">
              Ok
            </label>
            <label onClick={closeModal} htmlFor="confirmation-modal" className="btn btn-sm">
              Close
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
