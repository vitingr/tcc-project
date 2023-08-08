"use client"

import React from 'react'
import Post from './Post'
import { motion } from "framer-motion";

const Posts = ({ posts }) => {

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
        className=""
        variants={container}
        initial="hidden"
        animate="visible"
      >
        {posts.map((post) => (
          <motion.li key={post._id} variants={item}>
            <Post post={post} />
          </motion.li>
        ))}
      </motion.ul>
    </div>
  )
}

export default Posts