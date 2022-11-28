import React, { useContext } from "react";
import { UserContext } from "../../Contexts/AuthContext";
import { useQuery } from "@tanstack/react-query";
import PrimarySpinner from "../../Components/Spinners/PrimarySpinner";
import { toast } from "react-toastify";
import {Link} from 'react-router-dom';

const MyAppointment = () => {
  const { user } = useContext(UserContext);

  const {
    data: appointments,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["appointments/booked", user?.email],
    queryFn: async () => {
      const res = await fetch(
        `http://localhost:5000/booked-appointment?email=${user?.email}`,
        {
          headers: {
            authorization: `bearer ${localStorage.getItem("doctors-token")}`,
          },
        }
      );
      const data = await res.json();
      return data;
    },
  });

  const handleDeleteBooking = (bookingId) => {
    const agree = window.confirm(`Are you want to delete your booking`);
    if (agree) {
      fetch(`http://localhost:5000/booked-appointment/${bookingId}`, {
        method: "DELETE",
        headers: {
          authorization: `bearer ${localStorage.getItem("doctors-token")}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.acknowledged) {
            toast.success("Successfully deleted!");
            refetch();
          }
        });
    }
  };

  if (isLoading) {
    return <PrimarySpinner />;
  }

  return (
    <div>
      {!appointments?.length > 0 ? (
        <p className="text-4xl font-bold text-center mt-48 lg:my-60 lg:flex justify-center items-center">
          No appointment is booked yet
        </p>
      ) : (
        <>
          <h3 className="text-3xl font-semibold">My Appointments</h3>
          <div className="overflow-x-auto">
            <table className="table w-full mt-6">
              <thead>
                <tr>
                  <th></th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Service</th>
                  <th>Time</th>
                  <th>Date</th>
                  <th>Payment Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {appointments?.map((appointment, idx) => (
                  <tr key={appointment?._id}>
                    <th>{idx + 1}</th>
                    <td>{appointment?.patient}</td>
                    <td>{appointment?.email}</td>
                    <td>{appointment?.serviceName}</td>
                    <td>{appointment?.slot}</td>
                    <td>{appointment?.appointmentDate}</td>
                    <td>
                      {appointment?.servicePrice && !appointment?.paid ? (
                        <Link to={`/dashboard/payment/${appointment?._id}`}>
                          <button className="btn btn-xs btn-primary">
                            Pay ${appointment?.servicePrice}
                          </button>
                        </Link>
                      ) : (
                        <span className="text-secondary font-semibold">
                          Paid
                        </span>
                      )}
                    </td>
                    <td>
                      <button
                        onClick={() => handleDeleteBooking(appointment?._id)}
                        className="btn btn-xs btn-outline btn-error"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
};

export default MyAppointment;
