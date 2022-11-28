import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import React, { useEffect, useState } from "react";
import PrimarySpinner from "../../Components/Spinners/PrimarySpinner";
import BookingModal from "./BookingModal";
import DisplayResources from "./DisplayResources";

const AvailableAppointment = ({ selectedDate }) => {
  const date = format(selectedDate, "PP");
  const [service, setServices] = useState(null);

  // const [resources, setResources] = useState([]);
  // useEffect(() => {
  //   fetch("http://localhost:5000/appointments")
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setResources(data);
  //     });
  // }, []);

  const {data:resources, isLoading, refetch} = useQuery({
    queryKey: ['appointments', date],
    queryFn: async() => {
      const res = await fetch(`http://localhost:5000/appointments?date=${date}`);
      const data = await res.json();
      return data;
    }
  })

  if(isLoading){
    return (
      <PrimarySpinner />
    )
  }

  return (
    <section className="my-24">
      <h4 className="text-xl text-center mb-10">
        Available Appointments on <span className="text-secondary">{date}</span>
      </h4>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-9">
        {!isLoading && resources?.map((resource) => (
          <DisplayResources
            key={resource._id}
            resource={resource}
            setServices={setServices}
          />
        ))}
      </div>
      {service && (
        <BookingModal
          service={service}
          setServices={setServices}
          selectedDate={selectedDate}
          refetch={refetch}
        />
      )}
    </section>
  );
};

export default AvailableAppointment;
