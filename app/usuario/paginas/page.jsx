"use client"

import React from 'react'
import FriendActions from '@components/FriendActions'
import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import NetworkOption from '@components/NetworkOption'
import { motion } from "framer-motion";
import Sidebar from '@components/Sidebar/Sidebar'
import { toast } from 'react-toastify'
import ToastMessage from '@components/Others/ToastMessage'

const page = () => {

  const {data: session} = useSession()
  const [data, setData] = useState([])

  const fetchData = async () => {
    const result = await fetch(`/api/network/paginas/minhasPaginas/${session?.user.id}`)
    const response = await result.json()
    setData(response)
  }

  useEffect(() => {
    if (session) {
      fetchData()
    }
  }, [session])

  const removePage = async (pagina) => {
    try {

      const response = await fetch("/api/network/paginas/unfollow", {
        method: "POST",
        body: JSON.stringify({
          userId: session?.user.id,
          pagina: pagina
        })
      })

      if (response.ok) {
        fetchData()
        toast.success("Página removida com sucesso!")
      } else {
        toast.error("ERRO! Não é possível deixar de seguir essa página")
      }

    } catch (error) {
      console.log(error)
    }
  }

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
      <ToastMessage />
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
                  <NetworkOption key={pagina._id} content={pagina} message={"Remover"} handleClick={removePage} type={"pagina"} />
                </motion.li>
              ))}

            </motion.ul>
          </div>
        ) : (
          <div> Você não segue nenhuma página </div>
        )}
      </div>
      <Sidebar />
    </div >
  )
}

export default page