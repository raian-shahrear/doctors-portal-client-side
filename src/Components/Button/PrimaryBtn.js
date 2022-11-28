import React from "react";

const PrimaryBtn = ({ children, customClass }) => {
  return (
    <button
      className={`btn bg-gradient-to-r from-secondary to-primary border-none text-white transition-all duration-300 hover:bg-gradient-to-r hover:from-primary hover:to-secondary ${customClass}`}
    >
      {children}
    </button>
  );
};

export default PrimaryBtn;
