import React from 'react'
import './styles.css'

export default function Login() {
  return (
    <div className='Login'>
      <p className='title'>Sing up your account</p>
      <p className='subtitle'>Let’s Enter your data to continue use healthy 24 services</p>
      <div className=''>
        <p className='label'>Fullname</p>
        <input className='' type="text" />
      </div>
      <div className=''>
        <p className='label'>Email</p>
        <input className='' type="text" />
      </div>
      <div className=''>
        <p className='label'>Password</p>
        <input className='' type="text" />
      </div>
    </div>
  )
}
