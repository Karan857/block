import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Index() {
  const [data, setData] = useState([]);
  const [load, setLoad] = useState(true);
  const [like, setLike] = useState([]);
  const [addComment, setAddComment] = useState("");
  const [comment, setComment] = useState([]);
  const user_ID = localStorage.getItem("id");

  const fetchData = async () => {
    try {
      const resPosts = await axios.get(`http://localhost:3000/api/posts`);
      setData(resPosts.data.result);

      const resLike = await axios.get(`http://localhost:3000/api/likes`);
      setLike(resLike.data.result);

      const resComment = await axios.get(`http://localhost:3000/api/comment`);
      setComment(resComment.data.result);
      console.log(resComment.data.result);
    } catch (error) {
      console.error(error);
    } finally {
      setLoad(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const iconLike = ({ post_ID }) => {
    if (like.find((f) => post_ID == f.post_ID && user_ID == f.user_ID)) {
      return "https://img.icons8.com/fluency/48/like.png";
    }
    return "https://img.icons8.com/ios/50/like--v1.png";
  };
  const countLike = ({ post_ID }) => {
    const result = like.filter((f) => post_ID == f.post_ID);
    return result.length;
  };
  const counComment = ({ post_ID }) => {
    const result = comment.filter((f) => post_ID == f.post_ID);
    return result.length;
  };

  const likeBtn = async ({ post_ID }) => {
    if (like.find((f) => post_ID == f.post_ID && user_ID == f.user_ID)) {
      alert("you liked");
    } else {
      try {
        const res = await axios.post(`http://localhost:3000/api/like`, {
          post_ID,
          user_ID,
        });
        if (res.status == 200) window.location.reload();
      } catch (error) {
        console.log(error);
      }
    }
  };

  const addCommentBtn = async ({ post_ID }) => {
    const result = await axios.post(`http://localhost:3000/api/comment`, {
      post_ID,
      user_ID,
      comment: addComment,
    });
    if (result.status == 200) {
      alert("comment success");
      window.location.reload();
    }
  };

  const showComment = (post_ID) => {
    return comment.filter((f) => f.post_ID == post_ID);
  };

  if (load) {
    return <div>loading...</div>;
  } else if (data.length == 0) {
    return <div>not have post</div>;
  } else
    return (
      <div className="container mx-auto p-4 backdrop-blur-lg">
        <Link to="/create">
          <div className="float-right btn btn-primary mb-5">New Post</div>
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
                    className="text-red-600 text-sm"
                  >
                    edit
                  </Link>
                ) : (
                  ""
                )}
              </h2>
              <p className="text-gray-600 mb-4 text-white">
                {post.description}
              </p>
              <p className="text-sm text-gray-200">
                Created at: {new Date(post.time).toLocaleString()}
              </p>
              <p className="text-sm text-gray-300 ">Author : {post.username}</p>
              <div className="flex m-2 justify-between">
                <div className="flex m-3">
                  <img
                    width="25"
                    height="25"
                    src={iconLike({ post_ID: post.post_ID })}
                    alt="like--v1"
                    onClick={() => likeBtn({ post_ID: post.post_ID })}
                  />
                  <p className=" mx-2 text-white">
                    {countLike({ post_ID: post.post_ID })}
                  </p>
                </div>
                <div className="flex m-3 gap-2">
                  <img
                    width="25"
                    height="25"
                    src="https://img.icons8.com/ios/50/chat-message--v1.png"
                    alt="chat-message--v1"
                  />
                  <p className=" mx-2 text-white">
                    {counComment({ post_ID: post.post_ID })}
                  </p>
                </div>
              </div>

              <details>
                <summary className="text-white">แสดงความคิดเห็น</summary>
                {showComment(post.post_ID).length > 0
                  ? showComment(post.post_ID).map((i, index) => (
                      <>
                        <div key={index} className="flex gap-4 items-center">
                          <p className="text-sm font-bold text-white">
                            {i.username} :{" "}
                          </p>
                          <p className="text-gray-300">{i.comment}</p>
                        </div>
                        <p className="text-xs text-gray-400">{i.date}</p>
                      </>
                    ))
                  : "not have comment"}

                <p
                  onClick={() =>
                    document
                      .getElementById(`my_modal_${post.post_ID}`)
                      .showModal()
                  }
                  className="float-right btn "
                >
                  เพิ่มความคิดเห็น
                </p>
                <dialog
                  id={`my_modal_${post.post_ID}`}
                  className="modal modal-bottom sm:modal-middle"
                >
                  <div className="modal-box">
                    <h3 className="font-bold text-lg">เพิ่มความคิดเห็น</h3>
                    <h3>
                      <textarea
                        className="textarea textarea-bordered w-full mt-5"
                        placeholder="แสดงความคิดเห็น"
                        onChange={(e) => setAddComment(e.target.value)}
                      ></textarea>
                    </h3>
                    <div className="modal-action ">
                      <form method="dialog">
                        <div
                          className="btn btn-primary mx-3"
                          onClick={() =>
                            addCommentBtn({ post_ID: post.post_ID })
                          }
                        >
                          เพิ่มความคิดเห็น
                        </div>
                        <button className="btn">ปิด</button>
                      </form>
                    </div>
                  </div>
                </dialog>
              </details>
            </div>
          </div>
        ))}
      </div>
    );
}

export default Index;
