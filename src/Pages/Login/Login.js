import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { UserContext } from "../../Contexts/AuthContext";
import useJWToken from "../../Hooks/useJWToken";
import { toast } from "react-toastify";

const Login = () => {
  const { signInUser, resetPassword, googleUser } = useContext(UserContext);
  const navigate = useNavigate();
  const location = useLocation();
  let from = location.state?.from?.pathname || "/";
  const { register, handleSubmit, watch } = useForm();
  // get JWT from backend and set token to localStorage
  const [emailForToken, setEmailForToken] = useState("");
  const [token] = useJWToken(emailForToken);
  if (token) {
    navigate(from, { replace: true });
  }

  const handleLogin = (data, event) => {
    const { email, password } = data;

    signInUser(email, password)
      .then((result) => {
        const user = result.user;
        console.log(user);
        toast.success("Successfully login!");
        setEmailForToken(email);
        event.target.reset();
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleResetPassword = () => {
    const email = watch("email");
    if (email) {
      resetPassword(email)
        .then(() => {
          alert("Please check the email to reset password");
        })
        .catch((err) => {
          console.error(err);
        });
    }
  };

  const handleGoogleUser = () => {
    googleUser()
      .then((result) => {
        const user = result.user;
        console.log(user);
        toast.success("Successfully login through Google!");
        setEmailForToken(user.email);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <section className="flex justify-center items-center my-20">
      <div className="w-96 rounded-md shadow-lg p-7">
        <h2 className="text-center text-xl mb-9">Login</h2>
        <form onSubmit={handleSubmit(handleLogin)}>
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
              {...register("password", { required: true })}
            />
            <label className="label">
              <small
                onClick={handleResetPassword}
                className="label-text cursor-pointer hover:underline"
              >
                Forget Password?
              </small>
            </label>
          </div>

          <input
            type="submit"
            value="Login"
            className="input w-full bg-accent text-white mt-5 transition-bg duration-300 cursor-pointer focus:outline-none hover:bg-slate-900"
          />
        </form>
        <p className="mt-2 text-center">
          <small>
            New to Doctor's Portal?{" "}
            <Link to="/signup" className="text-secondary hover:underline">
              Create new account
            </Link>
          </small>
        </p>
        <div className="divider">OR</div>
        <button
          onClick={handleGoogleUser}
          className="btn btn-outline text-accent w-full"
        >
          CONTINUE WITH GOOGLE
        </button>
      </div>
    </section>
  );
};

export default Login;
