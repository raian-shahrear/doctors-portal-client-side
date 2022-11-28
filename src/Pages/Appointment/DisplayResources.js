import React from "react";

const DisplayResources = ({ resource, setServices }) => {
  return (
    <div className="card bg-base-100 shadow-xl">
      <div className="card-body justify-center items-center">
        <h2 className="card-title text-secondary">{resource?.name}</h2>
        <p className="font-semibold">
          {resource?.slots.length > 0 ? resource?.slots[0] : "Try for another day"}
        </p>
        <p>{`${resource?.slots?.length > 0 ? resource?.slots?.length : "NO"} ${
          resource?.slots?.length > 1 ? "Spaces" : "Space"
        } Available`}</p>
        <p className="text-xl font-bold">Price: <span className="text-primary">${resource?.price}</span></p>
        <div className="card-actions justify-center mt-4">
          <label
            disabled={resource?.slots?.length > 0 ? false : true}
            onClick={() => setServices(resource)}
            htmlFor="treatment-modal"
            className="btn bg-gradient-to-r from-secondary to-primary border-none text-white transition-all duration-300 hover:bg-gradient-to-r hover:from-primary hover:to-secondary"
          >
            Book Appointment
          </label>
        </div>
      </div>
    </div>
  );
};

export default DisplayResources;
