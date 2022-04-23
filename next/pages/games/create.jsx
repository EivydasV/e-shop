import { Formik, Field, Form } from 'formik'
import { useState } from 'react'
import {
  OutlinedInput,
  TextField,
  Chip,
  Select,
  FormControl,
  InputAdornment,
  FormHelperText,
} from '@mui/material'
import Box from '@mui/material/Box'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import 'react-image-picker/dist/index.css'
import DropZone from '../../components/DropZone'
import * as Yup from 'yup'
import { useMutation } from 'react-query'
import axios from 'axios'
import { useRouter } from 'next/router'
import { useAuth } from '../../context/AuthContext'

export default function Create() {
  const [files, setFiles] = useState([])

  const { currentUser } = useAuth()
  const router = useRouter()

  if (!currentUser) return router.replace('/')

  const { mutate, data, isSuccess, error } = useMutation(
    (data) => axios.post('product', data),
    {
      onSuccess: ({ data }) => {
        const images = new FormData()
        files.forEach((file) => images.append('images', file.file))
        images.append('id', data.product._id)

        uploadImages(images)
      },
    }
  )
  const {
    mutate: uploadImages,
    isSuccess: isUploadSuccess,
    error: uploadError,
  } = useMutation(
    (data) =>
      axios.post('product/upload/images', data, {
        header: {
          'Content-Type': 'multipart/form-data',
        },
      }),
    { onSuccess: () => router.push('/games/my-games') }
  )
  const createProductSchema = Yup.object().shape({
    title: Yup.string().required().min(3).max(50),
    trailer: Yup.string()
      .required()
      .matches(
        /^(?:https?:\/\/)?(?:m\.|www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/,
        'Invalid trailer url'
      ),
    os: Yup.array(Yup.string()).min(1).required(),
    categories: Yup.array(Yup.string()).min(1).required(),
    price: Yup.number().min(1).required(),
    inStock: Yup.number().min(1).required(),
    description: Yup.string().required().min(10).max(1000),
  })
  const onSubmit = (values, { setFieldError, setFieldTouched }) => {
    if (files.length === 0) {
      setFieldError('images', 'Please upload at least one image')
      return
    }
    if (files.length > 6) {
      setFieldError('images', 'Please upload at most 6 images')
      return
    }
    mutate(values)
    if (error) {
      Object.entries(error?.response?.data?.validationErrors).forEach(
        ([key, value]) => {
          console.log([key, value])
          setFieldError(key, value.message)
          setFieldTouched(key)
        }
      )
    }
  }
  return (
    <div className=''>
      <h1 className='text-4xl text-sky-400 font-semibold tracking-wide inline-block border-b-2 pb-3 border-indigo-400 mb-6 uppercase'>
        Create a game
      </h1>
      {/* <hr className='h-1 bg-sky-600 w-1/4 border-none' /> */}
      <div>
        <Formik
          initialValues={{
            title: '',
            os: [],
            categories: [],
            images: [],
            price: '',
            description: '',
            trailer: '',
          }}
          onSubmit={onSubmit}
          validationSchema={createProductSchema}
        >
          {(formik) => {
            return (
              <Form>
                <div className='w-full space-y-6'>
                  <div className='space-y-1'>
                    <Field
                      error={!!formik.touched.title && !!formik.errors.title}
                      helperText={formik.touched.title && formik.errors.title}
                      as={TextField}
                      fullWidth
                      id='outlined-required'
                      label='Title'
                      name='title'
                    />
                  </div>
                  <div className='space-y-1'>
                    <Field
                      error={
                        !!formik.touched.trailer && !!formik.errors.trailer
                      }
                      helperText={
                        formik.touched.trailer && formik.errors.trailer
                      }
                      as={TextField}
                      fullWidth
                      id='outlined-required'
                      label='Trailer'
                      name='trailer'
                    />
                  </div>
                  <div className='space-y-1'>
                    <Field
                      error={!!formik.touched.price && !!formik.errors.price}
                      helperText={formik.touched.price && formik.errors.price}
                      as={TextField}
                      fullWidth
                      id='outlined-required'
                      label='Price'
                      type='number'
                      name='price'
                    />
                  </div>
                  <div className='space-y-1'>
                    <Field
                      error={
                        !!formik.touched.inStock && !!formik.errors.inStock
                      }
                      helperText={
                        formik.touched.inStock && formik.errors.inStock
                      }
                      as={TextField}
                      fullWidth
                      id='outlined-required'
                      label='In Stock'
                      type='number'
                      name='inStock'
                    />
                  </div>
                  <div className='space-y-1'>
                    <Field
                      name='description'
                      error={
                        !!formik.touched.description &&
                        !!formik.errors.description
                      }
                      helperText={
                        formik.touched.description && formik.errors.description
                      }
                      as={TextField}
                      fullWidth
                      id='outlined-multiline-static'
                      label='Description'
                      multiline
                      minRows={4}
                      maxRows={16}
                    />
                  </div>

                  <div className='space-y-1'>
                    <FormControl fullWidth>
                      <InputLabel id='demo-multiple-chip-label'>
                        Select OS
                      </InputLabel>
                      <Select
                        fullWidth
                        labelId='demo-multiple-chip-label'
                        id='demo-multiple-chip'
                        multiple
                        error={!!formik.touched.os && !!formik.errors.os}
                        value={formik.values.os}
                        onChange={formik.handleChange('os')}
                        input={
                          <Field
                            as={OutlinedInput}
                            name='os'
                            id='select-multiple-chip'
                            label='Select OS'
                          />
                        }
                        renderValue={(selected) => (
                          <Box
                            sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}
                          >
                            {selected.map((value) => (
                              <Chip key={value} label={value} />
                            ))}
                          </Box>
                        )}
                      >
                        {names.map((name) => (
                          <MenuItem
                            key={name}
                            value={name}
                            // style={getStyles(name, personName, theme)}
                          >
                            {name}
                          </MenuItem>
                        ))}
                      </Select>
                      <FormHelperText
                        id='my-helper-text'
                        error={!!formik.touched.os && !!formik.errors.os}
                      >
                        {!!formik.touched.os && formik.errors.os}
                      </FormHelperText>
                    </FormControl>
                  </div>
                  <div className='space-y-1'>
                    <FormControl fullWidth>
                      <InputLabel id='demo-multiple-chip-label'>
                        Select Categories
                      </InputLabel>
                      <Field
                        fullWidth
                        as={Select}
                        name='categories'
                        labelId='demo-multiple-chip-label'
                        id='demo-multiple-chip'
                        multiple
                        error={
                          !!formik.touched.categories &&
                          !!formik.errors.categories
                        }
                        value={formik.values.categories}
                        onChange={formik.handleChange('categories')}
                        input={
                          <OutlinedInput
                            id='select-multiple-chip'
                            label='Select Categories'
                          />
                        }
                        renderValue={(selected) => (
                          <Box
                            sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}
                          >
                            {selected.map((value) => (
                              <Chip key={value} label={value} />
                            ))}
                          </Box>
                        )}
                      >
                        {categoriesOptions.map((category) => (
                          <MenuItem
                            key={category}
                            value={category}
                            // style={getStyles(name, personName, theme)}
                          >
                            {category}
                          </MenuItem>
                        ))}
                      </Field>
                      <FormHelperText
                        id='my-helper-text'
                        error={
                          !!formik.touched.categories &&
                          !!formik.errors.categories
                        }
                      >
                        {!!formik.touched.categories &&
                          formik.errors.categories}
                      </FormHelperText>
                    </FormControl>
                  </div>
                  <div className='space-y-1'>
                    <h1 className='text-lg'>Select images</h1>
                    <DropZone files={files} setFiles={setFiles} />
                    <FormHelperText
                      id='my-helper-text'
                      error={!!formik.touched.images && !!formik.errors.images}
                    >
                      {!!formik.touched.images && formik.errors.images}
                    </FormHelperText>
                  </div>
                  {(error || uploadError) && (
                    <p className='text-center text-red-500 font-medium'>
                      {error?.response?.data?.message ||
                        uploadError?.response?.data?.message}
                    </p>
                  )}
                  <button
                    type='submit'
                    // disabled
                    className='ml-auto flex items-center gap-2 py-1 px-2 bg-sky-500 transition-colors ease-out font-medium text-lg rounded hover:bg-sky-700 border border-sky-500 shadow-md disabled:opacity-50 disabled:hover:bg-none'
                  >
                    {/* <CircularProgress size={18} color='warning' /> */}
                    Upload game
                  </button>
                </div>
              </Form>
            )
          }}
        </Formik>
      </div>
    </div>
  )
}
const names = ['windows', 'mac', 'linux']
const categoriesOptions = ['adventure', 'action', 'puzzle', 'strategy']
