import React from "react";
import { useForm } from "react-hook-form";
import { useQuery } from "@tanstack/react-query";
import PrimarySpinner from "../../Components/Spinners/PrimarySpinner";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const AddDoctor = () => {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();

  const { data: Specialties, isLoading } = useQuery({
    queryKey: ["appointments/name"],
    queryFn: async () => {
      const res = await fetch("http://localhost:5000/appointments/name");
      const data = await res.json();
      return data;
    },
  });

  const handleAddDoctor = (data, event) => {
    // create image link by uploading image in IMGBB server
    const imageHostKey = process.env.REACT_APP_IMGBB_KEY;
    const formData = new FormData();
    formData.append("image", data.file[0]);
    fetch(`https://api.imgbb.com/1/upload?key=${imageHostKey}`, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((imgData) => {
        if (imgData?.success) {
          // creating an object with form data
          const doctor = {
            doctorName: data?.name,
            email: data?.email,
            service: data?.specialty,
            image: imgData?.data?.url,
          };
          // post/send doctor's data
          fetch("http://localhost:5000/doctors", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              authorization: `bearer ${localStorage.getItem("doctors-token")}`,
            },
            body: JSON.stringify(doctor),
          })
            .then((res) => res.json())
            .then((result) => {
              if(result.acknowledged){
                event.target.reset()
                toast.success('Add doctor successfully');
                navigate('/dashboard/manage-doctor')
              }
            })
            .catch((err) => console.error(err));
        }
      })
      .catch((err) => console.error(err));
  };

  if (isLoading) {
    <PrimarySpinner />;
  }

  return (
    <div className="flex flex-col justify-center items-center lg:block">
      <h3 className="text-3xl font-semibold mb-7">Add A New Doctor</h3>
      <form
        onSubmit={handleSubmit(handleAddDoctor)}
        className="p-12 w-[540px] shadow-lg"
      >
        <div className="mb-5">
          <label className="label">
            <span className="label-text">Name</span>
          </label>
          <input
            type="text"
            placeholder="Enter Your Name"
            {...register("name", { required: true })}
            className="input input-bordered w-full"
          />
        </div>
        <div className="mb-5">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input
            type="email"
            placeholder="Enter Your Email"
            {...register("email", { required: true })}
            className="input input-bordered w-full"
          />
        </div>
        <div className="mb-5">
          <label className="label">
            <span className="label-text">Specialty</span>
          </label>
          <select
            {...register("specialty", { required: true })}
            className="select select-bordered w-full"
          >
            {!isLoading &&
              Specialties?.map((specialty) => (
                <option key={specialty._id} value={specialty.name}>
                  {specialty.name}
                </option>
              ))}
          </select>
        </div>
        <div className="mb-5">
          <input
            type="file"
            placeholder="Enter Your Email"
            {...register("file", { required: true })}
            className="input input-bordered w-full"
          />
        </div>

        <input
          type="submit"
          className="input w-full bg-accent text-white mt-5 transition-bg duration-300 cursor-pointer focus:outline-none hover:bg-slate-900"
        />
      </form>
    </div>
  );
};

export default AddDoctor;
