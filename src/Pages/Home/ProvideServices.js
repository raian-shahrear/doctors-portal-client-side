import React from 'react';
import service1 from "../../assets/images/fluoride.png";
import service2 from "../../assets/images/cavity.png";
import service3 from "../../assets/images/whitening.png";

const ProvideServices = () => {
  const appointmentInfo = [
    {
      _id: 1,
      image: service1,
      title: "Fluoride Treatment",
      details: "Lorem Ipsum is simply dummy printing and typesetting indust Ipsum has been the"
    },
    {
      _id: 2,
      image: service2,
      title: "Cavity Filling",
      details: "Lorem Ipsum is simply dummy printing and typesetting indust Ipsum has been the"
    },
    {
      _id: 3,
      image: service3,
      title: "Teeth Whitening",
      details: "Lorem Ipsum is simply dummy printing and typesetting indust Ipsum has been the"
    },
  ];

  

  return (
    <section className='mb-32'>
      <div className='text-center mb-16'>
        <h4 className='text-xl uppercase font-bold text-secondary'>our services</h4>
        <h2 className='text-4xl'>Service We Provide</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
      {appointmentInfo.map((info) => (
        <div key={info._id}>
          <div className="flex items-center flex-col md:flex-row rounded-md shadow-lg text-center md:text-left h-full px-6 py-10">
            <img src={info.image} alt="appointment-icon" className="w-20" />
            <div className="card-body">
              <h2 className="card-title justify-center md:justify-start">{info.title}</h2>
              <p>{info.details}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
    </section>
  );
};

export default ProvideServices;