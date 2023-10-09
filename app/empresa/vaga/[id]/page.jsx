"use client"

import { infoUser } from '@utils/userContext'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const page = () => {

  const { data: session, status } = useSession()
  const { data } = infoUser()

  const [candidaturas, setCandidaturas] = useState([])

  const pathname = usePathname().split("/")
  const vagaId = pathname[3]

  const getCandidaturas = async () => {
    const result = await fetch(`/api/vaga/candidaturas/${vagaId}`)
    const response = await result.json()
    setCandidaturas(response)
  }

  useEffect(() => {
    if (data._id != undefined && status == "authenticated" && vagaId) {
      getCandidaturas(vagaId)
    }
  }, [])

  return (
    <div className='candidaturas-container'>
      <Link href={"/empresa"}>
      <h6>Voltar</h6>
      </Link>
      <h1>Candidaturas para a Vaga</h1>
      <div className='candidaturas-options'>
        {candidaturas.length > 0 ? (
          <>
            {candidaturas.map((candidatura) => (
              <Link href={`/usuario/user/${candidatura.dono}`}>
                <div className='candidatura-option'>
                  <img src={candidatura.candidatoFoto} alt="Profile Photo" />
                  <div className='candidatura-option-right'>
                    <div className='w-full'>
                      <h3>{candidatura.nome || "Nome testes"}</h3>
                      <p>Candidatura realizada em {candidatura.data}</p>
                    </div>
                    <div className='candidatura-action'>
                      <div className='candidatura-button'>
                        Ver Perfil
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </>
        ) : (
          <>
            <h5>Nenhuma candidatura até o momento...</h5>
          </>
        )}
      </div>
      <div className='close-candidaturas'>
        Fechar Candidaturas
      </div>
    </div>
  )
}

export default page