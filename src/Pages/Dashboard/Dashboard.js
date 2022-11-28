import React, { useContext } from "react";
import PrimarySpinner from "../../Components/Spinners/PrimarySpinner";
import { UserContext } from "../../Contexts/AuthContext";
import useAdmin from "../../Hooks/useAdmin";

const Dashboard = () => {
  const { user } = useContext(UserContext);
  const [isAdmin, adminLoading] = useAdmin(user?.email);

  if (adminLoading) {
    <PrimarySpinner />;
  }
  return (
    <div>
      {!adminLoading && (
        <h2 className="text-4xl font-bold text-center mt-48 lg:my-60 lg:flex justify-center items-center">
          {isAdmin ? (
            <p>Welcome to Admin Dashboard</p>
          ) : (
            <p>
              Welcome{" "}
              <span className="text-primary mx-2">{user?.displayName}</span> to
              Your DashBoard
            </p>
          )}
        </h2>
      )}
    </div>
  );
};

export default Dashboard;
