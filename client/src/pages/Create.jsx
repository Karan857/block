import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";

function Create() {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [img, setImg] = useState(null);
  const user_ID = localStorage.getItem("id");

  const createPostBtn = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("desc", desc);
    formData.append("img", img);
    formData.append("user_ID", user_ID);

    try {
      const res = await axios.post(`http://localhost:3000/api/post`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      if (res.status === 200) {
        alert("post success!!");
        window.location.href = "/index";
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center ">
      <div className="w-full max-w-md  shadow-lg rounded-xl p-8 backdrop-blur-xl">
        <NavLink to="/index" className="w-5 text-white">
          go back
        </NavLink>
        <h1 className="text-3xl font-bold mb-6 text-center text-white">
          Create New Post
        </h1>
        <form onSubmit={createPostBtn} className="space-y-4 text-white">
          <input
            type="text"
            placeholder="คุณคิดอะไรอยู่"
            className="w-full text-left bg-transparent placeholder-white border-gray-300 border rounded p-3"
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            placeholder="เพิ่มรายละเอียด"
            className="w-full h-32 text-left bg-transparent placeholder-white border-gray-300 border rounded p-3"
            onChange={(e) => setDesc(e.target.value)}
          />
          แทรกรูปภาพ
          <input
            type="file"
            className="w-full"
            onChange={(e) => setImg(e.target.files[0])}
          />
          <button type="submit" className="w-full btn btn-primary">
            Create post
          </button>
        </form>
      </div>
    </div>
  );
}

export default Create;
