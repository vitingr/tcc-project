"use client"

// Imports React
import React from 'react'
import Link from 'next/link'
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify'

// Imports Components
import LoginMessage from '@components/Others/LoginMessage';

// Imports NextAuth
import { signIn, useSession, getProviders } from "next-auth/react";

// Import Icons
import { IoMailSharp, IoLockClosed, IoPersonSharp, IoLogoGoogle, IoLogoFacebook } from 'react-icons/io5'

const page = () => {
  const { data: session } = useSession()
  const router = useRouter()

  const [providers, setProviders] = useState(null)
  const [submitting, setSubmitting] = useState(false)

  const [data, setData] = useState({
    name: "",
    lastname: "",
    email: "",
    password: "",
  })
  const [passwordConfirm, setPasswordConfirm] = useState("")

  const registerUser = async () => {
    if (data.password === passwordConfirm) {
      const response = await fetch("/api/register", {
        method: "POST",
        body: JSON.stringify({ data: data })
      })
      if (response.ok) {
        toast.success("SUCESSO! A conta foi criada")
        setSubmitting(false)
        router.push("/")
      } else {
        setSubmitting(false)
        toast.error("ERRO! Não foi possível criar a conta")
      }
    } else {
      setSubmitting(false)
      toast.error("As senhas estão diferentes")
    }
  }

  const setUpProviders = async () => {
    const response = await getProviders()
    setProviders(response)
  }

  useEffect(() => {
    setUpProviders()
    if (session) {
      router.push("/usuario/feed")
    }   
  }, [session])

  return (
    <div className='register-login-container center'>
      <LoginMessage />
      <div className='register-login-left-container'>
        <div className='register-login-left center'>
          <h3>Novo por Aqui?</h3>
          <p>
            Conecte-se e tenha acesso a uma vasta rede de networking, treinamentos e oportunidades de trabalho
          </p>
        </div>
        <div className='register-login-right'>
          <form onSubmit={async (e) => {
            e.preventDefault()
            setSubmitting(true)
            await registerUser()
          }}>
            <h2>Registrar</h2>
            <p>
              Faça seu registro para ter acesso a todos os recursos oferecidos e disponibilizados pela nossa plataforma
            </p>
            <div className='register-login-form'>
              <div className='register-login-input'>
                <IoPersonSharp size={20} />
                <input type="text" name="name" id="name" placeholder='Nome' autoComplete='off' minLength={3} maxLength={55} value={data.name} onChange={(e) => { setData({ ...data, name: e.target.value }) }} required />
              </div>
              <div className='register-login-input'>
                <IoPersonSharp size={20} />
                <input type="text" name="lastname" id="lastname" placeholder='Sobrenome' autoComplete='off' minLength={3} value={data.lastname} onChange={(e) => { setData({ ...data, lastname: e.target.value }) }} maxLength={55} required />
              </div>
              <div className='register-login-input'>
                <IoMailSharp size={20} />
                <input type="email" name="email" id="email" minLength={8} maxLength={120} placeholder='Email' autoComplete="off" value={data.email} onChange={(e) => { setData({ ...data, email: e.target.value }) }} required />
              </div>
              <div className='register-login-input'>
                <IoLockClosed size={20} />
                <input type="password" name="password" id="password" placeholder='Senha' maxLength={30} minLength={8} autoComplete='off' value={data.password} onChange={(e) => { setData({ ...data, password: e.target.value }) }} required />
              </div>
              <div className='register-login-input'>
                <IoLockClosed size={20} />
                <input type="password" name="confirmarSenha" id="confirmarSenha" placeholder='Confirmar Senha' maxLength={30} minLength={8} autoComplete='off' onChange={(e) => setPasswordConfirm(e.target.value)} required />
              </div>
            </div>
            <button type="submit" className="register-login-button center">
              {submitting ? "Cadastrando..." : "Cadastrar"}
            </button>
          </form>
          <div className='register-login-more'>
            <Link href="/">
              Já possui uma conta? clique <span className='pink-span'>aqui</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default page