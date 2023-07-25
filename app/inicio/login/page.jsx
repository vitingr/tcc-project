"use client"

// Imports React
import React from 'react'
import Link from 'next/link'
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

// Imports NextAuth
import { signIn, useSession, getProviders } from "next-auth/react";

// Import Icons
import { IoMailSharp, IoLockClosed, IoLogoGoogle, IoLogoFacebook, } from 'react-icons/io5'

const page = () => {

  const router = useRouter()
  const { data: session } = useSession();

  const [providers, setProviders] = useState(null);

  useEffect(() => {

    const setUpProviders = async () => {
      const response = await getProviders()

      setProviders(response) // Só pode ter um setProviders

    }

    setUpProviders()
    if (session) {
      router.push("/usuario/feed")
    }

  }, [session])

  return (
    <div className='register-login-container center'>
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
          <div className='register-login-form'>
            <div className='register-login-input'>
              <IoMailSharp size={20} />
              <input type="email" name="email" id="email" minLength={8} maxLength={120} placeholder='Email' required />
            </div>
            <div className='register-login-input'>
              <IoLockClosed size={20} />
              <input type="password" name="senha" id="senha" placeholder='Senha' maxLength={30} minLength={8} autoComplete='off' required />
            </div>
          </div>
          <div className="register-login-button center">
            Entrar
          </div>
          <div className='register-login-icons-container'>
            <>
              {providers &&
                Object.values(providers).map((provider) => (
                  <button className='register-login-icon icon-cursor transparent' type="button" key={provider.name} onClick={() => signIn(provider.id)}>
                    <IoLogoGoogle size={25} />
                    Entrar com Google
                  </button>
                ))}
            </>
            <div className="register-login-icon icon-cursor">
              <IoLogoFacebook size={25} />
              Entrar com Facebook
            </div>
          </div>
          <div className='register-login-more'>
            <Link href="/">
              Não possui uma conta? clique <span className='pink-span'>aqui</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default page