"use client"

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

import { APP_ROUTES } from '@constants/app-routes'
import { useSession } from 'next-auth/react'
import { getServerSession } from 'next-auth'

const PrivateRoute = ({ children }) => {

  const { data: session } = useSession()
  const [isLogged, setIsLogged] = useState(true)
  const { push } = useRouter()

  if (isLogged == false) {
    push(APP_ROUTES.public.login)
  }

  useEffect(() => {
    // Verificar se o usuário está autenticado 
    const isUserAuthenticated = () => {
      if (session) {
        setIsLogged(true)
      } else {
        setIsLogged(false)
      }
    }
    console.log(session)
    isUserAuthenticated()
  }, [push])

  return (
    <>
      {!isLogged && null}
      {isLogged && children}
    </>
  )
}

export default PrivateRoute