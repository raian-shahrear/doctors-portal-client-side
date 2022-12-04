import { format } from "date-fns";
import React, { useContext } from "react";
import { toast } from "react-toastify";
import { UserContext } from "../../Contexts/AuthContext";

const BookingModal = ({ service, selectedDate, setServices, refetch }) => {
  const date = format(selectedDate, "PP");
  const { user } = useContext(UserContext);

  const handleBooking = (event) => {
    event.preventDefault();
    const form = event.target;
    const slot = form.slot.value;
    const name = form.name.value;
    const email = form.email.value;
    const phone = form.phone.value;

    const booking = {
      serviceName: service.name,
      serviceId: service._id,
      servicePrice: service.price,
      appointmentDate: date,
      slot,
      patient: name,
      email,
      phoneNumber: phone,
    };

    fetch(
      "https://doctors-portal-server-one-eta.vercel.app/booked-appointment",
      {
        method: "POST",
        headers: {
          "content-type": "application/json",
          authorization: `bearer ${localStorage.getItem("doctors-token")}`,
        },
        body: JSON.stringify(booking),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.acknowledged) {
          setServices(null);
          toast.success(
            `Appointment add for ${booking?.serviceName} by ${booking?.patient}`
          );
          refetch();
        } else {
          toast.error(data.message);
        }
      });
  };
  return (
    <div>
      <input type="checkbox" id="treatment-modal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box relative">
          <label
            htmlFor="treatment-modal"
            className="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          <h3 className="text-lg font-bold">{service?.name}</h3>
          <form onSubmit={handleBooking} className="flex flex-col gap-6 mt-12">
            <input
              type="text"
              value={date}
              className="input w-full input-bordered"
            />
            <select name="slot" className="input w-full input-bordered">
              {service?.slots?.length > 0 ? (
                service?.slots.map((slot, idx) => (
                  <option key={idx} value={slot}>
                    {slot}
                  </option>
                ))
              ) : (
                <option value="No Time Slot Available">
                  No Time Slot Available
                </option>
              )}
            </select>
            <input
              type="text"
              name="name"
              defaultValue={user?.displayName}
              disabled
              placeholder="Full Name"
              className="input w-full input-bordered"
            />
            <input
              type="email"
              name="email"
              defaultValue={user?.email}
              disabled
              placeholder="Email"
              className="input w-full input-bordered"
            />
            <input
              type="text"
              name="phone"
              required
              placeholder="Phone Number *"
              className="input w-full input-bordered"
            />
            <input
              type="submit"
              disabled={user?.uid ? false : true}
              title={!user?.uid && "Please login to place your appointment"}
              placeholder="Type here"
              className="input w-full disabled:bg-accent bg-accent text-white cursor-pointer hover:bg-slate-800"
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default BookingModal;
