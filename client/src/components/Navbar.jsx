import React, { useContext, useEffect } from 'react'
import { assets } from '../assets/assets'
import { Link, useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'

const Navbar = () => {

    const { setShowLogin, user, credit, logout } = useContext(AppContext)

    const navigate = useNavigate()

    return (
        <div className='flex items-center justify-between py-4'>

            <Link to='/'><img className='w-28 sm:w-32 lg:w-40' src={assets.logo} alt="" /></Link>

            <div>
                {
                    user
                        ? <div className='flex items-center gap-2 sm:gap-3'>
                            <p className='text-gray-600 max-sm:hidden pl-4'>Hi, {user.name}</p>
                            <div className='relative group'>
                                <img className='w-10 drop-shadow' src={assets.profile_icon} alt="" />
                                <div className='absolute hidden group-hover:block top-0 right-0 z-10 text-black rounded  pt-12'>
                                    <ul className='list-none m-0 p-2 bg-white rounded-md border  text-sm'>
                                        <li onClick={() => navigate('/gallery')} className='py-1 px-2 cursor-pointer pr-10'>My Gallery</li>
                                        <li onClick={() => navigate('/result')} className='py-1 px-2 cursor-pointer pr-10'>Generate Image</li>
                                        <li onClick={logout} className='py-1 px-2 cursor-pointer pr-10 border-t mt-1 pt-2'>Logout</li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        : <div className='flex items-center gap-2 sm:gap-5'>
                            <button onClick={() => setShowLogin(true)} className='bg-zinc-800 text-white px-7 py-2 sm:px-10 sm:py-2 text-sm rounded-full'>
                                Login
                            </button>
                        </div>
                }
            </div>
        </div>
    )
}

export default Navbar