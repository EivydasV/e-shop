import { Menu, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import {
  IoCartSharp,
  IoPersonSharp,
  IoLogOut,
  IoCloudUploadSharp,
  IoPlayForwardCircleSharp,
} from 'react-icons/io5'
import Link from 'next/link'
import { useMutation, useQueryClient, useQuery } from 'react-query'
import axios from 'axios'
import Router from 'next/router'
import { useAuth } from '../../context/AuthContext'

export default function UserPopover() {
  const { currentUser } = useAuth()
  console.log({ currentUser })
  const queryClient = useQueryClient()
  const { mutateAsync } = useMutation(() => axios.post('user/logout'), {
    onSettled: () => {
      queryClient.invalidateQueries('me')
      Router.replace('/')
    },
  })

  const { data, isLoading } = useQuery(
    'get-cart',
    () => axios.get('user/get-cart'),
    { retry: false }
  )
  return (
    <Menu as='div' className='inline-block text-left z-10'>
      <div>
        <Menu.Button className='inline-flex items-center gap-1 border border-white/10 justify-center w-full px-4 py-2 text-sm font-semibold text-white bg-black rounded-md bg-opacity-20 hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 '>
          <IoPersonSharp />
        </Menu.Button>
      </div>
      <Transition
        as={Fragment}
        enter='transition ease-out duration-100'
        enterFrom='transform opacity-0 scale-95'
        enterTo='transform opacity-100 scale-100'
        leave='transition ease-in duration-75'
        leaveFrom='transform opacity-100 scale-100'
        leaveTo='transform opacity-0 scale-95'
      >
        <Menu.Items className='absolute right-0 w-56 mt-2 origin-top-right bg-slate-900/95 border  border-white/10 divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
          <div className='px-1 py-1 z-10'>
            {/* <Link href='/user'>
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={`${
                      active && 'bg-slate-800 '
                    } group flex gap-1 font-semibold rounded-md items-center w-full px-2 py-2 text-sm`}
                  >
                    <IoPersonSharp />
                    My profile
                  </button>
                )}
              </Menu.Item>
            </Link> */}

            <Link href='/user/cart'>
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={`${
                      active && 'bg-slate-800 '
                    } group flex gap-1 rounded-md items-center w-full px-2 py-2 text-sm font-semibold`}
                  >
                    <IoCartSharp />
                    Cart
                    {!isLoading && data?.data?.cart?.length > 0 && (
                      <span className='inline-flex ml-auto items-center justify-center px-[6px] py-1 mr-2 text-xs font-bold leading-none text-red-100 bg-sky-500 rounded-full shadow shadow-sky-500/50'>
                        {data.data.cart.length}
                      </span>
                    )}
                  </button>
                )}
              </Menu.Item>
            </Link>
            <Link href='/games/my-games'>
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={`${
                      active && 'bg-slate-800 '
                    } group flex gap-1 rounded-md items-center w-full px-2 py-2 text-sm font-semibold`}
                  >
                    <IoPlayForwardCircleSharp />
                    My games
                  </button>
                )}
              </Menu.Item>
            </Link>
            <Link href='/games/create'>
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={`${
                      active && 'bg-slate-800 '
                    } group flex gap-1 rounded-md items-center w-full px-2 py-2 text-sm font-semibold`}
                  >
                    <IoCloudUploadSharp />
                    Upload a game
                  </button>
                )}
              </Menu.Item>
            </Link>

            <Menu.Item>
              {({ active }) => (
                <button
                  onClick={mutateAsync}
                  className={`${
                    active && 'bg-slate-800 cursor-pointer'
                  } group flex gap-1 font-semibold rounded-md items-center w-full px-2 py-2 text-sm cursor-pointer`}
                >
                  <IoLogOut />
                  Log out
                </button>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  )
}
