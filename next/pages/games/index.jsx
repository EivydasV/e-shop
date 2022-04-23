import React, { useState } from 'react'
import Slider from '@mui/material/Slider'
import { FormControlLabel, Checkbox, FormGroup } from '@mui/material'
import { Disclosure, Transition } from '@headlessui/react'

import { IoLogoEuro, IoChevronDown } from 'react-icons/io5'
import Card from '../../components/Card'

export default function Games() {
  const [value, setValue] = useState([20, 37])

  const handleSliderChange = (event, newValue) => {
    setValue(newValue)
  }
  return (
    <>
      <div className='grid grid-cols-5 grid-rows-2 gap-4 relative'>
        <DesktopFilter
          value={value}
          handleChange={handleSliderChange}
          setValue={setValue}
        />
        <div className='col-span-5 lg:col-span-4'>
          <MobileFilter
            value={value}
            handleChange={handleSliderChange}
            setValue={setValue}
          />

          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 justify-center'>
            {[
              0, 1, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
              20,
            ].map((item) => (
              <Card key={item} />
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
function DesktopFilter({ value, handleChange, setState }) {
  return (
    <div className='bg-white/5 row-span-1 rounded px-3 py-2 border-r border-white/20 shadow-lg hidden lg:block '>
      <div>
        <h2 className='font-semibold text-2xl mb-2'>Price range</h2>
        <div className='flex justify-between items-center'>
          <div className='relative'>
            <IoLogoEuro className='absolute top-3 left-1' />
            <input
              type='text'
              maxLength='4'
              value={value[0]}
              readOnly
              className='form-input bg-black/40 border-none rounded-lg w-[4.5rem] pl-6 a'
            />
          </div>
          <hr className='bg-white/20 border-0 h-[1px] w-16' />
          <div className='relative'>
            <IoLogoEuro className='absolute top-3 left-1' />
            <input
              type='text'
              maxLength='4'
              value={value[1]}
              readOnly
              className='form-input bg-black/40 border-none rounded-lg w-[4.5rem] pl-6'
            />
          </div>
        </div>
        <div>
          <Slider
            getAriaLabel={() => 'Price range'}
            value={value}
            onChange={handleChange}
            valueLabelDisplay='auto'
          />
        </div>
      </div>
      <div>
        <h2 className='font-semibold text-2xl mb-2'>Creators</h2>
        <div className='flex flex-col gap-2'>
          <FormGroup>
            {[...Array(5).keys()].map((id) => {
              return (
                <FormControlLabel
                  key={id}
                  control={<Checkbox value={id} />}
                  label='Options '
                />
              )
            })}
          </FormGroup>
        </div>
      </div>
      <div>
        <h2 className='font-semibold text-2xl mb-2'>Operacinė sistema</h2>
        <div className='flex flex-col gap-2'>
          <FormGroup>
            {['windows', 'Mac', 'Linux'].map((op) => {
              return (
                <FormControlLabel
                  key={op}
                  control={<Checkbox value={op} />}
                  label={op}
                />
              )
            })}
          </FormGroup>
        </div>
      </div>
    </div>
  )
}

function MobileFilter({ value, handleChange }) {
  return (
    <div className='mb-5 lg:hidden'>
      <Disclosure>
        {({ open }) => (
          <>
            <Disclosure.Button className='flex items-center gap-1 bg-zinc-700 py-2 px-3 rounded mb-2'>
              Filters{' '}
              <IoChevronDown
                size={20}
                className={`${open ? 'transform rotate-180' : ''}`}
              />
            </Disclosure.Button>

            <Transition
              show={open}
              enter='transition duration-200 ease-out origin-top'
              enterFrom='transform scale-y-0 opacity-0'
              enterTo='transform scale-y-100 opacity-100'
              leave='transition duration-200 ease-out origin-top'
              leaveFrom='transform scale-y-100 opacity-100'
              leaveTo='transform scale-y-0 opacity-0'
            >
              <Disclosure.Panel static>
                <div className='bg-white/5 row-span-1 rounded px-3 py-2 border-r border-white/20 shadow-lg '>
                  <div>
                    <h2 className='font-semibold text-2xl mb-2'>Price range</h2>
                    <div className='flex justify-between items-center'>
                      <div className='relative'>
                        <IoLogoEuro className='absolute top-3 left-1' />
                        <input
                          type='text'
                          maxLength='4'
                          value={value[0]}
                          readOnly
                          className='form-input bg-black/40 border-none rounded-lg w-[4.5rem] pl-6'
                        />
                      </div>
                      <hr className='bg-white/20 border-0 h-[1px] w-16' />
                      <div className='relative'>
                        <IoLogoEuro className='absolute top-3 left-1' />
                        <input
                          type='text'
                          maxLength='4'
                          value={value[1]}
                          readOnly
                          className='form-input bg-black/40 border-none rounded-lg w-[4.5rem] pl-6'
                        />
                      </div>
                    </div>
                    <div>
                      <Slider
                        getAriaLabel={() => 'Price range'}
                        value={value}
                        onChange={handleChange}
                        valueLabelDisplay='auto'
                      />
                    </div>
                  </div>
                  <div>
                    <h2 className='font-semibold text-2xl mb-2'>Creators</h2>
                    <div className='flex flex-col gap-2'>
                      <FormGroup>
                        {[...Array(5).keys()].map((id) => {
                          return (
                            <FormControlLabel
                              key={id}
                              control={<Checkbox value={id} />}
                              label='Options '
                            />
                          )
                        })}
                      </FormGroup>
                    </div>
                  </div>
                  <div>
                    <h2 className='font-semibold text-2xl mb-2'>
                      Operacinė sistema
                    </h2>
                    <div className='flex flex-col gap-2'>
                      <FormGroup>
                        {['windows', 'Mac', 'Linux'].map((op) => {
                          return (
                            <FormControlLabel
                              key={op}
                              control={<Checkbox value={op} />}
                              label={op}
                            />
                          )
                        })}
                      </FormGroup>
                    </div>
                  </div>
                </div>
              </Disclosure.Panel>
            </Transition>
          </>
        )}
      </Disclosure>
    </div>
  )
}
