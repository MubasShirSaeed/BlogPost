import { useState } from 'react'
import Register from './components/register'
import Login from './components/login'
import Posts from './components/posts'
import Post from './components/post'
import CreatePost from "./components/CreatePost";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
       <BrowserRouter>
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/login" element={<Login/>} />
        <Route path="/posts" element={<Posts/>} />
        <Route path="/posts/:id" element={<Post />} />
        <Route path="/create-post" element={<CreatePost />} />
      </Routes>
    </BrowserRouter>
      
      
    </>
  )
}

export default App
