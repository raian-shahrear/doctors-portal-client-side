import React from "react";
import { useQuery } from "@tanstack/react-query";
import PrimarySpinner from "../../Components/Spinners/PrimarySpinner";
import { toast } from "react-toastify";


const AllUsers = () => {
  const {
    data: users,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const res = await fetch("http://localhost:5000/users", {
        headers: {
          authorization: `bearer ${localStorage.getItem("doctors-token")}`,
        },
      });
      const data = await res.json();
      return data;
    },
  });

  const handleToChangeRole = (id) => {
    fetch(`http://localhost:5000/users/admin/${id}`, {
      method: "PUT",
      headers: {
        authorization: `bearer ${localStorage.getItem("doctors-token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.modifiedCount) {
          toast.success("User role has been changed");
          refetch();
        } else {
          toast.error(data.message);
        }
      });
  };

  const handleDeleteUser = (user) => {
    const agree = window.confirm(
      `Are you sure, you want to delete ${user?.userName}`
    );
    if (agree) {
      fetch(`http://localhost:5000/users/admin/${user?._id}`, {
        method: "DELETE",
        headers: {
          authorization: `bearer ${localStorage.getItem("doctors-token")}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.acknowledged) {
            toast.success("Successfully deleted!");
            refetch();
          }
        });
    }
  };
  if (isLoading) {
    return <PrimarySpinner />;
  }

  return (
    <div>
      {users?.length === 0 ? (
        <p className="text-4xl font-bold text-center mt-48 lg:my-60 lg:flex justify-center items-center">
          No user has been registered yet
        </p>
      ) : (
        <>
          <h3 className="text-3xl font-semibold">All Users</h3>
          <div className="overflow-x-auto">
            <table className="table w-full mt-6">
              <thead>
                <tr>
                  <th></th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th colSpan={2} className="text-center">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {!isLoading && users?.map((user, idx) => (
                  <tr key={user?._id}>
                    <th>{idx + 1}</th>
                    <td>{user?.userName}</td>
                    <td>{user?.userEmail}</td>
                    <td className="capitalize font-semibold">{user?.role}</td>
                    <td>
                      <button
                        onClick={() => handleToChangeRole(user?._id)}
                        className={`btn btn-xs btn-outline ${
                          user?.role === "host" ? "btn-warning" : "btn-success"
                        }`}
                      >
                        {user?.role === "host" ? "Make User" : "Make Host"}
                      </button>
                    </td>
                    <td className="flex justify-end">
                      <button
                        onClick={() => handleDeleteUser(user)}
                        className="btn btn-xs btn-outline btn-error"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
};

export default AllUsers;
