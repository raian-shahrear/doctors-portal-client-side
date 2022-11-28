import React from "react";
import "./Appointment.css";
import banner from "../../assets/images/chair.png";
import bg from "../../assets/images/bg.png";
import { DayPicker } from "react-day-picker";

const AppointBanner = ({ selectedDate, setSelectedDate }) => {
  return (
    <section>
      <div
        className="hero"
        style={{
          background: `url(${bg})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
          width: "100%",
          padding: "150px 0",
        }}
      >
        <div className="hero-content justify-between flex-col lg:flex-row-reverse">
          <img
            src={banner}
            alt=""
            className="rounded-md shadow-2xl w-full lg:w-1/2"
          />
          <div>
            <DayPicker
              mode="single"
              selected={selectedDate}
              // onSelect={setSelectedDate}
              onSelect={(data) => {
                if(data){
                  setSelectedDate(data)
                }
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AppointBanner;
