"use client"

import React from 'react'
import Loader from './Others/Loader'
import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import { motion } from "framer-motion";
import Seguidor from './Seguidor'
import { IoSearchOutline } from 'react-icons/io5'

const Seguidores = ({ content }) => {

  const { data: session } = useSession()

  const [data, setData] = useState([])

  const fetchData = async () => {
    console.log(content)
    if (session != undefined  && content.length != 0) {
      try {
        const result = await fetch(`/api/network/amigos/meusAmigos/${content._id}`)
        const response = await result.json()
        setData(response)
      } catch (error) {
        console.log(error)
      }
    }
  }

  useEffect(() => {
    if (session && content) {
      fetchData()
    }
  }, [session, content])

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

  return session ? (
    <div className="followers-container">

      <div className="followers-config">
        <h1>{content.nomeCompleto} - <span>{content.seguidores} seguidores</span></h1>
        <div>
          <input type="text" id="follower-search" name="follower-search" autoComplete="off" maxlenght="30" placeholder="Pesquisar por um seguidor específico" className="follower-search" required />
          <IoSearchOutline size={22.5} className="icon-cursor" />
        </div>
      </div>

      <div>
        <motion.ul
          className="followers-options"
          variants={container}
          initial="hidden"
          animate="visible"
        >
          {data.map((friend) => (
            <motion.li key={friend._id} variants={item}>
              <Seguidor content={friend} message={"Remover"} />
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </div>
  ) : (
    <Loader />
  )
}

export default Seguidores