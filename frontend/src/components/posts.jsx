import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Masonry from "react-masonry-css";

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState(null);

  const navigate = useNavigate();
  const isAdmin = user?.role === "admin";

  const breakpointColumnsObj = {
    default: 3,
    1024: 3,
    640: 1,
  };

  useEffect(() => {
    const fetchData = async () => {
      const postsRes = await fetch("http://localhost:8000/posts", {
        credentials: "include",
      });
      setPosts(await postsRes.json());

      const profileRes = await fetch(
        "http://localhost:8000/api/auth/profile",
        { credentials: "include" }
      );
      setUser(await profileRes.json());
    };

    fetchData();
  }, []);

  const handleDelete = async (id) => {
    await fetch(`http://localhost:8000/posts/${id}`, {
      method: "DELETE",
      credentials: "include",
    });

    setPosts(posts.filter((p) => p._id !== id));
  };

  const handleLogout = async () => {
    await fetch("http://localhost:8000/api/auth/logout", {
      method: "POST",
      credentials: "include",
    });

    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-[#0b0f19] text-white px-6 py-6">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-semibold tracking-wide">
          Posts
        </h1>

        <button
          onClick={handleLogout}
          className="text-sm px-4 py-2 rounded-md bg-red-900 border border-white/10 hover:bg-red-950 transition"
        >
          Logout
        </button>
      </div>

      {/* MASONRY */}
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="flex gap-5"
        columnClassName="space-y-5"
      >
        {posts.map((post) => (
          <div
            onClick={() => navigate(`/posts/${post._id}`)}
            key={post._id}
            className="bg-[#111827] border border-white/10 rounded-xl overflow-hidden hover:scale-102 transition"
          >

            {/* IMAGE (no hover effects) */}
            {post.imgUrl && (
              <img
                src={post.imgUrl}
                className="w-full h-44 object-cover"
              />
            )}

            <div className="p-4">

              <h2
                onClick={() => navigate(`/posts/${post._id}`)}
                className="text-lg font-medium cursor-pointer hover:text-blue-400 transition"
              >
                {post.title}
              </h2>

              <p className="text-sm text-gray-400 mt-2 leading-relaxed">
                {post.content.slice(0, 120)}...
              </p>

              <div className="flex justify-between items-center mt-4">

                <button
                  onClick={() => navigate(`/posts/${post._id}`)}
                  className="text-sm text-blue-400 hover:text-blue-300 transition"
                >
                  Read more →
                </button>

                {isAdmin && (
                  <button
                    onClick={() => handleDelete(post._id)}
                    className="text-red-400 hover:text-red-300 text-sm"
                  >
                    Delete
                  </button>
                )}

              </div>
            </div>
          </div>
        ))}
      </Masonry>

      {/* FLOATING BUTTON */}
      {isAdmin && (
        <div className="fixed bottom-2 right-2">
          <button
            onClick={() => navigate("/create-post")}
            className="w-14 h-14 rounded-full bg-green-900 text-white text-2xl shadow-lg hover:bg-green-950 transition"
          >
            +
          </button>
        </div>
      )}
    </div>
  );
};

export default Posts;