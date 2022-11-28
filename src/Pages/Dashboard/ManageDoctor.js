import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import PrimarySpinner from "../../Components/Spinners/PrimarySpinner";
import { toast } from "react-toastify";
import ConfirmationModal from "../../Components/Modal/ConfirmationModal";

const ManageDoctor = () => {
  const [deletingDoctor, setDeletingDoctor] = useState(null);
  const {
    data: doctors,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["doctors"],
    queryFn: async () => {
      const res = await fetch("http://localhost:5000/doctors", {
        headers: {
          authorization: `bearer ${localStorage.getItem("doctors-token")}`,
        },
      });
      const data = await res.json();
      return data;
    },
  });

  const closeModal = () => {
    setDeletingDoctor(null);
  };
  
  const handleDeleteDoctor = (doctor) => {
    fetch(`http://localhost:5000/doctors/${doctor?._id}`, {
      method: "DELETE",
      headers: {
        authorization: `bearer ${localStorage.getItem("doctors-token")}`,
      },
    })
      .then((res) => res.json())
      .then((doctorData) => {
        if (doctorData.acknowledged) {
          toast.success(`Dr. ${doctor?.doctorName} removed successfully`);
          refetch();
        }
      })
      .catch((err) => console.error(err));
  };

  if (isLoading) {
    return <PrimarySpinner />;
  }
  return (
    <div className="">
      {doctors?.length === 0 ? (
        <p className="text-4xl font-bold text-center mt-48 lg:my-60 lg:flex justify-center items-center">
          No doctor has been added yet
        </p>
      ) : (
        <>
          <h3 className="text-3xl font-semibold">
            Manage Doctors {doctors?.length && `: ${doctors?.length}`}
          </h3>
          <div className="overflow-x-auto">
            <table className="table w-full mt-6">
              <thead>
                <tr>
                  <th></th>
                  <th>Avatar</th>
                  <th>Name</th>
                  <th>Specialty</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {!isLoading &&
                  doctors?.map((doctor, idx) => (
                    <tr key={doctor?._id}>
                      <th>{idx + 1}</th>
                      <td>
                        <div className="avatar">
                          <div className="w-24 rounded-full">
                            <img src={doctor?.image} alt="doctor" />
                          </div>
                        </div>
                      </td>
                      <td>Dr. {doctor?.doctorName}</td>
                      <td>{doctor?.service}</td>
                      <td>
                        <label
                          onClick={() => setDeletingDoctor(doctor)}
                          htmlFor="confirmation-modal"
                          className="btn btn-xs btn-outline btn-error"
                        >
                          Remove
                        </label>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
          {deletingDoctor && (
            <ConfirmationModal
              title={`Are you want to remove Dr. ${deletingDoctor?.doctorName}?`}
              message={`If you will remove anyone, it can't be Undo`}
              closeModal={closeModal}
              successAction={handleDeleteDoctor}
              successData={deletingDoctor}
            />
          )}
        </>
      )}
    </div>
  );
};

export default ManageDoctor;
