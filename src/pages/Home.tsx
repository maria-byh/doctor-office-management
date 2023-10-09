import './Styles.css'
import sideImage from '../assets/sideImage.jpg'
import { Register, Login } from '../components'
import { useMemo, useState } from 'react'

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
        <img className='sideImage' src={sideImage} alt="side image" />
      </div>
    </div>
  )
}
