"use client"

// Imports React
import React from 'react'
import TextEditor from './TextEditor'

// Import Components
import UploadPhoto from './UploadPhoto'

const CreateCompanyForm = ({ title, nome, website, industria, tamanho, tipo, descricao, photo, confirm, handleClick }) => {
	return (
		<div className='create-company-form'>

			<div className='create-company-title'>
				<h1>
					Crie a sua {title}
				</h1>
				<p>
					Para criar a página de sua {title}, é necessário fornecer algumas informações básicas, além de possuir os direitos de cadastrar a mesma.
				</p>
			</div>

			<form onSubmit={handleClick}>
				<div className='input-create-company-container'>
					<p>Nome da {title} <span className='pink-span'>*</span></p>
					<input type="text" name="nome" id="nome" className='input-create-company' placeholder={`Digite um nome para a sua ${title}`} onChange={(e) => nome(e.target.value)} autoComplete='off' maxLength={60} minLength={2} required />
				</div>

				<div className='input-create-company-container'>
					<p>Website <span className='pink-span'>*</span></p>
					<input type="text" name="website" id="website" className='input-create-company' placeholder={`O domínio da sua ${title} na internet`} onChange={(e) => website(e.target.value)} autoComplete='off' maxLength={75} minLength={6} required />
				</div>

				<div className='input-create-company-container'>
					<p>Descrição <span className='pink-span'>*</span></p>
					<TextEditor setValue={descricao} />
				</div>

				<div className='input-create-company-container'>
					<p>Indústria <span className='pink-span'>*</span></p>
					<input type="text" name="industria" id="industria" className='input-create-company' placeholder={`Informe o ramo da sua ${title}`} onChange={(e) => industria(e.target.value)} autoComplete='off' maxLength={40} minLength={2} required />
				</div>

				<div className='input-create-company-container'>
					<p>Logo da Empresa <span className='pink-span'>*</span></p>
					<UploadPhoto file={photo} />
				</div>

				{/* <input type="file" name="baby" id="baby" onChange={(e) => photo(e.target.value)} /> */}

				<div className='input-create-company-container'>
					<p>Tamanho da {title} <span className='pink-span'>*</span></p>
					<select name="tamanho" id="tamanho" className='input-create-company' onChange={(e) => tamanho(e.target.value)} required>
						<option value=""></option>
						<option value="0 - 1 Colaboradoras">0 - 1 Colaboradoras</option>
						<option value="2 - 10 Colaboradoras">2 - 10 Colaboradoras</option>
						<option value="11 - 50 Colaboradoras">11 - 50 Colaboradoras</option>
						<option value="51 - 200 Colaboradoras">51 - 200 Colaboradoras</option>
						<option value="201 - 500 Colaboradoras">201 - 500 Colaboradoras</option>
						<option value="501 - 1.000 Colaboradoras">501 - 1.000 Colaboradoras</option>
						<option value="1.001 - 5.000 Colaboradoras">1.001 - 5.000 Colaboradoras</option>
						<option value="5.001 - 10.000 Colaboradoras">5.001 - 10.000 Colaboradoras</option>
						<option value="+ 10.000 Colaboradoras">+ 10.000 Colaboradoras</option>
					</select>
				</div>

				<div className='input-create-company-container'>
					<p>Tipo da {title} <span className='pink-span'>*</span></p>
					<select name="tipo" id="tipo" className='input-create-company' onChange={(e) => tipo(e.target.value)} required>
						<option value=""></option>
						<option value="Empresa Pública">Empresa Pública</option>
						<option value="Empresa Privada">Empresa Privada</option>
						<option value="Empresa Governamental">Empresa Governamental</option>
						<option value="Sem Fins Lucrativos">Sem Fins Lucrativos</option>
						<option value="Empresa Pessoal">Empresa Pessoal</option>
						<option value="Parceria">Parceria</option>
						<option value="Autonomo">Autonomo</option>
					</select>
				</div>

				<div className='input-create-company-container flex-permission'>
					<input type="checkbox" name="permissao" id="permissao" className='checkbox' value={"bebe iel"} onChange={(e) => confirm(e.target.value)} />
					<p>
						Confirmo que sou um representante
						autorizado desta organização e tenho o direito de agir em seu nome na criação e gestão desta página.
						A organização e eu concordamos com os termos adicionais das Páginas.
					</p>
				</div>

				<button type="submit" className='button-create-company icon-cursor'>
					Criar {title}
				</button>

			</form>
		</div>
	)
}

export default CreateCompanyForm