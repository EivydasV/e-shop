import ImageGallery from 'react-image-gallery'
import 'react-image-gallery/styles/css/image-gallery.css'
import ReactPlayer from 'react-player'
import { IoBagCheck } from 'react-icons/io5'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import axios from 'axios'
import Snackbar from '@mui/material/Snackbar'
import MuiAlert from '@mui/material/Alert'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { useAuth } from '../../context/AuthContext'

export default function GameId() {
  const [isOpen, setIsOpen] = useState(false)

  const queryClient = useQueryClient()
  const { currentUser } = useAuth()
  const { GameId } = useRouter().query

  const { data, error, isLoading } = useQuery(['get-by-id', GameId], () =>
    axios.get('product/' + GameId)
  )
  const { mutate } = useMutation(
    (data) => axios.put('user/add-to-cart', { id: data }),
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries('get-cart')
        setIsOpen(true)
      },
    }
  )

  if (isLoading) return <div>Loading...</div>
  if (error?.response?.status === 404) return <h1>404</h1>

  const game = data?.data?.product
  console.log({ game })
  const images = game.images.map((image) => ({
    original: `http://localhost:5000/public/images/${image}`,
  }))
  return (
    <>
      <div className=''>
        <div className='col-span-2'>
          <ImageGallery items={images} />
        </div>
        <div className='md:border-t mt-3 md:border-gray-800 shadow-2xl p-4 flex flex-col gap-4 justify-between'>
          <h1 className='uppercase text-5xl text-center font-semibold font'>
            {game.title}
          </h1>
          <div className='flex-1'>
            <p className='text-2xl'>
              In stock -{' '}
              <span className='uppercase text-2xl font-semibold'>
                {game.inStock}
              </span>
            </p>
          </div>
          <div className='flex-1'>
            <p className='text-2xl'>
              Uploaded by -{' '}
              <span className='uppercase text-2xl font-semibold'>
                {game.createdBy.firstName}
              </span>
            </p>
          </div>
          <button
            disabled={!game.inStock || !currentUser}
            onClick={() => mutate(game._id)}
            className={`flex justify-center items-center gap-3 w-full font-semibold text-2xl uppercase px-4 py-3 bg-gradient-to-r  ${
              !game.inStock || !currentUser
                ? 'bg-gray-900'
                : 'from-purple-500 to-pink-500'
            } rounded-md  transition ease-in hover:drop-shadow-2xl hover:translate-y-[-0.25rem]`}
          >
            <IoBagCheck />
            Add to Cart
            <span className='uppercase text-3xl'> {game.price}$</span>
          </button>
        </div>
      </div>
      <div className='flex flex-col gap-y-8'>
        <div className='flex flex-col gap-4 '>
          <h1 className='uppercase text-3xl font-semibold border-b border-white/20 leading-relaxed'>
            Categories
          </h1>
          <div className='flex gap-3 flex-wrap'>
            {game.categories.map((category) => (
              <span
                key={category}
                className='px-3 py-1 text-lg tracking-wide font-bold leading-none text-blueGray-200 bg-yellow-400 bg-opacity-0 border transition border-yellow-400 shadow-lg rounded-full'
              >
                {category}
              </span>
            ))}
          </div>
        </div>
        <div className='flex flex-col gap-4 '>
          <h1 className='uppercase text-3xl font-semibold border-b border-white/20 leading-relaxed'>
            description
          </h1>

          <div className='bg-white/10 px-3 py-4 rounded-md shadow-sm'>
            <p className='text-lg'>{game.description}</p>
          </div>
        </div>
        <div className='flex flex-col gap-4 '>
          <h1 className='uppercase text-3xl font-semibold border-b border-white/20 leading-relaxed'>
            Trailer
          </h1>

          <div className='aspect-w-16 aspect-h-6 container w-3xl h-96 self-center'>
            <ReactPlayer
              className=''
              width='auto'
              height='auto'
              url={game.trailer}
              controls
            />
          </div>
        </div>
      </div>
      <Snackbar
        open={isOpen}
        autoHideDuration={2000}
        onClose={() => setIsOpen(false)}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MuiAlert
          onClose={() => setIsOpen(false)}
          severity='success'
          sx={{ width: '100%' }}
        >
          Games was successfully added to cart
        </MuiAlert>
      </Snackbar>
    </>
  )
}
