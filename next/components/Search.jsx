import React from 'react'
import { IoSearchSharp, IoClose } from 'react-icons/io5'
import { useRef, useState } from 'react'
import useOutsideClick from './hooks/useClickOutside'

export default function Search() {
  const [input, setInput] = useState('')
  const [open, setOpen] = useState(false)
  const [data, setData] = useState([
    { id: 1, name: 'name1' },
    { id: 2, name: 'name2' },
    { id: 3, name: 'name3' },
    { id: 4, name: 'name4' },
  ])
  const box = useRef()

  useOutsideClick(box, () => {
    setOpen(false)
  })
  // useEffect(() => {
  //   axios.get('https://jsonplaceholder.typicode.com/users').then((data) => {
  //     setData(data.data)
  //   })
  // }, [])

  const handleInputChange = (e) => {
    setInput(e.target.value)
    setOpen(true)
  }
  return (
    <div className='relative z-50 w-[500px]' ref={box}>
      <IoSearchSharp
        className='absolute top-[10px] left-2 pointer-events-none text-gray-400'
        size={20}
      />
      <input
        type='text'
        placeholder='search'
        value={input}
        onChange={handleInputChange}
        onClick={() => setOpen(true)}
        className='bg-gray-800 px-8 py-2 rounded w-full'
      />
      {input && (
        <IoClose
          size={30}
          onClick={() => setInput('')}
          className='absolute top-[6px] right-1 transition duration-100 ease-in-out hover:bg-white/10 rounded-full p-1 '
        />
      )}

      {open && (
        <div className='absolute max-h-96 z-20 overflow-auto w-full bg-gray-800 filter backdrop-blur border-white/10 border rounded mt-1 shadow-2xl'>
          {data.length > 0 ? (
            data.map((item, index) => {
              return (
                <div
                  key={item.id}
                  onClick={() => setInput(item.name)}
                  className='px-3 py-2 hover:bg-gray-700 hover:cursor-pointer flex gap-3 overflow-hidden '
                >
                  <img
                    src='https://cdn.mos.cms.futurecdn.net/mazxzBYCELCU93BVrS2Raf.jpg'
                    alt=''
                    className='w-14 h-14 md:w-20 md:h-20 object-cover bg-cover'
                  />
                  <div>
                    <h3 className='uppercase text-lg md:text-xl w-full font-semibold text-gray-100 leading-7'>
                      Far cry 6 sds
                    </h3>
                    <p className='text-sky-400 text-lg md:text-xl [text-shadow:0px_0px_2px_rgb(56_189_248/0.9)]'>
                      45.00$
                    </p>
                  </div>
                </div>
              )
            })
          ) : (
            <h5 className='px-3 py-2 '>Not found</h5>
          )}
        </div>
      )}
    </div>
  )
}
