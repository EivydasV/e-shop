import React, { Fragment } from 'react'
import * as Yup from 'yup'
import { Formik, Field, Form } from 'formik'
import { Dialog, Transition } from '@headlessui/react'
import { useMutation, useQueryClient } from 'react-query'
import axios from 'axios'

export default function LoginForm({ setShowlogin, setIsOpen }) {
  const queryClient = useQueryClient()
  const { mutate, isLoading, error, isError } = useMutation(
    (data) => axios.post('user/login', data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('me')
        setIsOpen(false)
      },
    }
  )

  const LoginSchema = Yup.object().shape({
    email: Yup.string().email().required(),
    password: Yup.string().required(),
  })

  const handleSubmit = (values, actions) => {
    mutate(values)
    console.log(values)
  }
  return (
    <Transition.Child
      as={Fragment}
      enter='ease-out duration-300'
      enterFrom='opacity-0 scale-95'
      enterTo='opacity-100 scale-100'
      leave='ease-in duration-200'
      leaveFrom='opacity-100 scale-100'
      leaveTo='opacity-0 scale-95'
    >
      <div className='inline-block w-full max-w-md px-6 py-4 my-8 overflow-hidden text-left align-middle transition-all transform bg-blueGray-900/95  shadow-xl rounded-2xl border border-white/30'>
        <Dialog.Title
          as='h3'
          className='text-xl font-bold border-b border-white/10 pb-1'
        >
          Login
        </Dialog.Title>
        <div className='mt-2'>
          <Formik
            initialValues={{ email: '', password: '' }}
            validationSchema={LoginSchema}
            onSubmit={handleSubmit}
          >
            {({ errors, touched }) => (
              <Form>
                <div className='w-full space-y-3'>
                  <div className='space-y-1'>
                    <label
                      htmlFor='email'
                      className='block font-medium text-gray-200'
                    >
                      Email
                    </label>
                    <Field
                      name='email'
                      placeholder='jane@acme.com'
                      type='text'
                      className='form-input bg-black/40 border-none rounded-lg w-full'
                    />
                    {touched.email && errors.email && (
                      <span className='text-red-500 ml-1'>{errors.email}</span>
                    )}
                  </div>
                  <div className='space-y-1'>
                    <label
                      htmlFor='password'
                      className='block  font-medium text-gray-200'
                    >
                      Password
                    </label>
                    <Field
                      name='password'
                      type='password'
                      placeholder='password'
                      className='form-input bg-black/40 border-none rounded-lg w-full'
                    />
                    {touched.password && errors.password && (
                      <span className='text-red-500 ml-1'>
                        {errors.password}
                      </span>
                    )}
                  </div>
                  {error && (
                    <p className='text-center text-red-500 font-medium'>
                      {error.response.data.message}
                    </p>
                  )}
                  <button
                    type='submit'
                    disabled={isLoading}
                    className='w-full py-1 bg-black/40 transition-colors ease-out font-medium text-lg rounded hover:bg-green-500 border border-green-500 shadow-md'
                  >
                    Log in
                  </button>
                  <div className='text-center'>
                    <a
                      className='cursor-pointer no-underline hover:underline'
                      onClick={() => setShowlogin(false)}
                    >
                      Create an account
                    </a>
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        </div>

        {/* <div className='mt-4'>
      <button
        type='button'
        className='inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500'
        onClick={() => setIsOpen(false)}
      >
        Got it, thanks!
      </button>
    </div> */}
      </div>
    </Transition.Child>
  )
}
