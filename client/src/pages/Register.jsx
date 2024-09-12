import { useState } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [checkPassword, setCheckPassword] = useState("");

  const registerBtn = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(`http://localhost:3000/api/register`, {
        username: email,
        password,
      });

      if (res.status == 200) {
        alert("Register success");
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="h-[100vh]  flex justify-center items-center flex-col">
      <form
        onSubmit={registerBtn}
        className="shadow-lg p-6 rounded-xl flex flex-col items-center justify-start"
      >
        <NavLink to="/" className="w-5 ">
          <img
            src="https://cdn-icons-png.flaticon.com/128/11502/11502464.png"
            alt="go back"
          />
        </NavLink>
        <h1 className="text-center m-6 text-4xl font-bold">Register</h1>
        <label className="input input-bordered flex items-center gap-2 my-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="h-4 w-4 opacity-70"
          >
            <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
            <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
          </svg>
          <input
            type="text"
            className="grow"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label className="input input-bordered flex items-center gap-2 my-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="h-4 w-4 opacity-70"
          >
            <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
          </svg>
          <input
            type="password"
            className="grow"
            placeholder="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <label className="input input-bordered flex items-center gap-2 my-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="h-4 w-4 opacity-70"
          >
            <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
          </svg>
          <input
            type="password"
            className="grow"
            placeholder="check password"
            onChange={(e) => setCheckPassword(e.target.value)}
          />
        </label>
        {!checkPassword ? (
          ""
        ) : (
          <p
            className={
              password === checkPassword ? "text-green-500" : "text-red-700"
            }
          >
            {password === checkPassword
              ? "corect password"
              : "password not match"}
          </p>
        )}

        <NavLink to="/login">
          <p className="text-blue-800 font-bold m-3">login</p>
        </NavLink>
        <input
          type="submit"
          className="btn btn-primary w-[100px] mt-2 text-white"
          value="Register"
        />
      </form>
    </div>
  );
}

export default Register;
