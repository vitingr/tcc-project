"use client"

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

import { APP_ROUTES } from '@constants/app-routes'
import { useSession } from 'next-auth/react'

const PrivateRoute = ({ children }) => {

  const { data: session } = useSession()
  const [isLogged, setIsLogged] = useState(true)
  const { push } = useRouter()

  if (isLogged == false) {
    push(APP_ROUTES.public.inicio)
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