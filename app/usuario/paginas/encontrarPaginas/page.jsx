"use client"

import React from 'react'
import FriendActions from '@components/FriendActions'
import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import NetworkOption from '@components/NetworkOption'
import { toast } from 'react-toastify'
import { motion } from "framer-motion";

// Imports Components
import ToastMessage from '@components/ToastMessage'

const page = () => {

  const { data: session } = useSession()
  const [data, setData] = useState([])

  const fetchData = async () => {
    const result = await fetch(`/api/network/paginas/${session?.user.id}`)
    const response = await result.json()
    setData(response)
  }

  useEffect(() => {
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

  const addPage = async (pagina) => {
    try {

      const response = await fetch("/api/network/paginas/follow", {
        method: "POST",
        body: JSON.stringify({
          userId: session?.user.id,
          pagina: pagina
        })
      })

      if (response.ok) {
        fetchData()
        toast.success("Página adicionda com sucesso!")
      } else {
        toast.error("ERRO! Não é possível seguir a mesma página mais de uma vez")
      }

    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className='friends-container'>
      <ToastMessage />
      <FriendActions />
      <div className='friends-options-container'>
        <h1 className='friends-options-title'>
          Encontrar Páginas
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
                  <NetworkOption key={pagina._id} content={pagina} message={"Seguir"} handleClick={addPage} type={"pagina"} />
                </motion.li>
              ))}

            </motion.ul>
          </div>
        ) : (
          <div> Nenhuma página foi encontrada </div>
        )}
      </div>
    </div >
  )
}

export default page