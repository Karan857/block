import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

function MyBlock() {
  const [data, setData] = useState([]);
  const [load, setLoad] = useState(true);
  const { user_ID } = useParams();

  const fetchData = async () => {
    try {
      const res = await axios.get(
        `http://localhost:3000/api/post?user_ID=${user_ID}`
      );
      setData(res.data.result);
    } catch (error) {
      console.log(error);
    } finally {
      setLoad(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [user_ID]);

  if (load) {
    return <div>loading...</div>;
  } else if (data.length == 0) {
    return <div>not have post</div>;
  } else
    return (
      <div className="container mx-auto p-4 backdrop-blur-xl">
        <Link to="/create">
          <div className="float-right btn btn-primary mb-5 ">New Post</div>
        </Link>
        {data.map((post, index) => (
          <div
            key={index}
            className={`mt-10 flex flex-col md:flex-row items-center mb-12 ${
              index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
            }`}
          >
            <div className="w-full md:w-1/2 p-4">
              <img
                src={
                  post.img.startsWith("http")
                    ? post.img
                    : `http://localhost:3000/${post.img.replace(/\\/g, "/")}`
                }
                alt={post.title}
                className="w-full h-64 object-cover rounded-lg shadow-lg"
                onError={(e) => {
                  e.target.onerror = null; // prevents looping
                  e.target.src = "path/to/default/image.jpg"; // fallback image
                }}
              />
            </div>
            <div className="w-full md:w-1/2 p-4">
              <h2 className="text-2xl font-bold mb-2 flex gap-1 items-center text-white">
                {post.title}
                {post.user_ID == user_ID ? (
                  <Link
                    to={`/edit/${post.post_ID}`}
                    className="text-red-500 text-sm"
                  >
                    edit
                  </Link>
                ) : (
                  ""
                )}
              </h2>
              <p className=" mb-4 text-white">{post.description}</p>
              <p className="text-sm text-gray-200">
                Created at: {new Date(post.time).toLocaleString()}
              </p>
              <p className="text-sm text-gray-300">Author : {post.username}</p>
            </div>
          </div>
        ))}
      </div>
    );
}

export default MyBlock;
