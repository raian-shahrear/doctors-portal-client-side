import React from "react";
import bgAppointment from "../../assets/images/appointment.png";
import doctorSm from "../../assets/images/doctor-small.png";
import PrimaryBtn from "../../Components/Button/PrimaryBtn";

const AppointmentToday = () => {
  return (
    <section>
      <div
        className="pt-20 md:pt-0"
        style={{
          background: `url(${bgAppointment})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
          width: "100%",
          marginBottom: "84px",
        }}
      >
        <div className="hero">
          <div className="hero-content py-0 -mt-20 flex-col-reverse lg:flex-row-reverse items-center justify-center">
            <div className="text-white w-full lg:w-1/2">
              <div className="my-5">
                <h4 className="text-xl uppercase font-bold text-secondary">
                  our services
                </h4>
                <h2 className="text-4xl">Service We Provide</h2>
              </div>
              <p>
                It is a long established fact that a reader will be distracted
                by the readable content of a page when looking at its layout.
                The point of using Lorem Ipsumis that it has a more-or-less
                normal distribution of letters,as opposed to using 'Content
                here, content here', making it look like readable English. Many
                desktop publishing packages and web page
              </p>
              <div className="my-6">
                <PrimaryBtn>Book An Appointment</PrimaryBtn>
              </div>
            </div>
            <div className="card hidden md:block w-full lg:w-1/2">
              <img src={doctorSm} alt="doctor" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AppointmentToday;
