import React from 'react'
import {Route, Routes } from 'react-router-dom'
import './App.css'
import { Home }from './pages'
import { Dashboard } from './components'
import AuthRoute from './components/Auth/AuthRoute'

function App() {
  
  return (
    <>
      <Routes>
        <Route path={'/'} element={<Home/>}/>
      </Routes>
      <AuthRoute>
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </AuthRoute>
    </>
  )
}

export default App
