"use client"

import { useSession } from 'next-auth/react'
import React from 'react'
import { createContext, useContext, useState, useEffect } from 'react'

const UserContext = createContext()

export const UserProvider = ({ children }) => {

  const {data: session} = useSession()
  const [currentUser, setCurrentUser] = useState([])

  const getData = async () => {
    const response = await fetch(`/api/user/${session?.user.id}`)
    const data = response.json()
    setCurrentUser(data)
  }

  const setData = async () => {
    try {
      if (session !== undefined && session !== null) {
        getData()
        console.log(currentUser)
      } else {
        "Nenhum Usuário Logado"
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (session !== undefined && session !== null) {
      setData()
    } else {
      console.log("Sessão não Iniciada")
    }
  }, [session])

  return (
    <UserContext.Provider value={{
      currentUser, setCurrentUser,
    }}>
      {children}
    </UserContext.Provider>
  )
}

export const useAuth = () => useContext(UserContext)