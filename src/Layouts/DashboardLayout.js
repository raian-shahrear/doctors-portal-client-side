import React, { useContext } from "react";
import './DashboardLayout.css'
import NavBar from "../Pages/Shared/NavBar";
import { Outlet, Link } from "react-router-dom";
import useAdmin from "../Hooks/useAdmin";
import { UserContext } from "../Contexts/AuthContext";

const DashboardLayout = () => {
  const { user } = useContext(UserContext);
  const [isAdmin] = useAdmin(user?.email);
  return (
    <div>
      <NavBar />
      <div>
        <div className="drawer drawer-mobile">
          <input
            id="dashboard-drawer"
            type="checkbox"
            className="drawer-toggle"
          />
          <div className="drawer-content px-24 lg:px-0">
            <Outlet />
          </div>
          <div className="drawer-side">
            <label
              htmlFor="dashboard-drawer"
              className="drawer-overlay"
            ></label>
            <ul className="menu p-4 w-80 bg-base-100 lg:bg-transparent text-base-content">
              <li>
                <Link to="/dashboard/my-appointments">My Appointments</Link>
              </li>
              {isAdmin && (
                <>
                  <li>
                    <Link to="/dashboard/all-users">All Users</Link>
                  </li>
                  <li>
                    <Link to="/dashboard/all-doctor">Add Doctor</Link>
                  </li>
                  <li>
                    <Link to="/dashboard/manage-doctor">Manage Doctors</Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
