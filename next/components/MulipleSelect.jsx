import { useState } from 'react'
import { useTheme } from '@mui/material/styles'
import Box from '@mui/material/Box'
import OutlinedInput from '@mui/material/OutlinedInput'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import Chip from '@mui/material/Chip'
import { Field } from 'formik'

export default function MultipleSelectChip() {
  const theme = useTheme()
  const [personName, setPersonName] = useState([])

  const handleChange = (event) => {
    const {
      target: { value },
    } = event
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value
    )
  }

  return (
    <div>
      <FormControl fullWidth>
        <InputLabel id='demo-multiple-chip-label'>Chip</InputLabel>
        <Select
          fullWidth
          labelId='demo-multiple-chip-label'
          id='demo-multiple-chip'
          multiple
          value={personName}
          onChange={handleChange}
          input={
            <Field
              id='select-multiple-chip'
              label='Chip'
              as={OutlinedInput}
              name='os'
            />
          }
          renderValue={(selected) => (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
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
      </FormControl>
    </div>
  )
}
const names = ['Windows', 'MacOS', 'Linux']
