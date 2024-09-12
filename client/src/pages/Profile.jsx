import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";

function Profile() {
  const [email, setEmail] = useState("");
  const [img, setImg] = useState(null);
  const [editBtn, setEditBtn] = useState(false);
  const user_ID = localStorage.getItem("id");

  const fetchData = async () => {
    try {
      const res = await axios.get(
        `http://localhost:3000/api/auth?user_ID=${user_ID}`
      );
      const data = res.data.result[0];
      setEmail(data.username);
      setImg(data.img);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [user_ID]);

  const editToggle = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("username", email);

    // Only append the image if a new image is selected
    if (img) {
      formData.append("img", img);
    }

    try {
      const res = await axios.put(
        `http://localhost:3000/api/auth?user_ID=${user_ID}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      if (res.status === 200) {
        localStorage.setItem("id", res.data.user_ID);
        alert("Update success");
        window.location.href = "/index";
      }
    } catch (error) {
      console.error("Axios error:", error);
    }
  };

  return (
    <div className="h-[100vh]  flex justify-center items-center flex-col">
      <form
        onSubmit={editToggle}
        className="shadow-lg p-6 rounded-xl flex flex-col items-center justify-start backdrop-blur-xl"
      >
        {editBtn && (
          <input
            type="file"
            className="bg-center bg-cover w-[150px] my-3"
            onChange={(e) => setImg(e.target.files[0])}
          />
        )}
        {img && (
          <img
            src={img}
            alt="img"
            className="rounded-full h-[150px] w-[150px] bg-cover bg-center"
          />
        )}
        <label className="input input-bordered flex items-center gap-2 m-5">
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
            type="email"
            disabled={!editBtn}
            className="grow my-4"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>

        {editBtn ? (
          <div className="flex items-center justify-center gap-4">
            <input
              type="submit"
              className="btn btn-primary   text-white"
              value="Submit"
            />
            <div className="btn btn-warning" onClick={() => setEditBtn(false)}>
              Cancel
            </div>
          </div>
        ) : (
          <div className="btn btn-success" onClick={() => setEditBtn(true)}>
            Edit
          </div>
        )}
      </form>
    </div>
  );
}

export default Profile;
