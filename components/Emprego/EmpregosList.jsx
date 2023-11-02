"use client"

import React, { useEffect, useState } from 'react'
import Emprego from './Emprego'
import { infoUser } from '@utils/userContext'
import { useSession } from 'next-auth/react'
import Link from 'next/link'

const EmpregosList = ({ setEmpregoInfo }) => {

  const { data } = infoUser()
  const { data: session, status } = useSession()

  const [vagas, setVagas] = useState([])

  const getVagas = async () => {
    const result = await fetch(`/api/vaga/${data._id}`)
    const response = await result.json()
    setVagas(response)
  }

  useEffect(() => {
    if (session && status === "authenticated") {   
      getVagas()
    }
  }, [session])

  return (
    <div className='empregos-list-container'>
      <Link href="/usuario/vagas-aplicadas" className='empregos-aplicados'>
        Ver minhas vagas aplicadas
      </Link>
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