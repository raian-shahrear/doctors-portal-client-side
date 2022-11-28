import React, { useState } from "react";
import AppointBanner from "./AppointBanner";
import AvailableAppointment from "./AvailableAppointment";


const Appointment = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  return (
    <div>
      <AppointBanner
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
      />
      <AvailableAppointment
        selectedDate={selectedDate}
      />
    </div>
  );
};

export default Appointment;
