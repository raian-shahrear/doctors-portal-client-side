import React from "react";
import bgAppointment from "../../assets/images/appointment.png";
import PrimaryBtn from "../../Components/Button/PrimaryBtn";

const Contact = () => {
  return (
    <section
      className="flex justify-center"
      style={{
        background: `url(${bgAppointment})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        width: "100%"
      }}
    >
      <div className="flex flex-col w-2/4 p-6 rounded-md sm:p-10">
        <div className="text-center mb-16 text-white">
          <h4 className="text-xl uppercase font-bold text-secondary">
            Contact
          </h4>
          <h2 className="text-4xl">Service We Provide</h2>
        </div>
        <form className="space-y-12">
          <div className="space-y-4">
            <div>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Email address"
                className="w-full px-3 py-2 border rounded-md border-gray-700 bg-white text-gray-500"
              />
            </div>
            <div>
              <input
                type="text"
                name="subject"
                id="subject"
                placeholder="Subject"
                className="w-full px-3 py-2 border rounded-md border-gray-700 bg-white text-gray-500"
              />
            </div>
            <div>
              <textarea
                type="text"
                name="subject"
                id="subject"
                placeholder="Your message"
                className="w-full px-3 py-2 border rounded-md border-gray-700 bg-white text-gray-500"
              />
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex justify-center">
              <PrimaryBtn customClass={`px-10`}>Submit</PrimaryBtn>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Contact;
