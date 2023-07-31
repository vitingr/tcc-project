"use client"

import React from 'react'
import FriendActions from '@components/FriendActions'
import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import FriendOption from '@components/FriendOption'

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
            {data.map((amigo) => (
              <FriendOption key={amigo._id} amigo={amigo} message={"Remover"} handleClick={"Remover"} />
            ))}
          </div>
        ) : (
          <div> Você não possui amigos </div>
        )}

      </div>
    </div >
  )
}

export default page