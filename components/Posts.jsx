"use client"

import React, { useEffect, useState } from 'react'
import Post from './Post'

const Posts = ({ fetchData }) => {
  
  const [posts, setPosts] = useState([])

  useEffect(async () => {
      const result = await fetchData()
      setPosts(result)
  }, [])

  return (
    <div className='publications-container'>
      {posts.map((post) => (
        <Post key={post._id} post={post} />
      ))}
    </div>
  )
}

export default Posts