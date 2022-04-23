import React, { useContext, useState, useEffect } from 'react'
import { useQuery } from 'react-query'
import axios from 'axios'
import CircularProgress from '@mui/material/CircularProgress'
import Box from '@mui/material/Box'

const AuthContext = React.createContext()

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null)
  const [serverError, setServerError] = useState(null)

  const { data, isLoading, isError, error } = useQuery(
    'me',
    () => axios.get('user/me'),
    {
      retry: false,
      refetchOnWindowFocus: false,
      onSuccess: (data) => {
        setCurrentUser(data.data.user)
      },
      onError: (err) => {
        if (err?.message === 'Network Error') setServerError(err)
        setCurrentUser(null)
      },
    }
  )
  const value = {
    currentUser,
  }
  console.log({ currentUser })
  return (
    <AuthContext.Provider value={value}>
      {isLoading ? (
        <Box
          sx={{
            display: 'flex',
            height: '100vh',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            gap: 5,
          }}
        >
          <CircularProgress size={80} />
          <h1 className='font-bold text-4xl'>Initializing User...</h1>
        </Box>
      ) : !serverError ? (
        children
      ) : (
        <Box
          sx={{
            display: 'flex',
            height: '100vh',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            gap: 5,
          }}
        >
          <h1 className='font-bold text-red-500 text-4xl'>Server is down </h1>
        </Box>
      )}
    </AuthContext.Provider>
  )
}
