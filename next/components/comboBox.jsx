import { Fragment, useEffect, useState } from 'react'
import { Combobox, Transition } from '@headlessui/react'
import {
  IoSearchSharp,
  IoChevronDownOutline,
  IoCheckmarkSharp,
} from 'react-icons/io5'
import useDebounce from './hooks/useDebounce'
import { useQuery } from 'react-query'
import axios from 'axios'
import { useRouter } from 'next/router'

export default function Example() {
  const [selected, setSelected] = useState('')
  const [products, setProducts] = useState([])
  const [query, setQuery] = useState('')
  const debouncedQuery = useDebounce(query, 200)
  const router = useRouter()

  const { data, isLoading } = useQuery(
    ['search', debouncedQuery],
    () => axios.get(`product/search?search=${debouncedQuery}`),
    {
      retry: false,
      refetchOnWindowFocus: false,
      keepPreviousData: true,
      onSuccess: (data) => {
        setProducts(data.data.product)
      },
    }
  )
  useEffect(() => {
    if (selected) {
      router.push(`/games/${selected._id}`)
    }
  }, [selected])
  console.log(selected)
  return (
    <div className='relative w-[500px] z-10'>
      <Combobox value={selected.title} onChange={setSelected}>
        <div className='relative mt-1 '>
          <div className='relative bg-gray-800 text-left rounded-lg shadow-md cursor-default focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-blue-700 focus-visible:ring-offset-teal-300 focus-visible:ring-offset-2 sm:text-sm overflow-hidden'>
            <Combobox.Input
              className='w-full border-none focus:ring-0 py-2 pl-3 pr-10 text-sm leading-5 bg-gray-800 text-gray-100'
              displayValue={(product) => product}
              placeholder='Search for a game'
              onChange={(event) => setQuery(event.target.value)}
            />
            <Combobox.Button className='absolute inset-y-0 right-0 flex items-center pr-2'>
              <IoChevronDownOutline
                className='w-5 h-5 text-gray-400'
                aria-hidden='true'
              />
            </Combobox.Button>
          </div>
          <Transition
            as={Fragment}
            leave='transition ease-in duration-100'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
            afterLeave={() => setQuery('')}
          >
            <Combobox.Options className=' absolute w-full py-1 mt-1 overflow-auto text-base bg-gray-800  rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm'>
              {products.length === 0 && query !== '' ? (
                <div className='cursor-default select-none relative py-2 px-4 text-gray-700'>
                  Nothing found.
                </div>
              ) : (
                products.map((product) => (
                  <Combobox.Option
                    key={product._id}
                    className={({ active }) =>
                      `select-none relative py-2 pl-4 pr-4 cursor-pointer ${
                        active ? 'text-white bg-sky-600' : 'text-white'
                      }`
                    }
                    onClick={() => console.log({ click: products })}
                    value={product}
                  >
                    {({ selected, active }) => (
                      <>
                        <div className='flex justify-between'>
                          <span
                            className={`block truncate ${
                              selected ? 'font-medium' : 'font-semibold'
                            }`}
                          >
                            {product.title}
                          </span>
                          <span className='font-semibold text-orange-500'>
                            {product.price}$
                          </span>
                        </div>
                        {selected ? (
                          <span
                            className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                              active ? 'text-white' : 'text-teal-600'
                            }`}
                          >
                            <IoCheckmarkSharp
                              className='w-5 h-5'
                              aria-hidden='true'
                            />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Combobox.Option>
                ))
              )}
            </Combobox.Options>
          </Transition>
        </div>
      </Combobox>
    </div>
  )
}
