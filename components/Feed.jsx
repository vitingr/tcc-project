"use client"

// Imports React
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { toast } from 'react-toastify'

// Import Components
import Posts from './Posts'
import ToastMessage from '@components/Others/ToastMessage'

// Imports NextAuth
import { useSession } from "next-auth/react"

// Import Icons
import { IoPencilOutline, IoPeopleSharp, IoBusinessOutline, IoPodiumSharp, IoThumbsUpSharp, IoImageOutline, IoLocationOutline, IoHappyOutline } from 'react-icons/io5'

const Feed = ({ data }) => {

  const { data: session } = useSession()
  const [post, setPost] = useState("")
  const [postagens, setPostagens] = useState([])

  const fetchData = async () => {
    const answer = await fetch(`/api/posts/`)
    const data = await answer.json()
    setPostagens(data)
  }

  const createPost = async () => {
    try {
      const response = await fetch("/api/posts/new", {
        method: "POST",
        body: JSON.stringify({
          userId: session?.user.id,
          foto: data.foto,
          nomeDono: data.nomeCompleto,
          conteudo: post,
          curtidas: 0,
          compartilhamentos: 0
        })
      })

      if (response.ok) {
        fetchData()
        setPost("")
        toast.success("Post Criado com sucesso!")
      } else {
        toast.error("Houve um erro ao publicar o Post")
      }

    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (session) {
      console.log(session)
      fetchData()
    }
  }, [session])

  return (
    <div className='feed-container'>
      <ToastMessage />
      <div className='actions-container'>
        <div className='home-profile'>
          <div className='background-home-profile' style={{ backgroundImage: `url(${data.background})` }}>
          </div>
          <div className='photo-home-profile center'>
            <img src={data.foto} className='medium-rounded-photo' alt='photo-left' />
          </div>
          <div className='info-home-profile'>
            <div className='home-basic-info'>
              <Link href="/usuario/profile">
                <h2>{data.nomeCompleto}</h2>
              </Link>
              <p>{data.email}</p>
            </div>
            <div className='home-friends'>
              <div>
                <Link href="/usuario/amigos">
                  <h4>Amizades</h4>
                  <p>Adicione amigos</p>
                </Link>
              </div>
              <div className='center'>
                <Link href={`/usuario/seguidores/${data._id}`}>
                  <span className="feed-friends">{data.seguidores}</span>
                </Link>
              </div>
            </div>
            <div className='home-options'>
              <Link href="/usuario/amigos">
                <li className='icon-cursor'>
                  <div className='center'><IoPeopleSharp size={15} /></div>
                  <div>Ver amizades</div>
                </li>
              </Link>
              <Link href="/empresa">
                <li className='icon-cursor'>
                  <div className='center'><IoBusinessOutline size={15} /></div>
                  <div>Conta Empresarial</div>
                </li>
              </Link>
              <Link href="/usuario/profile">
                <li className='icon-cursor'>
                  <div className='center'><IoPencilOutline size={15} /></div>
                  <div>Editar perfil</div>
                </li>
              </Link>
              <li className='icon-cursor'>
                <div className='center'><IoThumbsUpSharp size={15} /></div>
                <div>Minhas curtidas</div>
              </li>
              <li className='icon-cursor'>
                <div className='center'><IoPodiumSharp size={15} /></div>
                <div className='center'>Atividade perfil</div>
              </li>
            </div>
          </div>
        </div>

        <div className='actions-texts'>
          <p>Sobre</p>
          <p>Acessibilidade</p>
          <p>Centro de Ajuda</p>
          <p>Privacidade</p>
          <p>Termos</p>
          <p>Propagandas</p>
          <p>Serviços</p>
          <p>Contatos</p>
          <p>Mais</p>
        </div>

        <div className='actions-credits'>
          <img src="https://i.pinimg.com/736x/3d/37/60/3d3760207a12e626f1149118404e003d.jpg" alt="logo" />
          <p>Projeto TCC EtecJd. © 2023</p>
        </div>

      </div>

      <div className='posts-container'>

        <div className='top-posts-container'>
          <div className='write-posts-container'>
            <img src={data.foto} className='very-small-rounded-photo post-photo-profile' alt='photo-post' />
            <input type="text" name="post-something" id="post-something" className='post-something' onChange={(e) => setPost(e.target.value)} value={post} />
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
            <div className='post-publication icon-cursor center' onClick={createPost}>
              Publicar
            </div>
          </div>
        </div>

        <Posts posts={postagens} fetch={fetchData} />

      </div>
    </div>
  )
}

export default Feed