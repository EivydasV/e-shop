import React, { useState } from 'react'
import { IoBagCheck } from 'react-icons/io5'
import { useQuery, useMutation, useQueryClient } from 'react-query'
import { useRouter } from 'next/router'
import { useAuth } from '../../context/AuthContext'
import { IoRemoveCircleOutline } from 'react-icons/io5'
import Snackbar from '@mui/material/Snackbar'
import MuiAlert from '@mui/material/Alert'
import axios from 'axios'
export default function cart() {
  const [isOpen, setIsOpen] = useState(false)

  const queryClient = useQueryClient()

  const { currentUser } = useAuth()
  const router = useRouter()

  if (!currentUser) return router.replace('/')
  const { data, isLoading } = useQuery('get-cart', () =>
    axios.get('user/get-cart')
  )
  const { mutate } = useMutation(
    (data) => axios.delete(`user/remove-item-cart/${data}`),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('get-cart')
      },
    }
  )
  const { mutate: mutateBuy } = useMutation(() => axios.post('product/buy'), {
    onSuccess: (data) => {
      queryClient.invalidateQueries('get-cart')
      setIsOpen(true)
    },
  })
  if (isLoading) return null
  return (
    <>
      <span className='inline-block space-y-1 w-min'>
        <h1 className='text-4xl font-semibold tracking-wide inline-block '>
          Cart
        </h1>
        <hr className='h-1 bg-sky-600 w-8/12 border-none' />
      </span>
      <div className='shadow overflow-x-auto border-b border-gray-800 sm:rounded-lg'>
        <table className='min-w-full divide-y divide-gray-400 overflow-x-auto'>
          <thead className='bg-white/10'>
            <tr>
              <th
                scope='col'
                className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider'
              >
                Title
              </th>

              <th
                scope='col'
                className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider'
              >
                Platform
              </th>
              <th
                scope='col'
                className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider'
              >
                Price
              </th>
              <th
                scope='col'
                className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider'
              >
                Remove
              </th>
            </tr>
          </thead>
          <tbody className='bg-white/5 divide-y divide-gray-800'>
            {data.data.cart.map((game) => (
              <tr key={game._id}>
                <td className='px-6 py-4 whitespace-nowrap'>
                  <div className='flex items-center'>
                    <div className='flex-shrink-0 h-10 w-10'>
                      <img
                        className='h-10 w-10 object-cover rounded'
                        src={`http://localhost:5000/public/images/${game.images[0]}`}
                        alt=''
                      />
                    </div>
                    <div className='ml-4'>
                      <div className='text-sm font-medium text-gray-200'>
                        {game.title}
                      </div>
                    </div>
                  </div>
                </td>

                <td className='px-6 py-4 whitespace-nowrap space-x-1'>
                  {game.os.map((os) => (
                    <span
                      key={os}
                      className='px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800'
                    >
                      {os}
                    </span>
                  ))}
                </td>
                <td className='px-6 py-4 whitespace-nowrap text-indigo-400 font-semibold text-lg'>
                  {game.price}$
                </td>
                <td className='px-6 py-4 whitespace-nowrap text-indigo-400 font-semibold text-lg'>
                  <IoRemoveCircleOutline
                    onClick={() => mutate(game._id)}
                    size={30}
                    color='red'
                    className='cursor-pointer  rounded-full'
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className='flex justify-end'>
        {data.data.cart.length > 0 && (
          <button
            onClick={mutateBuy}
            className='flex place-items-center gap-1 bg-gradient-to-r from-indigo-500 to-sky-500 px-3 py-2 font-medium text-xl rounded shadow-indigo-500/50 [box-shadow:0px_0px_15px_rgb(99_102_241/0.9)]'
          >
            <IoBagCheck />
            Proceed checkout
          </button>
        )}
      </div>
      <Snackbar
        open={isOpen}
        autoHideDuration={4000}
        onClose={() => setIsOpen(false)}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MuiAlert
          onClose={() => setIsOpen(false)}
          severity='success'
          sx={{ width: '100%' }}
        >
          purchase was successful
        </MuiAlert>
      </Snackbar>
    </>
  )
}
