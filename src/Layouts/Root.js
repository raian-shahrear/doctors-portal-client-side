import React from 'react';
import Footer from '../Pages/Shared/Footer';
import NavBar from '../Pages/Shared/NavBar';
import {Outlet} from 'react-router-dom';

const Root = () => {
  return (
    <div>
      <NavBar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Root;