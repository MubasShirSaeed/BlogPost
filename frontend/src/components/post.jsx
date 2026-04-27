import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const Post = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [post, setPost] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await fetch(`http://localhost:8000/posts/${id}`, {
          method: "GET",
          credentials: "include",
        });

        const data = await res.json();
        setPost(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchPost();
  }, [id]);

  if (!post) {
    return (
      <div className="min-h-screen bg-[#0b0f19] flex items-center justify-center text-gray-400">
        Loading post...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0b0f19] text-white px-6 py-6">

      {/* BACK BUTTON */}
      <button
        onClick={() => navigate(-1)}
        className="text-sm text-gray-400 hover:text-white transition mb-6"
      >
        ← Back
      </button>

      {/* CONTAINER */}
      <div className="max-w-3xl mx-auto bg-[#111827] border border-white/10 rounded-2xl overflow-hidden shadow-xl">

        {/* IMAGE */}
        {post.imgUrl && (
          <img
            src={post.imgUrl}
            className="w-full h-72 object-cover"
          />
        )}

        {/* CONTENT */}
        <div className="p-6">

          <h1 className="text-2xl font-semibold mb-4 leading-snug">
            {post.title}
          </h1>

          <p className="text-gray-300 leading-relaxed whitespace-pre-line">
            {post.content}
          </p>

        </div>
      </div>
    </div>
  );
};

export default Post;