import { useEffect, useState } from "react";

const useAdmin = (email) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminLoading, setAdminLoading] = useState(true);
  useEffect(() => {
    if (email) {
      fetch(
        `https://doctors-portal-server-one-eta.vercel.app/users/admin/${email}`,
        {
          headers: {
            authorization: `bearer ${localStorage.getItem("doctors-token")}`,
          },
        }
      )
        .then((res) => res.json())
        .then((data) => {
          setIsAdmin(data.isAdmin);
          setAdminLoading(false);
        });
    }
  }, [email]);
  return [isAdmin, adminLoading];
};

export default useAdmin;
