import { Link } from 'react-router-dom'
import './styles.css'

export default function Register() {
  return (
    <div className='Register'>
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
        <p>by sign up to healthy 24 you agree all term and condition</p>
        <button>Sign Up</button>
        or
        <button>Sign Up with google</button>
        <button>Sign Up with facebook</button>
        <p>You Already have account ? <a href='/login'> Sign in</a></p>
        
    </div>
  )
}
