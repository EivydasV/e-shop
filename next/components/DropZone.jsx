import { Dropzone, FileItem, FullScreenPreview } from '@dropzone-ui/react'
import { useState } from 'react'
import { Field } from 'formik'
export default function DropZone({ setFiles, files }) {
  const updateFiles = (incommingFiles) => {
    setFiles(incommingFiles)
  }
  const removeFile = (id) => {
    setFiles(files.filter((x) => x.id !== id))
  }
  return (
    <Field
      as={Dropzone}
      onChange={updateFiles}
      value={files}
      maxFiles={6}
      backgroundColor='rgb(0 0 0 / 0.4)'
      accept='image/*'
      minHeight='195px'
    >
      {files.map((file) => (
        <FileItem
          key={file.id}
          {...file}
          onDelete={removeFile}
          preview
          info
          hd
        />
      ))}
    </Field>
  )
}
