import React, { Fragment } from 'react'
import { Formik, Field, Form, ErrorMessage } from 'formik'
import { Dialog, Transition } from '@headlessui/react'
import * as Yup from 'yup'
import { useMutation } from 'react-query'
import axios from 'axios'
export default function RegisterForm({ setShowlogin }) {
  const { mutate, isLoading, error, isError } = useMutation(
    (data) => axios.post('user', data),
    {
      onSuccess: () => {
        setShowlogin(true)
      },
    }
  )

  const RegisterSchema = Yup.object().shape({
    email: Yup.string().email().required(),
    firstName: Yup.string().max(25).min(3).required(),
    lastName: Yup.string().max(25).min(3).required(),
    password: Yup.string().required().min(8).max(40),
    passwordConfirmation: Yup.string()
      .required()
      .oneOf([Yup.ref('password'), null], 'Passwords must match'),
  })
  const handleSubmit = (values, { setFieldError }) => {
    mutate(values)
    if (isError && error.response?.status === 422) {
      console.log({ error: error.response.data })
      Object.entries(error.response.data?.validationErrors).forEach(
        ([key, value]) => setFieldError(key, value.message)
      )
    }
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
          Register
        </Dialog.Title>
        <div className='mt-2'>
          <Formik
            initialValues={{
              email: '',
              firstName: '',
              lastName: '',
              password: '',
              passwordConfirmation: '',
            }}
            validationSchema={RegisterSchema}
            onSubmit={handleSubmit}
          >
            {({ touched, errors }) => (
              <Form>
                <div className='w-full space-y-3'>
                  <div className='space-y-1'>
                    <label
                      htmlFor='firstName'
                      className='block  font-medium text-gray-200'
                    >
                      firstName
                    </label>
                    <Field
                      name='firstName'
                      type='text'
                      placeholder='firstName'
                      className='form-input bg-black/40 border-none rounded-lg w-full'
                    />
                    {touched.firstName && errors.firstName && (
                      <span className='text-red-500 ml-1'>
                        {errors.firstName}
                      </span>
                    )}
                  </div>
                  <div className='space-y-1'>
                    <label
                      htmlFor='lastName'
                      className='block  font-medium text-gray-200'
                    >
                      lastName
                    </label>
                    <Field
                      name='lastName'
                      type='text'
                      placeholder='lastName'
                      className='form-input bg-black/40 border-none rounded-lg w-full'
                    />
                    {touched.lastName && errors.lastName && (
                      <span className='text-red-500 ml-1'>
                        {errors.lastName}
                      </span>
                    )}
                  </div>
                  <div className='space-y-1'>
                    <label
                      htmlFor='email'
                      className='block  font-medium text-gray-200'
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
                  </div>
                  {touched.password && errors.password && (
                    <span className='text-red-500 ml-1'>{errors.password}</span>
                  )}
                  <div className='space-y-1'>
                    <label
                      htmlFor='password_confirmation'
                      className='block  font-medium text-gray-200'
                    >
                      Confirm Password
                    </label>
                    <Field
                      name='passwordConfirmation'
                      type='password'
                      placeholder='Confirm Password'
                      className='form-input bg-black/40 border-none rounded-lg w-full'
                    />
                    {touched.passwordConfirmation &&
                      errors.passwordConfirmation && (
                        <span className='text-red-500 ml-1'>
                          {errors.passwordConfirmation}
                        </span>
                      )}
                  </div>
                  <button
                    type='submit'
                    className='w-full py-1 bg-black/40 transition-colors ease-out font-medium text-lg rounded hover:bg-green-500 border border-green-500 shadow-md'
                  >
                    Sign up
                  </button>
                  <div className='text-center'>
                    <a
                      className='cursor-pointer no-underline hover:underline'
                      onClick={() => setShowlogin(true)}
                    >
                      I already have a account
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
                    className='inline-flex justify-center px-4 py-2  font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500'
                    onClick={() => setIsOpen(false)}
                  >
                    Got it, thanks!
                  </button>
                </div> */}
      </div>
    </Transition.Child>
  )
}
