"use client"

// Imports React
import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

// Imports NextAuth
import { signOut, useSession } from "next-auth/react"

// Imports Icons
import { IoSearchOutline, IoHomeSharp, IoGitNetwork, IoBriefcaseSharp, IoNotifications, IoSettingsSharp, IoExit, IoNewspaper, IoMenuSharp, IoBusinessOutline, IoPeopleSharp, IoPencilOutline, IoThumbsUpSharp, IoPodiumSharp } from 'react-icons/io5'
import { infoUser } from '@utils/userContext'
import { redirect } from 'next/navigation'
import ProfileSidebar from './ProfileSidebar'

const Navbar = () => {

	const { data: session } = useSession()
	const { data, premiumInfo } = infoUser()
	const router = useRouter()

	const [searchText, setSearchText] = useState("")
	const [isMenuOpen, setIsMenuOpen] = useState(false)

	const search = async (e) => {
		e.preventDefault()
		const query = searchText.replace(" ", "-")
		router.push(`/usuario/search/${query}`)
	}

	return (
		<header className='header'>
			{session?.user ? (
				<nav className='navbar' id="navbar">

					<div className="profile-photo-navbar-sm">
						<Link href="/usuario/profile">
							<div className='center'>
								<img src={data.foto} className='very-small-rounded-photo scale-transform' alt='photo' />
							</div>
						</Link>
					</div>

					<div className='search-container'>
						<img src="https://i.pinimg.com/736x/3d/37/60/3d3760207a12e626f1149118404e003d.jpg" alt="logo" className='search-logo' />
						<form onSubmit={search} className='search-content'>
							<div className='search-content'>
								<Link href={`/usuario/search/${searchText}`}>
									<div className='icon-cursor center'>
										<IoSearchOutline size={22.5} />
									</div>
								</Link>
								<input type="text" id="search-items" name="search-items" placeholder='Buscar' onChange={(e) => setSearchText(e.target.value)} required />
							</div>
						</form>
					</div>

					<div className='nav-content'>
						<ul className='nav-list'>
							<li>
								<Link href="/usuario/feed" className='link-nav center'>
									<div><IoHomeSharp size={17.5} /></div>
									<p>Início</p>
								</Link>
							</li>
							<li>
								<Link href="/usuario/amigos" className='link-nav center'>
									<div><IoGitNetwork size={17.5} /></div>
									<p>Network</p>
								</Link>
							</li>
							<li>
								<Link href="/usuario/empregos" className='link-nav center'>
									<div><IoBriefcaseSharp size={17.5} /></div>
									<p>Emprego</p>
								</Link>
							</li>
							<li>
								<Link href="/usuario/notificacoes" className='link-nav center'>
									<div><IoNotifications size={17.5} /></div>
									<p>Notif.</p>
									<div className="qtd-notificacoes">
										{data.notificacoes}
									</div>
								</Link>
							</li>
							<li className="settings">
								<Link href="/usuario/settings" className='link-nav center'>
									<div><IoSettingsSharp size={17.5} /></div>
									<p>Settings</p>
								</Link>
							</li>
							<li>
								<Link href="#" className='link-nav center'>
									<div><IoNewspaper size={17.5} /></div>
									<p>News</p>
								</Link>
							</li>
						</ul>
					</div>

					<div className='actions-navbar center'>
						<Link href="/usuario/profile">
							<div className='center'>
								<img src={data.foto} className='very-small-rounded-photo scale-transform' alt='photo' />
							</div>
						</Link>
						<div className='sign-out center icon-cursor' onClick={signOut}>
							Sign Out
						</div>
					</div>

					<div className='menu-navbar' onClick={() => setIsMenuOpen(!isMenuOpen)}>
						<IoMenuSharp size={30} />
					</div>

					{isMenuOpen ? (
						<div className='home-profile-menu'>
							<div className={premiumInfo.background === 'animated' ? 'background-home-profile-animated-menu' : 'background-home-profile-menu'} style={{ backgroundImage: `url(${data.background})` }}>
							</div>
							<div className='photo-home-profile-menu center' />
							<div className='info-home-profile-menu'>
								<div className='home-basic-info-menu'>
									<Link href="/usuario/profile">
										<h2>{data.nomeCompleto}</h2>
									</Link>
									<p>{data.email}</p>
								</div>
								<div className='home-friends-menu'>
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
								<div className='home-options-menu'>
									<Link href="/usuario/amigos">
										<li className='icon-cursor'>
											<div className='center'><IoPeopleSharp size={22.5} /></div>
											<div>Ver amizades</div>
										</li>
									</Link>
									<Link href="/empresa">
										<li className='icon-cursor'>
											<div className='center'><IoBusinessOutline size={22.5} /></div>
											<div>Conta Empresarial</div>
										</li>
									</Link>
									<Link href="/usuario/profile">
										<li className='icon-cursor'>
											<div className='center'><IoPencilOutline size={22.5} /></div>
											<div>Editar perfil</div>
										</li>
									</Link>
									<li className='icon-cursor'>
										<div className='center'><IoThumbsUpSharp size={22.5} /></div>
										<div>Minhas curtidas</div>
									</li>
									<li className='icon-cursor'>
										<div className='center'><IoPodiumSharp size={22.5} /></div>
										<div className='center'>Atividade perfil</div>
									</li>
								</div>
							</div>
						</div>
					) : (<></>)}

				</nav>
			) : (
				<></>
			)}
		</header>
	)
}

export default Navbar