import { Formik, Field, Form } from 'formik'

import UpdateEmail from '../../components/UpdateEmail'
import UpdatePassword from '../../components/UpdatePassword'
export default function Profile() {
  return (
    <div>
      <div className='mb-5'>
        <h1 className='text-4xl font-semibold tracking-wide text-center mb-2'>
          User's info
        </h1>
        <hr className='h-1 bg-sky-600 border-none' />
      </div>
      <div className='grid grid-cols-1 sm:grid-cols-2 gap-10'>
        <section className='space-y-3'>
          <h1 className='text-xl font-bold border-b border-white/10 pb-1'>
            Basic info
          </h1>
          <h2 className='text-xl leading-9 text-blueGray-400'>
            First Name:{' '}
            <span className='font-semibold text-gray-200'>Eivydas</span>
          </h2>
          <h2 className='text-xl leading-9 text-blueGray-400'>
            Last Name:{' '}
            <span className='font-semibold text-gray-200'>Vickus</span>
          </h2>
          <h2 className='text-xl leading-9 text-blueGray-400'>
            E-mail:{' '}
            <span className='font-semibold text-gray-200'>
              eivydas@gmail.com
            </span>
          </h2>
          <h2 className='text-xl leading-9 text-blueGray-400'>
            Role: <span className='font-semibold text-gray-200'>simple</span>
          </h2>
        </section>
        <UpdatePassword />
        <UpdateEmail />
      </div>
    </div>
  )
}
