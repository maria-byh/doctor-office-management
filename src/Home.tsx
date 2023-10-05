import React from 'react'
import './Home.css'
import sideImage from './assets/sideImage.jpg'
import { Login } from './components'

export default function Home() {
  return (
    <div className='Home'>
      <div className='left'>
        <Login/>
      </div>
      <div className='right'>
        <img className='sideImage' src={sideImage} alt="side image" />
      </div>
    </div>
  )
}
