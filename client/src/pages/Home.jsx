import React from "react";
import { NavLink } from "react-router-dom";

function Home() {
  const user_ID = localStorage.getItem("id");
  return (
    <div
      className="h-[100vh] w-[100%] grid place-items-center bg"
      style={{
        backgroundImage:
          "url('https://asset.gecdesigns.com/img/wallpapers/aesthetic-landscape-reflection-background-hd-wallpaper-sr10012410-1706502139247-cover.webp')",
        backgroundSize: "cover",
      }}
    >
      <div className="flex flex-col gap-6 items-center">
        <h1 className="text-6xl text-white font-bold ">
          Welcome To My Web Block
        </h1>
        {!user_ID ? (
          <NavLink to="/login">
            <button className="btn btn-success  text-white px-7">
              {" "}
              Let go!
            </button>
          </NavLink>
        ) : (
          <NavLink to="/index">
            <button className="btn btn-success  text-white px-7">
              {" "}
              Let go!
            </button>
          </NavLink>
        )}
      </div>
    </div>
  );
}

export default Home;
