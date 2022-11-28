import React from "react";
import treatment from "../../assets/images/treatment.png"
import PrimaryBtn from "../../Components/Button/PrimaryBtn";

const DentalCare = () => {
  return (
    <section className="mb-40">
      <div className="card rounded-lg md:card-side bg-base-100 gap-24">
        <figure className="w-full md:w-1/2">
          <img src={treatment} alt="treatment" className="w-full h-96 rounded-lg" />
        </figure>
        <div className="card-body px-0 w-full md:w-1/2">
          <h2 className="card-title text-5xl">
            Exceptional Dental Care, on Your Terms
          </h2>
          <p className="mt-6">
            It is a long established fact that a reader will be distracted by
            the readable content of a page when looking at its layout. The point of using Lorem Ipsumis that it has a more-or-less normal
            distribution of letters,as opposed to using 'Content here, content
            here', making it look like readable English. Many desktop publishing packages and web page
          </p>
          <div className="card-actions justify-start">
            <PrimaryBtn>Get Appointment</PrimaryBtn>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DentalCare;
