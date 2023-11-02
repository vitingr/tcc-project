"use client"

// Imports React
import React, { useEffect, useState } from 'react'
import { motion } from "framer-motion";
import { toast } from 'react-toastify'
import Post from './Post'

// Import Components
import Posts from './Posts'
import ToastMessage from '@components/Others/ToastMessage'
import UploadPostPhoto from './Others/UploadPostPhoto'

// Imports NextAuth
import { useSession } from "next-auth/react"

// Import Icons
import { IoLocationOutline, IoHappyOutline } from 'react-icons/io5'
import { infoUser } from '@utils/userContext'
import ProfileSidebar from './ProfileSidebar'
import PostCreator from './PostCreator';

const Feed = ({ data }) => {

  const { premiumInfo } = infoUser()
  const { data: session, status } = useSession()

  const [post, setPost] = useState("")
  const [postagens, setPostagens] = useState([])
  const [photo, setPhoto] = useState("")

  const fetchData = async () => {
    try { 
      const answer = await fetch(`/api/posts?timestamp=${new Date().getTime()}`, {
        method: "GET",
        headers: {
          "Cache-Control": "no-cache, no-store, max-age=0, must-revalidate"
        }
      })
      const data = await answer.json()
      setPostagens(data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (status === "authenticated") {
      fetchData()
    }
  }, [status])

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
          <div className='write-posts-container'>
            <img src={data.foto} className='very-small-rounded-photo post-photo-profile' alt='photo-post' />
            <input type="text" name="post-something" id="post-something" placeholder='Faça uma postagem' className='post-something' spellCheck="false" autoComplete='off' onChange={(e) => setPost(e.target.value)} value={post} />
          </div>

          {photo !== "" ? (
            <div className='image-post margin-top'>
              <img src={photo} alt="Visualization Post Photo" className='image-post-photo' />
            </div>
          ) : (
            <></>
          )}

          <PostCreator fetchData={fetchData} setPost={setPost} setPhoto={setPhoto} photo={photo} post={post} />
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