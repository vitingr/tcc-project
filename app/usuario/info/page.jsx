"use client"

// Imports React
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'

// Imports Components
import Cargo from '@components/Initital-Info/Cargo'
import Endereco from '@components/Initital-Info/Endereco'
import Finalizacao from '@components/Initital-Info/Finalizacao'
import Propostas from '@components/Initital-Info/Propostas'
import TipoEmprego from '@components/Initital-Info/TipoEmprego'
import { toast } from 'react-toastify'

// Imports Components
import ToastMessage from '@components/ToastMessage'
import { infoUser } from '@utils/userContext'

const AditionalInfoContainer = () => {

  const {data} = infoUser()
  const router = useRouter()
  const [step, setStep] = useState(1)

  // Declaração valores FORM
  const [cidade, setCidade] = useState("")
  const [estado, setEstado] = useState("")
  const [pais, setPais] = useState("")
  const [area, setArea] = useState("")
  const [preferenciaEmprego, setPreferenciaEmprego] = useState("")
  const [cargoAtual, setCargoAtual] = useState("")
  const [ultimoContrato, setUltimoContrato] = useState("")
  const [ultimaEmpresa, setUltimaEmpresa] = useState("")
  const [procurandoEmprego, setProcurandoEmprego] = useState("")

  const [share, setShare] = useState(false)

  const verify = () => {
    if (cidade && estado && pais && area && preferenciaEmprego && cargoAtual && ultimoContrato && ultimaEmpresa && procurandoEmprego) {
      return true
    } else {
      toast.error("Está faltando informações!")
      return false
    }
  }

  const terminarCadastro = async (e) => {
    e.preventDefault()

    try {
      const response = await fetch("/api/user/finalizarCadastro", {
        method: "POST",
        body: JSON.stringify({
          userId: data._id,
          cidade: cidade,
          estado: estado,
          pais: pais,
          area: area,
          preferenciaEmprego: preferenciaEmprego,
          cargoAtual: cargoAtual,
          ultimoContrato: ultimoContrato,
          ultimaEmpresa: ultimaEmpresa,
          procurandoEmprego: procurandoEmprego,
          share: share
        })
      })

      if (response.ok) {
        toast.success("Perfil Atualizado com sucesso!")
        router.push("/usuario/feed")
      }

    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className='aditionalinfo-container'>
      <ToastMessage />
      {step === 1 ? (
        <Endereco setStep={setStep} step={step} cidade={cidade} setCidade={setCidade} estado={estado} setEstado={setEstado} pais={pais} setPais={setPais} />
      ) : (
        <div> </div>
      )}

      {step === 2 ? (
        <TipoEmprego setStep={setStep} step={step} area={area} setArea={setArea} preferenciaEmprego={preferenciaEmprego} setPreferenciaEmprego={setPreferenciaEmprego} />
      ) : (
        <div> </div>
      )}

      {step === 3 ? (
        <Cargo setStep={setStep} step={step} cargoAtual={cargoAtual} setCargoAtual={setCargoAtual} ultimoContrato={ultimoContrato} setUltimoContrato={setUltimoContrato} ultimaEmpresa={ultimaEmpresa} setUltimaEmpresa={setUltimaEmpresa} />
      ) : (
        <div> </div>
      )}

      {step === 4 ? (
        <Propostas setStep={setStep} step={step} procurandoEmprego={procurandoEmprego} setProcurandoEmprego={setProcurandoEmprego} verify={verify} />
      ) : (
        <div> </div>
      )}

      {step === 5 ? (
        <Finalizacao setStep={setStep} step={step} handleClick={terminarCadastro} share={share} setShare={setShare} />
      ) : (
        <div> </div>
      )}
    </div>
  )
}

export default AditionalInfoContainer