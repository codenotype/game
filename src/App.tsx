import { useState } from 'react'
import { ThemeProvider, createTheme } from '@mui/material/styles';
import './App.css'
import { AuthPage } from './pages/auth/AuthPage'

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

function App() {
  

  return (
    <ThemeProvider theme={darkTheme}>
      <AuthPage />
    </ThemeProvider>
  )
}

export default App
