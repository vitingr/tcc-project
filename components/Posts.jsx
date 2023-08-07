"use client"

import React from 'react'
import Post from './Post'

const Posts = ({ posts }) => {
  return (
    <div className='publications-container'>
      {posts.map((post) => (
        <Post key={post._id} post={post} />
      ))}
    </div>
  )
}

export default Posts