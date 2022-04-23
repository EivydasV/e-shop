import { IoLogIn } from 'react-icons/io5'
import { useState } from 'react'
import UserPopover from './UserPopover'

import Search from '../Search'
import LoginModal from './LoginModal'

import axios from 'axios'
import MyCombobox from '../comboBox'
import { useAuth } from '../../context/AuthContext'
import { useRouter } from 'next/router'
// const data = [
//   { id: 1, name: 'name1' },
//   { id: 2, name: 'name2' },
//   { id: 3, name: 'name3' },
//   { id: 4, name: 'name4' },
// ]
export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const { currentUser } = useAuth()
  const router = useRouter()

  return (
    <>
      <div className='flex justify-between items-center gap-5 bg-white/5 backdrop-blur-lg py-4 px-3 sm:px-6 border-white/10 border-b 10 shadow-xl mb-5'>
        <h1
          onClick={() => router.push('/')}
          className='text-2xl font-semibold cursor-pointer tracking-wide'
        >
          Home
        </h1>
        <MyCombobox />
        <div className='flex items-center gap-3'>
          {!currentUser && (
            <button
              onClick={() => setIsOpen(true)}
              className='flex gap-1 justify-center items-center bg-sky-500 px-2 py-1 rounded font-semibold hover:bg-sky-400 [box-shadow:0px_0px_15px_rgb(56_189_248/0.9)]'
            >
              <IoLogIn size={20} />
              Login
            </button>
          )}

          {currentUser && <UserPopover />}
        </div>
      </div>
      <LoginModal isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  )
}
