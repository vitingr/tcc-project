"use client"

import React from 'react'
import Popup from '@components/Popup'
import { toast } from 'react-toastify'
import ToastMessage from '@components/Others/ToastMessage'

const PremiumForm = ({ data, handleClick }) => {

  const buyPremium = async (e) => {
    e.preventDefault()
    console.log(`${data._id}`)
    try {
      const response = await fetch("/api/premium/buy", {
        method: "POST",
        body: JSON.stringify({
          userId: data._id,
        })
      })

      if (response.ok) {
        handleClick(false)
        toast.success("Conta Premium adquirida com sucesso!")
      } else {
        toast.error("ERRO! Não foi possível finalizar a compra")
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Popup title={"Experimentar o Premium"} subtitle={"Com o premium é possível aumentar a visibilidade do seu perfil, e assim, atrair mais pessoas para a sua rede de conexão"} handleClick={handleClick}>
      <ToastMessage />
      <form onSubmit={(e) => buyPremium(e)}>
        <button type="submit" className='add-button center'>
          Confirmar Compra
        </button>
      </form>
    </Popup>
  )
}

export default PremiumForm