"use client"

import "@style/global.css"

// Imports Components
import React, { useEffect } from "react"
import Navbar from "@components/Navbar"
import Footer from "@components/Footer"
import Provider from "@components/Provider"

// Import Functions
import { usePathname } from "next/navigation"
import { checkIsPublicRoute } from "@functions/check-route"
import PrivateRoute from "@components/PrivateRoute"

export const metadata = {
  title: 'Linkedin Fake',
  description: 'Grupo do TCC',
}

export default function RootLayout({ children }) {

  const path = usePathname()

  const isPublic = checkIsPublicRoute(path)
  console.log(isPublic)
  
  // SE o usuário estiver autenticado e acessar uma rota privada
  // ele vai conseguir visualizar a página

  // SE o usuário NÃO estiver autenticado, ele não vai conseguir
  // acesar e visualizar a respectiva rota 

  return (
    <html lang="pt-br">
      <body>
        <Provider>
          {isPublic && children}

          {!isPublic && (
            <PrivateRoute>
              {children}
            </PrivateRoute>
          )}
          <Navbar />
          <main className="main-container center">
            {children}
          </main>
          <Footer />
        </Provider>
      </body>
    </html>
  )
}
