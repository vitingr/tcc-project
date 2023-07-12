"use client"

// Imports React
import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

// Import Components
import Posts from './Posts'

// Imports NextAuth
import { useSession } from "next-auth/react"

// Import Icons
import { IoPencilOutline, IoPeopleSharp, IoBusinessOutline, IoPodiumSharp, IoThumbsUpSharp, IoImageOutline, IoLocationOutline, IoHappyOutline } from 'react-icons/io5'

const Feed = ({ data }) => {

  const { data: session } = useSession()

  const [post, setPost] = useState("")

  const createPost = async () => {
    console.log(`POST CRIADO: ${post}`)
  }

  return (
    <div className='feed-container'>
      <div className='actions-container'>
        <div className='home-profile'>
          <div className='background-home-profile'>
          </div>
          <div className='photo-home-profile center'>
            <Image src={data.foto} width={100} height={100} className='medium-rounded-photo' alt='photo' />
          </div>
          <div className='info-home-profile'>
            <div className='home-basic-info'>
              <Link href="/pages/usuario/profile">
              <h2>{data.nomeCompleto}</h2>
              </Link>
              <p>{data.email}</p>
            </div>
            <div className='home-friends'>
              <div>
                <Link href="/pages/usuario/amigos">
                  <h4>Amizades</h4>
                  <p>Adicione amigos</p>
                </Link>
              </div>
              <div className='center'>
                <span>{data.seguidores}</span>
              </div>
            </div>
            <div className='home-options'>
              <li className='icon-cursor'>
                <div className='center'><IoPeopleSharp size={15} /></div>
                <div>Ver amizades</div>
              </li>
              <li className='icon-cursor'>
                <div className='center'><IoBusinessOutline size={15} /></div>
                <div>Conta Empresarial</div>
              </li>
              <li className='icon-cursor'>
                <div className='center'><IoPencilOutline size={15} /></div>
                <div>Editar perfil</div>
              </li>
              <li className='icon-cursor'>
                <div className='center'><IoThumbsUpSharp size={15} /></div>
                <div>Minhas curtidas</div>
              </li>
              <li className='icon-cursor'>
                <div className='center'><IoPodiumSharp size={15} /></div>
                <div>Atividade perfil</div>
              </li>
            </div>
          </div>
        </div>

      </div>

      <div className='posts-container'>

        <div className='top-posts-container'>
          <div className='write-posts-container'>
            <Image src={data.foto} width={100} height={100} className='very-small-rounded-photo' alt='photo' />
            <input type="text" name="post-something" id="post-something" className='post-something' onChange={(e) => setPost(e.target.value)} />
          </div>

          <div className='main-posts-container'>
            <div className='actions-posts-container'>
              <span>
                <IoImageOutline size={18} />
              </span>
              <span>
                <IoLocationOutline size={18} />
              </span>
              <span>
                <IoHappyOutline size={18} />
              </span>
            </div>
            <div className='post-publication icon-cursor' onClick={createPost}>
              Publicar
            </div>
          </div>
        </div>


        <Posts />

      </div>
    </div>
  )
}

export default Feed