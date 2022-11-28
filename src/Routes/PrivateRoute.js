import React, { useContext } from 'react';
import { UserContext } from '../Contexts/AuthContext';
import { useLocation, Navigate } from "react-router-dom";
import PrimarySpinner from '../Components/Spinners/PrimarySpinner';

const PrivateRoute = ({children}) => {
  const {user, loading} = useContext(UserContext);
  const location = useLocation();

  if(loading){
    return (
      <PrimarySpinner />
    )
  }

  if(user){
    return children;
  }else{
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
};

export default PrivateRoute;