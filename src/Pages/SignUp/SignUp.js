import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../Contexts/AuthContext";
import { toast } from "react-toastify";
import useJWToken from "../../Hooks/useJWToken";

const SignUp = () => {
  const { createUser, updateUser, googleUser, signOutUser } =
    useContext(UserContext);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  // get JWT from backend and set token to localStorage
  const [emailForToken, setEmailForToken] = useState("");
  const [token] = useJWToken(emailForToken);
  if (token) {
    signOutUser();
    localStorage.removeItem('doctors-token');
    navigate("/login");
  }

  const handleSignUp = (data, event) => {
    const { name, email, password } = data;

    createUser(email, password)
      .then((result) => {
        const user = result.user;
        // console.log(user);
        updateUserProfile(name, user.email);
        event.target.reset();
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const updateUserProfile = (name, email) => {
    updateUser(name)
      .then(() => {
        console.log(`${name}, is added`);
        saveRegisteredUser(name, email);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleGoogleUser = () => {
    googleUser()
      .then((result) => {
        const user = result.user;
        console.log(user);
        saveRegisteredUser(user.displayName, user.email);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  // save registered user to database
  const saveRegisteredUser = (name, email) => {
    const registeredUser = {
      userName: name,
      userEmail: email,
      role: "user",
    };
    fetch("http://localhost:5000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `bearer ${localStorage.getItem("doctors-token")}`,
      },
      body: JSON.stringify(registeredUser),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.acknowledged) {
          setEmailForToken(email);
          toast.success("Successfully create an account!");
        } else {
          toast.error(data.message);
          signOutUser();
        }
      });
  };

  return (
    <section className="flex justify-center items-center my-20">
      <div className="w-96 rounded-md shadow-lg p-7">
        <h2 className="text-center text-xl mb-9">Sign Up</h2>
        <form onSubmit={handleSubmit(handleSignUp)}>
          <div>
            <label className="label">
              <span className="label-text">Name</span>
            </label>
            <input
              type="text"
              className="input input-bordered w-full"
              {...register("name", { required: true })}
            />
          </div>
          <div>
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              className="input input-bordered w-full"
              {...register("email", { required: true })}
            />
          </div>
          <div className="mt-2">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              type="password"
              placeholder="********"
              className="input input-bordered w-full"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters long",
                },
                pattern: /(?=.*\d)(?=.*[A-Z])(?=.*[!#@$%&? " ])/,
              })}
            />
            {errors.password && (
              <p className="text-red-500">
                <small>{errors.password?.message}</small>
              </p>
            )}
          </div>

          <input
            type="submit"
            value="Sign Up"
            className="input w-full bg-accent text-white mt-5 transition-bg duration-300 cursor-pointer focus:outline-none hover:bg-slate-900"
          />
        </form>
        <p className="mt-2 text-center">
          <small>
            Already have an account?{" "}
            <Link to="/login" className="text-secondary hover:underline">
              Please Login
            </Link>
          </small>
        </p>
        <div className="divider">OR</div>
        <button
          onClick={handleGoogleUser}
          className="btn btn-outline text-accent w-full"
        >
          SIGN UP WITH GOOGLE
        </button>
      </div>
    </section>
  );
};

export default SignUp;
