"use client"

import React, { useState } from 'react'
import Popup from '@components/Popup'
import { toast } from 'react-toastify'
import TextEditor from '@components/Others/TextEditor'

// Imports Components
import ToastMessage from '@components/Others/ToastMessage'
import { infoUser } from '@utils/userContext'
import UploadPostPhoto from '@components/Others/UploadPostPhoto'
import { IoHappyOutline, IoLocationOutline } from 'react-icons/io5'

const CreatePost = ({ handleClick, companyInfo }) => {

  const { data } = infoUser()

  const [post, setPost] = useState("")
  const [photo, setPhoto] = useState("")

  const createPost = async () => {
    try {
      const response = await fetch("/api/posts/new", {
        method: "POST",
        body: JSON.stringify({
          userId: companyInfo._id,
          fotoDono: companyInfo.foto,
          nomeDono: companyInfo.nome,
          foto: photo,
          conteudo: post,
          curtidas: 0,
          compartilhamentos: 0
        })
      })

      if (response.ok) {
        handleClick(false)
        await fetchData()
        setPost("")
        toast.success("Post Criado com sucesso!")
      } else {
        toast.error("Houve um erro ao publicar o Post")
      }

    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Popup title={"Digite alguma Mensagem"} subtitle={"Informe por exemplo as vagas e oportunidades de emprego para mulheres que a sua empresa está oferencendo."} handleClick={handleClick} classStyles={""}>
      <ToastMessage />
      <form>
        <div className='top-posts-container w-full'>
          <div className='write-posts-container w-full'>
            <div className='input-add-container w-full'>
              <p>Digite uma mensagem</p>
              <textarea type="text" name="post" id="add-input" className='add-input w-full' placeholder='ex: Oferecemos Vagas.' autoComplete='off' maxLength={400} minLength={2} rows={20} onChange={(e) => setPost(e.target.value)} required></textarea>
            </div>
          </div>

          {photo !== "" ? (
            <div className='image-post'>
              <h4 className='pink-span'>Imagem Selecionada...</h4>
            </div>
          ) : (
            <></>
          )}

          <div className='main-posts-container'>
            <div className='actions-posts-container'>
              <UploadPostPhoto file={setPhoto} value={photo} />
              <span><IoLocationOutline size={18} /></span>
              <span><IoHappyOutline size={18} /></span>
            </div>
            <div>
            </div>
          </div>
        </div>

        <button type="submit" className='add-button center' onClick={(e) => createPost(e)}>
          Adicionar Postagem
        </button>
      </form>
    </Popup>
  )
}

export default CreatePost