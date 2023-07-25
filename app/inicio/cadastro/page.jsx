"use client"

// Imports React
import React from 'react'
import Link from 'next/link'
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify'

// Imports Components
import ToastMessage from '@components/ToastMessage'

// Imports NextAuth
import { signIn, useSession, getProviders } from "next-auth/react";

// Import Icons
import { IoMailSharp, IoLockClosed, IoPersonSharp, IoLogoGoogle, IoLogoFacebook } from 'react-icons/io5'

const page = () => {

  const { data: session } = useSession();
  const router = useRouter()
  const [providers, setProviders] = useState(null);
  const [nome, setNome] = useState("")
  const [sobrenome, setSobrenome] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  useEffect(() => {

    const setUpProviders = async () => {
      const response = await getProviders()
      setProviders(response)
    }

    setUpProviders()
    if (session) {
      router.push("/usuario/feed")
    }

  }, [session])

  return (
    <div className='register-login-container center'>
      <ToastMessage />
      <div className='register-login-left-container'>
        <div className='register-login-left center'>
          <h3>Novo por Aqui?</h3>
          <p>
            Conecte-se e tenha acesso a uma vasta rede de networking, treinamentos e oportunidades de trabalho
          </p>
        </div>
        <div className='register-login-right'>
          <h2>Registrar</h2>
          <p>
            Faça seu registro para ter acesso a todos os recursos oferecidos e disponibilizados pela nossa plataforma
          </p>
          <form onSubmit={submitHandler}>
            <div className='register-login-form'>
              <div className='register-login-input'>
                <IoPersonSharp size={20} />
                <input type="text" name="nome" id="nome" placeholder='Nome' onChange={(e) => setNome(e.target.value)} autoComplete='off' minLength={3} maxLength={55} required />
              </div>
              <div className='register-login-input'>
                <IoPersonSharp size={20} />
                <input type="text" name="sobrenome" id="sobrenome" onChange={(e) => setSobrenome(e.target.value)} placeholder='Sobrenome' autoComplete='off' minLength={3} maxLength={55} required />
              </div>
              <div className='register-login-input'>
                <IoMailSharp size={20} />
                <input type="email" name="email" id="email" onChange={(e) => setEmail(e.target.value)} minLength={8} maxLength={120} placeholder='Email' required />
              </div>
              <div className='register-login-input'>
                <IoLockClosed size={20} />
                <input type="password" name="senha" id="senha" onChange={(e) => setPassword(e.target.value)} placeholder='Senha' maxLength={30} minLength={8} autoComplete='off' required />
              </div>
              <div className='register-login-input'>
                <IoLockClosed size={20} />
                <input type="password" name="confirmarSenha" id="confirmarSenha" placeholder='Confirmar Senha' onChange={(e) => setConfirmPassword(e.target.value)} maxLength={30} minLength={8} autoComplete='off' required />
              </div>
            </div>
            <button type='submit' className="register-login-button center">
              Registrar
            </button>
          </form>
          <div className='register-login-icons-container'>
            <>
              {providers &&
                Object.values(providers).map((provider) => (
                  <button className='register-login-icon icon-cursor transparent' type="button" key={provider.name} onClick={() => signIn(provider.id)}>
                    <IoLogoGoogle size={25} />
                    Cadastrar com Google
                  </button>
                ))}
            </>
            <div className="register-login-icon icon-cursor">
              <IoLogoFacebook size={25} />
              Cadastrar com Facebook
            </div>
          </div>
          <div className='register-login-more'>
            <Link href="/inicio/login">
              Já possui uma conta? clique <span className='pink-span'>aqui</span>
            </Link>
          </div>
        </div>
      </div>

    </div>
  )
}

export default page