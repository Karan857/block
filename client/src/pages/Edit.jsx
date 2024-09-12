import React, { useState, useEffect } from "react";
import { useParams, NavLink } from "react-router-dom";
import axios from "axios";

function Edit() {
  const [desc, setDesc] = useState("");
  const [img, setImg] = useState(null);
  const [title, setTitle] = useState("");
  const [imgPreview, setImgPreview] = useState(""); // State for image preview
  const { post_ID } = useParams();

  const fetchData = async () => {
    try {
      const res = await axios.get(`http://localhost:3000/api/post/${post_ID}`);
      setTitle(res.data.result[0].title);
      setDesc(res.data.result[0].description);
      setImgPreview(res.data.result[0].img);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [post_ID]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImg(file);

    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setImgPreview(previewUrl);
    }
  };

  const editPostBtn = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", desc);
    formData.append("img", img);

    try {
      const res = await axios.put(
        `http://localhost:3000/api/post/${post_ID}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (res.status == 200) {
        alert("edit post success");
        window.location.href = "/index";
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deleteBtn = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.delete(
        `http://localhost:3000/api/post?post_ID=${post_ID}`
      );
      if (res.status == 200) {
        alert("delete post success");
        window.location.href = "/index";
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <div className="w-full max-w-md bg-white shadow-lg rounded-xl p-8">
        <NavLink to="/index" className="w-5 ">
          Go back
        </NavLink>
        <h1 className="text-3xl font-bold mb-6 text-center">Edit Post</h1>
        <form onSubmit={editPostBtn} className="space-y-4">
          <input
            type="text"
            value={title}
            className="w-full text-left"
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            value={desc}
            className="w-full h-32 text-left"
            onChange={(e) => setDesc(e.target.value)}
          />
          <label className="block">Upload Image:</label>
          <input type="file" className="w-full" onChange={handleImageChange} />
          {imgPreview && (
            <div className="mt-2">
              <img
                src={
                  imgPreview.startsWith("http")
                    ? imgPreview
                    : `http://localhost:3000/${imgPreview.replace(/\\/g, "/")}`
                }
                alt="Preview"
                className="w-full h-auto rounded-md"
              />
            </div>
          )}
          <button type="submit" className="w-full btn btn-success">
            Edit
          </button>
          <button
            type="submit"
            className="w-full btn btn-error"
            onClick={deleteBtn}
          >
            Delete
          </button>
        </form>
      </div>
    </div>
  );
}

export default Edit;
