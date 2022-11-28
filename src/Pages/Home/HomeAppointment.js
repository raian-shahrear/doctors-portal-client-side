import React from "react";
import img1 from "../../assets/icons/clock.svg";
import img2 from "../../assets/icons/marker.svg";
import img3 from "../../assets/icons/phone.svg";

const HomeAppointment = () => {
  const appointmentInfo = [
    {
      _id: 1,
      image: img1,
      title: "Opening Hours",
      details: "Lorem Ipsum is simply dummy text of the pri",
      background: "bg-gradient-to-r from-secondary to-primary",
    },
    {
      _id: 2,
      image: img2,
      title: "Visit our location",
      details: "Brooklyn, NY 10036, United States",
      background: "bg-accent",
    },
    {
      _id: 3,
      image: img3,
      title: "Contact us now",
      details: "+000 123 456789",
      background: "bg-gradient-to-r from-secondary to-primary",
    },
  ];

  return (
    <section className="mb-32 -mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
      {appointmentInfo.map((info) => (
        <div key={info._id}>
          <div className={`flex items-center flex-col md:flex-row text-center md:text-left rounded-md text-white h-full px-6 py-10 ${info.background}`}>
            <img src={info.image} alt="appointment-icon" className="w-20" />
            <div className="card-body">
              <h2 className="card-title justify-center md:justify-start">{info.title}</h2>
              <p>{info.details}</p>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
};

export default HomeAppointment;
