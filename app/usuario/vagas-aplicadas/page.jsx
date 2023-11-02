"use client"

import ToastMessage from '@components/Others/ToastMessage'
import { infoUser } from '@utils/userContext'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

const page = () => {

  const { data: session, status } = useSession()
  const { data } = infoUser()
  const [applications, setApplications] = useState([])

  const getAppliedJobs = async () => {
    if (data._id !== undefined) {
      try {
        const result = await fetch(`/api/vaga/applications/${data._id}`)
        const response = await result.json()
        setApplications(response)
      } catch (error) {
        console.log(error)
        toast.error("Não foi possível obter as suas candidaturas")
      }
    }
  }

  useEffect(() => {
    if (data._id != undefined && status == "authenticated") {
      getAppliedJobs()
    }
  }, [data, status])

  return (
    <div className='candidaturas-container'>
      <ToastMessage />
      <Link href={"/usuario/empregos"}>
        <h6>Voltar</h6>
      </Link>
      <h1>Minhas Candidaturas</h1>
      <div className='candidaturas-options'>
        {applications.length > 0 ? (
          <>
            {applications.map((candidatura) => (
              <Link href={`/usuario/pagina/${candidatura.pagina}`} key={candidatura.id}>
                <div className='candidatura-option'>
                  <img src={candidatura.paginaFoto} alt="Profile Photo" />
                  <div className='candidatura-option-right'>
                    <div className='w-full'>
                      <h3>{candidatura.cargo} - {candidatura.titulo}</h3>
                      <p>Candidatura realizada em {candidatura.data}</p>
                    </div>
                    <div className='candidatura-action'>
                      <div className='candidatura-button'>
                        Cancelar
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </>
        ) : (
          <>
            <h5>Você não se aplicou a nenhuma vaga até o momento</h5>
          </>
        )}
      </div>
    </div>
  )
}

export default page