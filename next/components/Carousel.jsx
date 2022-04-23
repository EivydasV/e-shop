import '@splidejs/splide/dist/css/splide.min.css'
import { Splide, SplideSlide } from '@splidejs/react-splide'
import { useQuery } from 'react-query'
import axios from 'axios'
import { useRouter } from 'next/router'

export default function Carousel() {
  const router = useRouter()
  const { data, isLoading } = useQuery(
    'carousel-images',
    () => axios.get('product/carousel-images'),
    { retry: false, refetchOnWindowFocus: false }
  )
  console.log(data)
  return (
    <div className='relative overflow-hidden rounded-lg'>
      <Splide
        options={{
          type: 'loop',
          gap: '1rem',
          autoplay: true,
          height: 550,
          interval: 3500,
          // pauseOnHover: false,
          resetProgress: false,
          arrows: 'slider',
          easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
          autoHeight: true,
          lazyLoad: true,
        }}
      >
        {!isLoading &&
          data?.data?.product?.map((item) => {
            // console.log({ item })
            return (
              <SplideSlide
                key={item._id}
                onClick={() => router.push('games/' + item._id)}
              >
                <div className='relative w-full h-full cursor-pointer'>
                  <img
                    src={`http://localhost:5000/public/images/${
                      item?.images[0] || ''
                    }`}
                    alt='Image 1'
                    className='w-full h-full object-cover'
                  />
                  <div className='absolute inset-0 bg-blue-800/30 flex flex-col justify-center px-20 '></div>
                </div>
              </SplideSlide>
            )
          })}
      </Splide>
    </div>
  )
}
