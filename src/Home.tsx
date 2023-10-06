import './Home.css'
import sideImage from './assets/sideImage.jpg'
import { Register } from './components'

export default function Home() {
  return (
    <div className='Home'>
      <div className='left'>
        <Register/>
      </div>
      <div className='right'>
        <img className='sideImage' src={sideImage} alt="side image" />
      </div>
    </div>
  )
}
