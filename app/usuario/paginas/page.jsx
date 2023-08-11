"use client"

import React from 'react'
import FriendActions from '@components/FriendActions'
import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import FriendOption from '@components/FriendOption'
import { motion } from "framer-motion";

const page = () => {

  const {data: session} = useSession()
  const [data, setData] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetch(`/api/network/paginas/${session?.user.id}`)
      const response = await result.json()
      setData(response)
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
          Páginas que eu sigo
        </h1>

        <p className='friends-options-subtitle'>
          Encontre páginas de empresas e instituições que assemelham com você, é uma excelente maneira de demonstrar o seus gostos pessoais e um modelo de ambiente de trabalho que você goste. 
        </p>

        {data.length > 0 ? (
          <div className="friends-options">
            <motion.ul
              className="friends-options"
              variants={container}
              initial="hidden"
              animate="visible"
            >
              {data.map((pagina) => (
                <motion.li key={pagina} variants={item}>
                  <FriendOption key={pagina._id} content={pagina} message={"Remover"} handleClick={"Remover"} />
                </motion.li>
              ))}

            </motion.ul>
          </div>
        ) : (
          <div> Você não segue nenhuma página </div>
        )}
      </div>
    </div >
  )
}

export default page