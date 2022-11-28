import React from "react";
import banner from "../../assets/images/chair.png";
import bg from "../../assets/images/bg.png";
import PrimaryBtn from "../../Components/Button/PrimaryBtn";

const HomeBanner = () => {
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
            alt="home-banner"
            className="rounded-md shadow-2xl w-full lg:w-1/2"
          />
          <div>
            <h1 className="text-5xl font-bold mt-14 lg:mt-0">Your New Smile Starts Here</h1>
            <p className="py-6">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the
            </p>
            <PrimaryBtn>Book Appointment</PrimaryBtn>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeBanner;
