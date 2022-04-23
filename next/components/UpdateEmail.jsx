import { Formik, Field, Form } from 'formik'
import * as Yup from 'yup'

export default function UpdateEmail() {
  const UpdateEmailSchema = Yup.object().shape({
    currentPassword: Yup.string().required(),
    newEmail: Yup.string().email().required(),
  })
  const handleSubmit = (values) => {
    console.log(values)
  }
  return (
    <section className='space-y-3'>
      <h1 className='text-xl font-bold border-b border-white/10 pb-1'>
        Update your E-mail
      </h1>
      <Formik
        initialValues={{ currentPassword: '', newEmail: '' }}
        validationSchema={UpdateEmailSchema}
        onSubmit={handleSubmit}
      >
        {({ touched, errors }) => (
          <Form>
            <div className='w-full space-y-6'>
              <div className='space-y-1'>
                <label
                  htmlFor='currentPassword'
                  className='block font-medium text-gray-200'
                >
                  Current password
                </label>
                <Field
                  name='currentPassword'
                  type='password'
                  placeholder='Current password'
                  className='bg-black/40 border-none rounded-lg w-full form-input'
                />
                {touched.currentPassword && errors.currentPassword && (
                  <span className='text-red-500 ml-1'>
                    {errors.currentPassword}
                  </span>
                )}
              </div>
              <div className='space-y-1'>
                <label
                  htmlFor='newEmail'
                  className='block font-medium text-gray-200'
                >
                  New email
                </label>
                <Field
                  name='newEmail'
                  type='text'
                  placeholder='New email'
                  className='bg-black/40 border-none rounded-lg w-full form-input'
                />
                {touched.newEmail && errors.newEmail && (
                  <span className='text-red-500 ml-1'>{errors.newEmail}</span>
                )}
              </div>

              <button
                type='submit'
                className='w-full py-1 bg-black/40 transition-colors ease-out font-medium text-lg rounded hover:bg-indigo-500 border border-indigo-500 shadow-md [box-shadow:0px_0px_15px_rgb(99_102_241/0.9)]'
              >
                Update password
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </section>
  )
}
