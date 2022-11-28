import React from "react";
import test1 from "../../assets/images/people1.png";
import test2 from "../../assets/images/people2.png";
import test3 from "../../assets/images/people3.png";
import quote from "../../assets/icons/quote.svg"

const Testimonial = () => {
  const testimonialInfo = [
    {
      _id: 1,
      details:
        "It is a long established fact that by the readable content of a lot layout. The point of using Lorem a more-or-less normal distribu to using Content here, content",
      image: test1,
      name: "Winson Herry",
      location: "California, USA",
    },
    {
      _id: 2,
      details:
        "It is a long established fact that by the readable content of a lot layout. The point of using Lorem a more-or-less normal distribu to using Content here, content",
      image: test2,
      name: "Maria Albart",
      location: "London, UK",
    },
    {
      _id: 3,
      details:
        "It is a long established fact that by the readable content of a lot layout. The point of using Lorem a more-or-less normal distribu to using Content here, content",
      image: test3,
      name: "Nance Pelocy",
      location: "Toronto, Canada",
    },
  ];

  return (
    <section className="mb-36">
      <div className="flex justify-between">
        <div className="mb-16">
          <h4 className="text-xl uppercase font-bold text-secondary">
            our services
          </h4>
          <h2 className="text-4xl">Service We Provide</h2>
        </div>
        <img src={quote} alt="quote" className="w-48" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {testimonialInfo.map((info) => (
          <div key={info._id}>
            <div className="card w-full bg-base-100 shadow-xl">
              <div className="card-body">
                <p>{info.details}</p>
              </div>
              <div className="py-5 flex items-center gap-5 px-8 justify-start">
                <div className="avatar">
                  <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                    <img src={info.image} alt="people" />
                  </div>
                </div>
                <div>
                  <h5>{info.name}</h5>
                  <p>{info.location}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Testimonial;
