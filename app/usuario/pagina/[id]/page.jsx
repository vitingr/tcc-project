"use client"

// Imports React
import { infoUser } from '@utils/userContext'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { usePathname } from 'next/navigation'

// Imports Components
import MainCompany from '@components/Company/MainCompany'
import Sidebar from '@components/Sidebar/Sidebar'
import CreateVaga from '@components/Company/CreateVaga'
import { useSession } from 'next-auth/react'
import EditCompany from '@components/Company/EditCompany'

const page = () => {

  const router = useRouter()
  const { data } = infoUser()
  const { data: session } = useSession()
  const pathname = usePathname().split("/")
  const userId = pathname[3]

  const [company, setCompany] = useState([])
  const [isDono, setIsDono] = useState(false)
  const [editCompany, setEditCompany] = useState(false)
  const [createVaga, setCreateVaga] = useState(false)

  const getCompany = async () => {
    try {
      if (userId != undefined && data != undefined) {
        const answer = await fetch(`/api/company/visualize/${userId}`)
        const response = await answer.json()
        setCompany(response)
        if (data._id === response.dono) {
          setIsDono(true)
        }
      }
    } catch (error) {
      console.log(error)
    }
  }

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

  useEffect(() => {
    if (session && userId) {
      getCompany()
    }
  }, [session, userId])

  return (
    <div className='company-container'>
      <MainCompany content={company} dono={isDono} setCreateVaga={setCreateVaga} setEditCompany={setEditCompany} handleClick={addPage} />
      <Sidebar />
      {createVaga ? (
        <CreateVaga handleClick={setCreateVaga} />
      ) : (
        <></>
      )}
      {editCompany ? (
        <EditCompany content={company} handleClick={setEditCompany} />
      ) : (
        <></>
      )}
    </div>
  )
}

export default page