"use client"

import React, { useState } from 'react'
import Theme from '@components/Theme'
import { infoUser } from '@utils/userContext'
import { toast } from 'react-toastify'

// Imports Components
import ToastMessage from '@components/ToastMessage'

const page = () => {

  const { data, getTheme } = infoUser()
  const [theme, setTheme] = useState("")

  const changeTheme = async (tema) => {
    try {
      const response = await fetch("/api/user/changeTheme", {
        method: "POST",
        body: JSON.stringify({
          userId: data._id,
          tema: tema
        })
      })

      if (response.ok) {
        getTheme()
        toast.success("Tema do usuário alterado com sucesso")
      } else {
        toast.error("Erro ao alterar o tema do usuário")
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className='settings-container'>
      <ToastMessage />
      <div className='gradient-container'></div>
      <div className='settings-section'>
        <h1 className='settings-title'>Informações Pessoais</h1>
        <div className='main-settings-section'>
          <div className='settings-item'>
            Nome do Usuário: <span className='low-emphasis-span'> Alfredo Bundudo</span>
          </div>
          <div className='settings-item'>
            Email: <span className='low-emphasis-span'> alfredo@gmail.com</span>
          </div>
          <div className='settings-item'>
            Local: <span className='low-emphasis-span'> Santa Bárbara d'Oeste, SP - Brasil</span>
          </div>
          <div className='settings-item'>
            Aniversário: <span className='low-emphasis-span'> 21/03/1984</span>
          </div>
        </div>
      </div>

      <div className='gradient-container'></div>
      <div className='settings-section'>
        <h1 className='settings-title'>Inferface</h1>

        <div className='flex-themes'>
          <Theme image={"https://images2.alphacoders.com/100/1006924.png"} title={"Tema Claro"} color1={"#e2e6e9"} color2={"#e394b1"} color3={"#F2508B"} color4={"rgba(0, 0, 0, 0.6)"} color5={"#2f3234"} handleClick={changeTheme} tema={"light"} />

          <Theme image={"https://4kwallpapers.com/images/wallpapers/windows-11-dark-background-bloom-5k-1440x900-8399.png"} title={"Tema Escuro"} color1={"#252145"} color2={"#45426d"} color3={"#5864fd"} color4={"#5864fd"} color5={"#d7d6e7"} handleClick={changeTheme} tema={"dark"} />

          <Theme image={"https://t4.ftcdn.net/jpg/02/96/97/23/360_F_296972320_FD0iBET07NEXqH5720LTXv5RkRJqaO1f.jpg"} title={"Tema Antigo"} color1={"#e2e6e9"} color2={"#e394b1"} color3={"#F2508B"} color4={"#6E243F"} color5={"#2f3234"} handleClick={changeTheme} tema={"old"} />

          <Theme image={"https://png.pngtree.com/thumb_back/fh260/background/20210115/pngtree-blue-gradient-web-ui-background-image_518658.jpg"} title={"Tema Alternativo 1"} color1={"#e0f3fa"} color2={"#8abce4"} color3={"#317dc7"} color4={"#317dc7"} color5={"#2b2b2b"} handleClick={changeTheme} tema={"alternative1"} />

          <Theme image={"https://png.pngtree.com/background/20211215/original/pngtree-glass-morphism-background-in-green-color-gradient-picture-image_1492073.jpg"} title={"Tema Alternativo 2"} color1={"#cbf4db"} color2={"#85e2cd"} color3={"#52d5c1"} color4={"#8ebf40"} color5={"#2f3234"} handleClick={changeTheme} tema={"alternative2"} />

          <Theme image={"https://img.freepik.com/free-vector/gradient-glassmorphism-horizontal-banner_23-2149440108.jpg"} title={"Tema Glassmorphism"} color1={"#f7e7f9"} color2={"#aec4f9"} color3={"#d6d8f9"} color4={"#d689f4"} color5={"#2f3234"} handleClick={changeTheme} tema={"glassmorphism"} />
        </div>

      </div>

      <div className='gradient-container'></div>
      <div className='settings-section'>
        <h1 className='settings-title'>Outros</h1>
      </div>

    </div>
  )
}

export default page