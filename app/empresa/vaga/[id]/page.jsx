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

  const pathname = usePathname().split("/")
  const vagaId = pathname[3]

  const [candidaturas, setCandidaturas] = useState([])
  const [vagaInfo, setVagaInfo] = useState([])

  const getCandidaturas = async () => {
    try {
      const result = await fetch(`/api/vaga/candidaturas/${vagaId}`)
      const response = await result.json()
      setCandidaturas(response)
    } catch (error) {
      console.log(error)
    }
  }

  const getVagaInfo = async () => {
    try {
      const result = await fetch(`/api/vaga/getVagaInfo/${vagaId}`)
      const response = await result.json()
      console.log(response)
      setVagaInfo(response)
    } catch (error) {
      console.log(error)
    }
  }

  const fecharCandidaturas = async () => {
    if (vagaId) {
      try {
        const response = await fetch("/api/vaga/changeState", {
          method: "POST",
          body: JSON.stringify({
            vagaId: vagaId
          })
        })

        console.log(response)

        if (response.ok) {
          getVagaInfo()
          getCandidaturas()
          toast.success("A vaga foi temporariamente fechada")
        } else {
          toast.error("Não foi possível fechar a vaga")
        }

      } catch (error) {
        console.log(error)
        toast.error("Não foi possível fechar a vaga")
      }
    }
  }

  useEffect(() => {
    if (data._id != undefined && status == "authenticated" && vagaId) {
      getCandidaturas()
      getVagaInfo()
    }
  }, [data, status, vagaId])

  return (
    <div className='candidaturas-container'>
      <ToastMessage />
      <Link href={"/empresa"}>
        <h6>Voltar</h6>
      </Link>
      <h1>Candidaturas para a Vaga</h1>
      <div className='candidaturas-options'>
        {candidaturas.length > 0 ? (
          <>
            {candidaturas.map((candidatura) => (
              <Link href={`/usuario/user/${candidatura.dono}`} key={candidatura.id}>
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
      <div className='close-candidaturas' onClick={() => fecharCandidaturas()}>
        {vagaInfo.ativa ? "Fechar Candidaturas" : "Reabrir Candidaturas"}
      </div>
    </div>
  )
}

export default page