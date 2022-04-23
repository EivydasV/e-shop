import { Formik, Field, Form } from 'formik'
import * as Yup from 'yup'

export default function UpdatePassword() {
  const UpdatePasswordSchema = Yup.object().shape({
    currentPassword: Yup.string().required(),
    newPassword: Yup.string().required().min(8),
  })
  const handleSubmit = (values) => {
    console.log(values)
  }
  return (
    <section className='space-y-3'>
      <h1 className='text-xl font-bold border-b border-white/10 pb-1'>
        Update your password
      </h1>
      <Formik
        initialValues={{ currentPassword: '', newPassword: '' }}
        validationSchema={UpdatePasswordSchema}
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
                  htmlFor='newPassword'
                  className='block font-medium text-gray-200'
                >
                  New password
                </label>
                <Field
                  name='newPassword'
                  type='password'
                  placeholder='New password'
                  className='bg-black/40 border-none rounded-lg w-full form-input'
                />
                {touched.newPassword && errors.newPassword && (
                  <span className='text-red-500 ml-1'>
                    {errors.newPassword}
                  </span>
                )}
              </div>

              <button
                type='submit'
                className='w-full py-1 bg-black/40 transition-colors ease-out font-medium text-lg rounded hover:bg-green-500 border border-green-500 shadow-md [box-shadow:0px_0px_15px_rgb(34_197_94/0.9)]'
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
