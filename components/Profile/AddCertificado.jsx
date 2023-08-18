"use client"

// Imports React
import React, { useState } from 'react'
import { IoCloseSharp } from 'react-icons/io5'
import { toast } from 'react-toastify'

// Imports Components
import ToastMessage from '@components/Others/ToastMessage'
import Popup from '@components/Popup'
import { infoUser } from '@utils/userContext'

const AddCertificado = ({ data, handleClick }) => {

  const {getInfo} = infoUser()
  const [nomeCurso, setNomeCurso] = useState("")
  const [nomeInstituicao, setNomeInstituicao] = useState("")
  const [erros, setErros] = useState(false)
  const [mesInicio, setMesInicio] = useState("")
  const [anoInicio, setAnoInicio] = useState("")
  const [mesFim, setMesFim] = useState("")
  const [anoFim, setAnoFim] = useState("")

  const createCertificado = async (e) => {

    e.preventDefault()

    if (nomeCurso.length > 30) {
      toast.error("O nome do curso é muito longo")
      setErros(true)
    }
    if (nomeCurso.length < 4) {
      toast.error("O nome do curso é muito curto")
      setErros(true)
    }
    if (!nomeCurso) {
      toast.error("Adicione o nome do Curso")
      setErros(true)
    }
    if (!nomeInstituicao) {
      toast.error("Adicione o nome da Instituição")
      setErros(true)
    }

    if (erros === false) {
      try {
        const response = await fetch("/api/profile/certificado/new", {
          method: "POST",
          body: JSON.stringify({
            userId: data._id,
            nome: nomeCurso,
            unidade: nomeInstituicao,
            foto: "https://etecperuibe.com.br/wp-content/uploads/2021/02/Positiva.png",
            mesInicio: mesInicio,
            mesFim: mesFim,
            anoInicio: anoInicio,
            anoFim: anoFim,
          })
        })
        if (response.ok) {
          toast.success("Certificado Adicionado")
          getInfo()
          handleClick(false)
        }
      } catch (error) {
        console.log(error)
      }
    }
  }

  return (
    <Popup title={"Adicionar Certificados"} subtitle={"dicione seus certificados e licenças aqui para informar e atrair mais pessoas ao seu perfil"} handleClick={handleClick}>
      <ToastMessage />
      <form onSubmit={(e) => createCertificado(e)}>
        <div className='input-add-container'>
          <p>Curso</p>
          <input type="text" name="empresa" id="add-input" className='add-input' placeholder='ex: Curso de Administração.' autoComplete='off' maxLength={30} minLength={4} onChange={(e) => setNomeCurso(e.target.value)} required />
        </div>
        <div className='input-add-container'>
          <p>Instituição</p>
          <input type="text" name="instituicao" id="instituicao" className='add-input' placeholder='Instituição de Ensino' onChange={(e) => setNomeInstituicao(e.target.value)} maxLength={60} minLength={2} required />
        </div>

        <div className='input-add-container'>
          <p>Ano de Início <span className="pink-span">*</span></p>
          <select name="mes-inicio" id="mes-final" className='add-input' onChange={(e) => setMesInicio(e.target.value)}>
            <option value="">Mês</option>
            <option value="Janeiro">Janeiro</option>
            <option value="Fevereiro">Fevereiro</option>
            <option value="Março">Março</option>
            <option value="Abril">Abril</option>
            <option value="Maio">Maio</option>
            <option value="Junho">Junho</option>
            <option value="Julho">Julho</option>
            <option value="Agosto">Agosto</option>
            <option value="Setembro">Setembro</option>
            <option value="Outubro">Outubro</option>
            <option value="Novembro">Novembro</option>
            <option value="Dezembro">Dezembro</option>
          </select>

          <select name="ano-inicio" id="ano-inicio" className='add-input' onChange={(e) => setAnoInicio(e.target.value)}>
            <option value="">Ano</option>
            <option value="2023">2023</option>
            <option value="2022">2022</option>
            <option value="2021">2021</option>
            <option value="2020">2020</option>
            <option value="2019">2019</option>
            <option value="2018">2018</option>
            <option value="2017">2017</option>
            <option value="2016">2016</option>
            <option value="2015">2015</option>
            <option value="2014">2014</option>
            <option value="2013">2013</option>
            <option value="2012">2012</option>
            <option value="2011">2011</option>
            <option value="2010">2010</option>
            <option value="2009">2009</option>
            <option value="2008">2008</option>
            <option value="2007">2007</option>
            <option value="2006">2006</option>
            <option value="2005">2005</option>
            <option value="2004">2004</option>
            <option value="2003">2003</option>
            <option value="2002">2002</option>
            <option value="2001">2001</option>
            <option value="2000">2000</option>
            <option value="1999">1999</option>
            <option value="1998">1998</option>
            <option value="1997">1997</option>
            <option value="1996">1996</option>
            <option value="1995">1995</option>
            <option value="1994">1994</option>
            <option value="1993">1993</option>
            <option value="1992">1992</option>
            <option value="1991">1991</option>
            <option value="1990">1990</option>
            <option value="1989">1989</option>
            <option value="1988">1988</option>
            <option value="1987">1987</option>
            <option value="1986">1986</option>
            <option value="1985">1985</option>
          </select>
        </div>

        <div className='input-add-container'>
          <p>Ano de Conclusão <span className="pink-span">*</span></p>
          <select name="mes-inicio" id="mes-final" className='add-input' onChange={(e) => setMesFim(e.target.value)}>
            <option value="">Mês</option>
            <option value="Janeiro">Janeiro</option>
            <option value="Fevereiro">Fevereiro</option>
            <option value="Março">Março</option>
            <option value="Abril">Abril</option>
            <option value="Maio">Maio</option>
            <option value="Junho">Junho</option>
            <option value="Julho">Julho</option>
            <option value="Agosto">Agosto</option>
            <option value="Setembro">Setembro</option>
            <option value="Outubro">Outubro</option>
            <option value="Novembro">Novembro</option>
            <option value="Dezembro">Dezembro</option>
          </select>

          <select name="ano-inicio" id="ano-final" className='add-input' onChange={(e) => setAnoFim(e.target.value)}>
            <option value="">Ano</option>
            <option value="2023">2023</option>
            <option value="2022">2022</option>
            <option value="2021">2021</option>
            <option value="2020">2020</option>
            <option value="2019">2019</option>
            <option value="2018">2018</option>
            <option value="2017">2017</option>
            <option value="2016">2016</option>
            <option value="2015">2015</option>
            <option value="2014">2014</option>
            <option value="2013">2013</option>
            <option value="2012">2012</option>
            <option value="2011">2011</option>
            <option value="2010">2010</option>
            <option value="2009">2009</option>
            <option value="2008">2008</option>
            <option value="2007">2007</option>
            <option value="2006">2006</option>
            <option value="2005">2005</option>
            <option value="2004">2004</option>
            <option value="2003">2003</option>
            <option value="2002">2002</option>
            <option value="2001">2001</option>
            <option value="2000">2000</option>
            <option value="1999">1999</option>
            <option value="1998">1998</option>
            <option value="1997">1997</option>
            <option value="1996">1996</option>
            <option value="1995">1995</option>
            <option value="1994">1994</option>
            <option value="1993">1993</option>
            <option value="1992">1992</option>
            <option value="1991">1991</option>
            <option value="1990">1990</option>
            <option value="1989">1989</option>
            <option value="1988">1988</option>
            <option value="1987">1987</option>
            <option value="1986">1986</option>
            <option value="1985">1985</option>
          </select>
        </div>
        <button type="submit" className='add-button center'>
          Adicionar
        </button>
      </form>
    </Popup>
  )
}

export default AddCertificado