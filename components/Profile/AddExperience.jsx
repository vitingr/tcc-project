"use client"

// Imports React
import React, { useState } from 'react'
import { IoCloseSharp } from 'react-icons/io5'
import { toast } from 'react-toastify'
import Popup from '@components/Popup'

// Imports Components
import ToastMessage from '@components/Others/ToastMessage'
import { infoUser } from '@utils/userContext'

const AddExperience = ({ data, handleClick }) => {

  const {getInfo} = infoUser()
  const [empresa, setEmpresa] = useState("")
  const [cargo, setCargo] = useState("")
  const [aprendizado, setAprendizado] = useState("")
  const [erros, setErros] = useState(false)
  const [mesInicio, setMesInicio] = useState("")
  const [anoInicio, setAnoInicio] = useState("")
  const [mesFim, setMesFim] = useState("")
  const [anoFim, setAnoFim] = useState("")
  const [local, setLocal] = useState("")
  const [habilidades, setHabilidades] = useState("")

  const createExperiencia = async (e) => {

    e.preventDefault()

    if (empresa.length > 35) {
      toast.error("O nome da empresa é muito longa")
      setErros(true)
    }
    if (empresa.length < 4) {
      toast.error("O nome da empresa é muito curta")
      setErros(true)
    }
    if (cargo.length > 40) {
      toast.error("O nome do cargo é muito longo")
      setErros(true)
    }
    if (cargo.length < 4) {
      toast.error("O nome do cargo é muito curto")
      setErros(true)
    }
    if (!empresa) {
      toast.error("Informe a empresa trabalhada")
      setErros(true)
    }
    if (!aprendizado) {
      toast.error("Informe a experiência adquirida")
      setErros(true)
    }
    if (!cargo) {
      toast.error("Informe o cargo ocupado")
      setErros(true)
    }

    if (!mesInicio) {
      toast.error("Informe o mês de ingresso na empresa")
      setErros(true)
    }

    if (!mesFim) {
      toast.error("Informe o mês final na empresa")
      setErros(true)
    }

    if (!anoInicio) {
      toast.error("Informe o ano de ingresso na empresa")
      setErros(true)
    }

    if (!anoFim) {
      toast.error("Informe o ano final na empresa")
      setErros(true)
    }
    
    if (!habilidades) {
      toast.error("Informe as habilidades utilizadas no emprego")
      setErros(true)
    }

    if (anoFim < anoInicio) {
      toast.error("Não é possível a data de fim ser menor que a data de início")
      setErros(true)
    }

    if (erros === false) {
      try {
        const response = await fetch("/api/profile/experiencia/new", {
          method: "POST",
          body: JSON.stringify({
            userId: data._id,
            empresa: empresa,
            cargo: cargo,
            aprendizado: aprendizado,
            mesInicio: mesInicio,
            mesFim: mesFim,
            anoInicio: anoInicio,
            anoFim: anoFim,
            habilidades: habilidades,
            local: local
          })
        })
        if (response.ok) {
          toast.success("Experiência Adicionada")
          getInfo()
          handleClick(false)
        }
      } catch (error) {
        console.log(error)
      }
    }
  }

  return (
    <Popup title={"Adicionar Experiência"} subtitle={"Adicione suas experiências aqui para informar e atrair mais pessoas ao seu perfil"} handleClick={handleClick}>
      <ToastMessage />
      <form>
        <div className='input-add-container'>
          <p>Empresa <span className="pink-span">*</span></p>
          <input type="text" name="empresa" id="add-input" className='add-input' placeholder='ex: Natura LTDA.' autoComplete='off' maxLength={35} minLength={4} onChange={(e) => setEmpresa(e.target.value)} required />
        </div>

        <div className='input-add-container'>
          <p>Cargo</p>
          <input type="text" name="cargo" id="add-input" className='add-input' placeholder='ex: Auxiliar de Administração.' autoComplete='off' maxLength={40} minLength={4} onChange={(e) => setCargo(e.target.value)} required />
        </div>

        <div className='input-add-container'>
          <p>Local</p>
          <input type="text" name="cargo" id="add-input" className='add-input' placeholder='ex: Santa Bárbara Oeste, SP.' autoComplete='off' maxLength={40} minLength={4} onChange={(e) => setLocal(e.target.value)} />
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
          <p>Ano Final <span className="pink-span">*</span></p>
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

        <div className='input-add-container'>
          <p>Habilidades Utilizadas <span className="pink-span">*</span></p>
          <input type="text" name="habilidades" id="add-input" className='add-input' placeholder='As suas habilidades usadas nesse emprego' autoComplete='off' maxLength={60} minLength={4} onChange={(e) => setHabilidades(e.target.value)} required />
        </div>

        <div className='input-add-container'>
          <p>Experiência Adquirida <span className="pink-span">*</span></p>
          <textarea name="experiencia" id="add-input" className='add-input' placeholder='Experiência adquirida na empresa.' autoComplete='off' cols="30" rows="10" onChange={(e) => setAprendizado(e.target.value)} required></textarea>
        </div>
        <button type="submit" className='add-button center' onClick={(e) => createExperiencia(e)}>
          Adicionar
        </button>
      </form>
    </Popup>

  )
}

export default AddExperience