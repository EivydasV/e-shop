import React from 'react'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import Card from '../../components/Card'
import axios from 'axios'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { useAuth } from '../../context/AuthContext'
const MyGames = () => {
  const { currentUser } = useAuth()
  const router = useRouter()

  if (!currentUser) return router.replace('/')

  const queryCLient = useQueryClient()
  const { data, isLoading } = useQuery('my-products', () =>
    axios.get('product/my-products')
  )
  const { mutate } = useMutation(
    'delete-products',
    (id) => axios.delete('product/' + id),
    { onSuccess: () => queryCLient.invalidateQueries('my-products') }
  )
  // console.log(data)
  return (
    <>
      <div className='inline-block space-y-1 '>
        <h1 className='text-4xl font-semibold tracking-wide inline-block uppercase'>
          Your uploaded games
        </h1>
        <hr className='h-1 bg-sky-600 w-28 border-none' />
      </div>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:gri gap-4 justify-center'>
        {!isLoading &&
          data?.data?.products?.map((item) => (
            <Link key={item._id} href={`/games/${item._id}`}>
              <div className='divide-y cursor-pointer divide-yellow-500/60 border border-blueGray-700 rounded-md overflow-hidden'>
                <img
                  className='w-full h-56 object-cover'
                  src={`http://localhost:5000/public/images/${
                    item.images[0] || ''
                  }`}
                  alt=''
                />
                <div className='bg-white/10 p-3'>
                  <h2 className='text-4xl uppercase font-semibold border-b border-white/10 leading-relaxed'>
                    {item.title}
                  </h2>
                  <div className='mt-7 flex justify-between'>
                    <p className='text-gray-400 text-2xl '>{item.price}$</p>
                    <button
                      onClick={() => mutate(item._id)}
                      className='px-4 py-2 bg-white/10 shadow-lg uppercase font-semibold tracking-wider text-red-500 hover:bg-gray-700'
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </Link>
          ))}
      </div>
    </>
  )
}
export default MyGames
