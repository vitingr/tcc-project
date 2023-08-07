"use client"

import React, { useEffect } from 'react'
import Post from './Post'
import { motion } from "framer-motion";
import { useSession } from 'next-auth/react';

const Posts = ({ posts, fetch }) => {

  const { data: session } = useSession()

  useEffect(() => {
    if (session) {
      fetch()
    }
  })

  const container = {
    hidden: { opacity: 1, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };

  return (
    <div className='publications-container'>
      <motion.ul
        className="friends-options"
        variants={container}
        initial="hidden"
        animate="visible"
      >
        {posts.map((post) => (
          <motion.li key={amigo} variants={item}>
            <Post key={post._id} post={post} />
          </motion.li>

        ))}
      </motion.ul>
    </div>
  )
}

export default Posts