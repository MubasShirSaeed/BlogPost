import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [imgUrl, setImgUrl] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:8000/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          title,
          content,
          imgUrl,
        }),
      });

      if (res.ok) {
        navigate("/posts");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0b0f19] text-white px-4">

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg bg-[#111827] border border-white/10 rounded-2xl p-6 shadow-xl"
      >

        <h1 className="text-2xl font-semibold mb-6 text-center">
          Create Post
        </h1>

        {/* TITLE */}
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full mb-4 px-4 py-3 bg-[#0b0f19] border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition"
        />

        {/* CONTENT */}
        <textarea
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows="6"
          className="w-full mb-4 px-4 py-3 bg-[#0b0f19] border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition"
        />

        {/* IMAGE URL */}
        <input
          type="text"
          placeholder="Image URL"
          value={imgUrl}
          onChange={(e) => setImgUrl(e.target.value)}
          className="w-full mb-6 px-4 py-3 bg-[#0b0f19] border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition"
        />

        {/* BUTTON */}
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-500 text-white py-3 rounded-lg font-medium transition shadow-lg shadow-blue-900/30"
        >
          Create Post
        </button>

        {/* BACK */}
        <p
          onClick={() => navigate("/posts")}
          className="text-sm text-center mt-4 text-gray-400 cursor-pointer hover:text-white transition"
        >
          ← Back to posts
        </p>

      </form>
    </div>
  );
};

export default CreatePost;