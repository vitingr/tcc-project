"use client"

// Imports React
import React, { useEffect, useState } from 'react'
import { motion } from "framer-motion";
import { toast } from 'react-toastify'
import Post from './Post'

// Import Components
import ToastMessage from '@components/Others/ToastMessage'

// Imports NextAuth
import { useSession } from "next-auth/react"

// Import Icons
import { infoUser } from '@utils/userContext'
import ProfileSidebar from './ProfileSidebar'
import PostCreator from './PostCreator';

const Feed = ({ data }) => {
  const { premiumInfo } = infoUser()
  const { data: session, status } = useSession()

  const [postagens, setPostagens] = useState([])

  const fetchData = async (id) => {
    try {
      const answer = await fetch(`/api/posts/${id}`)
      const data = await answer.json()
      setPostagens(data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (status === "authenticated" && session?.user?.id !== undefined && data._id !== undefined) {
      fetchData(data._id)
    }
  }, [status, session, data._id])

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
  }

  const item = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  }

  return (
    <div className='feed-container'>
      <ToastMessage />
      <div className='actions-container'>
        <ProfileSidebar data={data} premiumInfo={premiumInfo} />

        <div className='actions-texts'>
          <p>Sobre</p>
          <p>Acessibilidade</p>
          <p>Centro de Ajuda</p>
          <p>Privacidade</p>
          <p>Termos</p>
          <p>Propagandas</p>
          <p>Serviços</p>
          <p>Contatos</p>
          <p>Mais</p>
        </div>

        <div className='actions-credits'>
          <img src="https://i.pinimg.com/736x/3d/37/60/3d3760207a12e626f1149118404e003d.jpg" alt="logo" />
          <p>Projeto TCC EtecJd. © 2023</p>
        </div>
      </div>

      <div className='posts-container'>

        <div className='top-posts-container'>

          <PostCreator fetchData={fetchData} />
        </div>

        {postagens.length > 0 ? (
          <div className='publications-container'>
            <motion.ul
              className=""
              variants={container}
              initial="hidden"
              animate="visible"
            >
              {postagens.map((post) => (
                <motion.li key={post._id} variants={item}>
                  <Post post={post} fetchData={fetchData} />
                </motion.li>
              ))}
            </motion.ul>
          </div>
        ) : (
          <div>
            Não há postagens
          </div>
        )}

      </div>
    </div>
  )
}

export default Feed