"use client"

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

import { APP_ROUTES } from '@constants/app-routes'
import { useSession } from 'next-auth/react'

const PrivateRoute = ({ children }) => {

  const { data: session, status } = useSession()
  const [isLogged, setIsLogged] = useState(true)

  const router = useRouter()

  useEffect(() => {
    // Verificar se o usuário está autenticado 
    const isUserAuthenticated = () => {

      if (status == 'loading') {
        // A sessão ainda está sendo carregada, não faz nada neste momento.
      } else {
        if (status == "unauthenticated") {
          router.push(APP_ROUTES.public.login)
        } 
        if (status == "authenticated") {
          setIsLogged(true)
          // console.log(session)
        }
      }
    }
    isUserAuthenticated()
  }, [session])

  return (
    <>
      {!isLogged && null}
      {isLogged && children}
    </>
  )
}

export default PrivateRoute