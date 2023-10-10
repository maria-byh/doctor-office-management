import './Styles.css'
import { Register, Login } from '../components'
import { useState } from 'react'
import photo1 from '../assets/national-cancer-institute-kooSjlL8LnQ-unsplash-removebg-preview 1.png'
import photo2 from '../assets/austin-distel-7bMdiIqz_J4-unsplash-removebg-preview 2.png'
import photo3 from '../assets/national-doctors-day-1-920x518-removebg-preview 2.png'
import photocard1 from '../assets/image 1.png'
import photocard2 from '../assets/image 2.png'

type ComponentMap = {
  [key: string]: React.ComponentType<{ changeContentHandler: (component: string) => void }>;
};

const componentMap: ComponentMap = {
  Register,
  Login,
};



export default function Home() {
  const [content, setContent] = useState('Register');

  const ComponentToRender = componentMap[content];

  const changeContentHandler = (component: string) => {
    setContent(component);
  };

  return (
    <div className='Home'>
      <div className='left'>
        <ComponentToRender changeContentHandler={changeContentHandler} />
      </div>
      <div className='right'>
        <h1 className='rightTitle'>We give the best experience 😉</h1>
        <p className='rightParag'>Dedicated virtual consulting platform for docotrs and <br/>patients to help them consult across vatious channels</p>
        <img className='photocard1' src={photocard1} alt="img" />
        <img className='photocard2' src={photocard2} alt="img" />
        <img className='photo1' src={photo1} alt="img" />
        <img className='photo2' src={photo2} alt="img" />
        <img className='photo3' src={photo3} alt="img" />
      </div>
    </div>
  )
}
