"use client"

import React from 'react'
import FriendActions from '@components/FriendActions'
import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import NetworkOption from '@components/NetworkOption'
import { motion } from "framer-motion";

const page = () => {

  const { data: session } = useSession()
  const [data, setData] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`/api/network/amigos/meusAmigos/${session?.user.id}`)
      const answer = await response.json()
      setData(answer)
    }
    if (session) {
      fetchData()
    }
  }, [session])

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
    <div className='friends-container'>
      <FriendActions />
      <div className='friends-options-container'>

        <h1 className='friends-options-title'>
          Meus Amigos
        </h1>
        <p className='friends-options-subtitle'>
          Conecte-se com várias mulheres com os mesmos gostos e interesses profissionais que você! Dessa maneira encontre oportunidades e treinamentos que se assemelham e são indicados para você crescer dentro do mercado trabalho.
        </p>

        {data.length > 0 ? (
          <div className="friends-options">
            <motion.ul
              className="friends-options"
              variants={container}
              initial="hidden"
              animate="visible"
            >
              {data.map((amigo) => (
                <motion.li key={amigo} variants={item}>
                  <NetworkOption key={amigo._id} content={amigo} message={"Remover"} handleClick={"Remover"} type={"usuario"} />
                </motion.li>
              ))}

            </motion.ul>
          </div>
        ) : (
          <div> Você não possui amigos </div>
        )}

      </div>
    </div >
  )
}

export default page