import 'tailwindcss/tailwind.css'
import '../styles/globals.css'
import Header from '../components/layouts/Header'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { CssBaseline } from '@mui/material'
import { useEffect } from 'react'
import axios from 'axios'
import { useQuery, QueryClient, QueryClientProvider } from 'react-query'
import { AuthProvider } from '../context/AuthContext'
// Create a theme instance.
const theme = createTheme({
  palette: {
    mode: 'dark',
  },
})
axios.defaults.baseURL = 'http://localhost:5000/api/v1/'
axios.defaults.withCredentials = true

// Create a client
const queryClient = new QueryClient()


function MyApp({ Component, pageProps }) {
  return (
    <>
      <ThemeProvider theme={theme}>
        <QueryClientProvider client={queryClient}>
          <AuthProvider>
            <CssBaseline />
            <Header />
            <div className='mx-4 md:mx-10 flex flex-col gap-4 min-h-screen'>
              <Component {...pageProps} />
            </div>
            <footer className='mt-6 text-center p-3 bg-slate-800'>
              @Copyright
            </footer>
          </AuthProvider>
        </QueryClientProvider>
      </ThemeProvider>
    </>
  )
}

export default MyApp
