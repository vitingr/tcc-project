"use client"

import React from 'react'
import FriendActions from '@components/FriendActions'
import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import FriendOption from '@components/FriendOption'
import { toast } from 'react-toastify'

// Imports Components
import ToastMessage from '@components/ToastMessage'

const page = () => {

  const { data: session } = useSession()
  const [data, setData] = useState([])

  const fetchData = async () => {
    const response = await fetch(`/api/network/amigos/convitesPendentes/${session?.user.id}`)
    const answer = await response.json()
    setData(answer)
  }

  const aceitarAmigo = async (amigo) => {
    try {
      const soliticacao = await fetch("/api/network/amigos/convitesPendentes/aceitarConvite", {
        method: "POST",
        body: JSON.stringify({
          userId: session?.user.id,
          amigo: amigo
        })
      })
  
      if (soliticacao.ok) {
        fetchData()
        toast.success("Convite aceito com sucesso!")
      } else {
        toast.error("Erro ao aceitar o convite de amizade")
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

  return (
    <div className='friends-container'>
      <ToastMessage />
      <FriendActions />
      <div className='friends-options-container'>

        <h1 className='friends-options-title'>
          Amigos Pendentes
        </h1>
        <p className='friends-options-subtitle'>
          Conecte-se com várias mulheres com os mesmos gostos e interesses profissionais que você! Dessa maneira encontre oportunidades e treinamentos que se assemelham e são indicados para você crescer dentro do mercado trabalho.
        </p>

        {data.length > 0 ? (
          <div className="friends-options">
            {data.map((amigo) => (
              <FriendOption key={amigo._id} amigo={amigo} message={"Confirmar"} handleClick={aceitarAmigo} />
            ))}
          </div>
        ) : (
          <div> Não há opções de amigos </div>
        )}

      </div>
    </div >
  )
}

export default page