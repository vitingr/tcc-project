"use client"

import React from 'react'
import Image from 'next/image'
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
  const [amigo, setAmigo] = useState([])

  const fetchData = async () => {
    const response = await fetch(`/api/network/amigos/convitesEnviados/${session?.user.id}`)
    const answer = await response.json()
    setData(answer)
  }

  const cancelarConvite = async (amigo) => {
    try {
      console.log(amigo)
      const convite = await fetch("/api/network/amigos/convitesEnviados/cancelarConvite", {
        method: "POST",
        body: JSON.stringify({
          userId: session?.user.id,
          amigo: amigo
        })
      })

      if (convite.ok) {
        fetchData()
        toast.success("Convite cancelado com sucesso!")
      } else {
        toast.error("Houve um erro ao cancelar o convite")
      }
    } catch (error) {
      console.log(error)
    }
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

  return (
    <div className='friends-container'>
      <ToastMessage />
      <FriendActions />
      <div className='friends-options-container'>

        <h1 className='friends-options-title'>
          Convites Enviados
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
                <motion.li key={amigo._id} variants={item}>
                  <NetworkOption content={amigo} message={"Cancelar"} handleClick={cancelarConvite} type={"usuario"} />
                </motion.li>
              ))}
            </motion.ul>
          </div>
        ) : (
          <div> Não há opções de amigos </div>
        )}

      </div>
    </div >
  )
}

export default page