import React from 'react';
import AppointmentToday from './AppointmentToday';
import Contact from './Contact';
import DentalCare from './DentalCare';
import HomeAppointment from './HomeAppointment';
import HomeBanner from './HomeBanner';
import ProvideServices from './ProvideServices';
import Testimonial from './Testimonial';

const Home = () => {
  return (
    <div className='px-6 lg:px-0'>
      <HomeBanner />
      <HomeAppointment />
      <ProvideServices />
      <DentalCare />
      <AppointmentToday />
      <Testimonial />
      <Contact />
    </div>
  );
};

export default Home;