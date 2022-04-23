import axios from 'axios'
import { useRouter } from 'next/router'
import { useQuery } from 'react-query'
import Card from '../components/Card'
import Carousel from '../components/Carousel'

export default function Home() {
  const { data, isLoading } = useQuery('best-sellers', () =>
    axios.get('product/best-sellers')
  )
  const router = useRouter()
  return (
    <>
      <Carousel />
      <>
        <h2 className='uppercase rounded-sm mb-4 text-3xl text-center py-1 font-semibold bg-white/10 tracking-wide text-gray-300'>
          Bestsellers
        </h2>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 justify-center'>
          {!isLoading &&
            data?.data?.products?.map((item) => (
              <div
                key={item._id}
                className='divide-y divide-yellow-500/60 border border-blueGray-700 rounded-md overflow-hidden'
              >
                <img
                  className='w-full h-56 object-cover'
                  src={`http://localhost:5000/public/images/${
                    item?.images[0] || ''
                  }`}
                  alt=''
                />
                <div className='bg-white/10 p-3 h-full'>
                  <h2 className='text-2xl truncate  uppercase font-semibold border-b border-white/10 leading-relaxed'>
                    {item.title}
                  </h2>
                  <div className='mt-7 flex justify-between'>
                    <p className='text-gray-400 text-2xl '> {item.price}$</p>
                    <button
                      onClick={() => router.push(`/games/${item._id}`)}
                      className='px-4 py-2 bg-white/10 shadow-lg uppercase font-semibold tracking-wider text-green-500 hover:bg-gray-700'
                    >
                      More
                    </button>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </>
    </>
  )
}
