"use client"

import React, { useEffect, useState } from 'react'
import Emprego from './Emprego'
import { infoUser } from '@utils/userContext'
import { useSession } from 'next-auth/react'

const EmpregosList = ({ setEmpregoInfo }) => {

  const { data } = infoUser()
  const { data: session } = useSession()

  const [vagas, setVagas] = useState([])

  useEffect(() => {
    const getVagas = async () => {
      const result = await fetch(`/api/vaga/${data._id}`)
      const response = await result.json()
      setVagas(response)
    }

    if (session) {
      getVagas()
    }
  }, [session])


  return (
    <div className='empregos-list-container'>
      <div className='empregos-aplicados'>
        Ver minhas vagas aplicadas
      </div>
      {vagas.map((vaga) => (
        <div key={vaga._id}>
          {vaga.ativa ? (
            <Emprego vaga={vaga} setEmpregoInfo={setEmpregoInfo} />
          ) : (<></>)}
        </div>
      ))}
    </div>
  )
}

export default EmpregosList