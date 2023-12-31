"use client"

import "@style/global.css"

// Imports Components
import React from "react"
import Navbar from "@components/Navbar"
import Footer from "@components/Footer"
import Provider from "@components/Others/Provider"
import { ThemeProvider } from "@utils/userContext"

// Import Functions
import { usePathname } from "next/navigation"
import { checkIsPublicRoute } from "@functions/check-route"
import PrivateRoute from "@components/Others/PrivateRoute"
import SetTheme from "@components/Others/SetTheme"

export default function RootLayout({ children }) {

  const metadata = {
    title: 'TCC RH',
    description: 'Grupo do TCC',
  }

  const path = usePathname()

  const isPublic = checkIsPublicRoute(path)
  // console.log(isPublic)

  // SE o usuário estiver autenticado e acessar uma rota privada
  // ele vai conseguir visualizar a página

  // SE o usuário NÃO estiver autenticado, ele não vai conseguir
  // acesar e visualizar a respectiva rota 

  return (
    <html lang="pt-br">
      <body id="body">
        <Provider>
          {isPublic && children}

          {!isPublic && (
            <ThemeProvider>
              <PrivateRoute>
                <SetTheme>
                  <Navbar />
                  <div className="main">
                    <div className="gradient"></div>
                  </div>
                  <main className="main-container center">
                    {children}
                  </main>
                  <Footer />
                </SetTheme>
              </PrivateRoute>
            </ThemeProvider>
          )}
        </Provider>
      </body>
    </html>
  )
}
