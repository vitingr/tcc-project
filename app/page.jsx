"use client"

// Imports React
import React from 'react'
import Link from 'next/link'
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

// Imports NextAuth
import { signIn, useSession, getProviders } from "next-auth/react";

// Import Icons
import { IoMailSharp, IoLockClosed, IoPersonSharp, IoLogoGoogle, IoLogoInstagram, IoLogoFacebook, IoLogoTwitter, IoLogoTwitch } from 'react-icons/io5'
import { toast } from 'react-toastify'

// Imports Components
import LoginMessage from '@components/Others/LoginMessage';

const page = () => {

  const router = useRouter()
  const { data: session } = useSession();

  const [providers, setProviders] = useState(null);

  const [data, setData] = useState({
    email: "",
    password: "",
  })

  const registerUser = async (e) => {
    e.preventDefault()

    if (data.password) {
      const response = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false
      })

      console.log(response)

      if (response.error === "CredentialsSignin") {
        toast.error("ERRO! Credenciais incorretas")
      }

    } else {
      console.log("erro")
      toast.error("ERRO! Informe a senha")
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
          <h3>Já é faz parte?</h3>
          <p>
            Faça login na nossa plataforma para explorar as mais diversas oportunidade e conecte-se com outras pessoas!
          </p>
        </div>
        <div className='register-login-right'>
          <h2>Entrar</h2>
          <p>
            Faça seu login para ter acesso a todos os recursos oferecidos e disponibilizados pela nossa plataforma
          </p>
          <form onSubmit={registerUser}>
            <div className='register-login-form'>
              <div className='register-login-input'>
                <IoMailSharp size={20} />
                <input type="email" name="email" id="email" minLength={8} maxLength={120} placeholder='Email' autoComplete="off" value={data.email} onChange={(e) => { setData({ ...data, email: e.target.value }) }} required />
              </div>
              <div className='register-login-input'>
                <IoLockClosed size={20} />
                <input type="password" name="senha" id="senha" placeholder='Senha' maxLength={30} minLength={8} autoComplete='off' value={data.password} onChange={(e) => { setData({ ...data, password: e.target.value }) }} required />
              </div>
            </div>
            <button type="submit" className="register-login-button center">
              Entrar
            </button>
          </form>
          <div className='register-login-icons-container'>
            <>
              {providers &&
                Object.values(providers).map((provider) => (
                  <>
                    {provider.name != "credentials" ? (
                      <button className='register-login-icon icon-cursor transparent' key={provider.name} type="button" onClick={() => signIn(provider.id)}>
                        <IoLogoGoogle size={25} />
                        Entrar com {provider.name}
                      </button>
                    ) : (
                      <></>
                    )}
                  </>
                ))}
            </>
            <div className="register-login-icon icon-cursor">
              <IoLogoFacebook size={25} />
              Entrar com Facebook
            </div>
          </div>
          <div className='register-login-more'>
            <Link href="/inicio/cadastro">
              Não possui uma conta? clique <span className='pink-span'>aqui</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default page