"use client"

// Imports React
import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

// Imports NextAuth
import { signOut, useSession } from "next-auth/react"

// Imports Icons
import { IoSearchOutline, IoHomeSharp, IoGitNetwork, IoBriefcaseSharp, IoNotifications, IoSettingsSharp, IoExit, IoNewspaper, IoMenuSharp } from 'react-icons/io5'
import { infoUser } from '@utils/userContext'

const Navbar = () => {

	const { data: session } = useSession()
	const {data} = infoUser()

	return (
		<header>
			{session?.user ? (
				<nav className='navbar' id="navbar">
					<div className='search-container'>
						<img src="https://i.pinimg.com/736x/3d/37/60/3d3760207a12e626f1149118404e003d.jpg" alt="logo" className='search-logo' />
						<div className='search-content'>
							<div className='icon-cursor center'>
								<IoSearchOutline size={22.5} />
							</div>
							<input type="text" name="search-home" id="search-home" placeholder='Buscar' />
						</div>
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
							<li>
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

					<div className='menu-navbar'>
						<IoMenuSharp size={30} />
					</div>

				</nav>
			) : (
				<div></div>
			)}
		</header>
	)
}

export default Navbar