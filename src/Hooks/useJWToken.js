import { useEffect, useState } from "react";

const useJWToken = (email) => {
  const [token, setToken] = useState("");
  useEffect(() => {
    if (email) {
      fetch(
        `https://doctors-portal-server-one-eta.vercel.app/jwt?email=${email}`
      )
        .then((res) => res.json())
        .then((data) => {
          if (data.accessToken) {
            localStorage.setItem("doctors-token", data.accessToken);
            setToken(data.accessToken);
          }
        })
        .catch((err) => console.error(err));
    }
  }, [email]);
  return [token];
};

export default useJWToken;
