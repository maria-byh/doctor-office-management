import { Link } from 'react-router-dom'
import './styles.css'
import { AuthForm, authFromSchema } from './form'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { Props, RegisterProps } from '../../types/Props.ts'
import { useState } from 'react'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth, db } from '../../firebase/firebase.config.ts'
import { setDoc, doc } from 'firebase/firestore'
import { useAppDispatch } from '../../hooks/storeHook.ts'
import { login } from './authSlice.ts'



const Register: React.FC<RegisterProps> = ({ changeContentHandler }) => {
  const [ loading, setLoading ] = useState(false);
  const [ errorMessage, setErrorMessage ] = useState<null | string>(null)
  const dispatch = useAppDispatch()

  const handleFormSubmit = async (data: AuthForm) => {
    const {fullName, email, password} = data; 
    console.log(data)
    try {
      setLoading(true)
      const {user} = await createUserWithEmailAndPassword(auth, email, password )
      console.log(user)
      await setDoc(doc(db, 'users', user.uid), {email})
      
      setLoading(false)

      if(user && user.email)
        dispatch(
          login({
            fullName: fullName,
            email: user.email,
            id: user.uid,
            photoURL: user.photoURL,
          })
        )
    } catch (error: any) {
      setLoading(false)
      console.log(error)
      const errorCode = error.code
      setErrorMessage(errorCode)
    } 
  }

  const {register, handleSubmit, formState: {errors}} = useForm<AuthForm>({
    resolver: yupResolver(authFromSchema)
  })

  const goToLogin = () => {
    changeContentHandler('Login')
  }

  return (
    <div className='Register'>
        <p className='title'>Sing up your account</p>
        <p className='subtitle'>Let’s Enter your data to continue use healthy 24 services</p>
        {errorMessage && (<p>{errorMessage}</p>)}
        <form onSubmit={handleSubmit(handleFormSubmit)} action="submit">
          <div className=''>
              <p className='label'>Fullname</p>
              <input className='' type="text"
              placeholder='Enter Your name here'
              {...register('fullName')}/>
              {errors.fullName? (<p>{errors.fullName.message}</p>) :
              (<></>)}
          </div>
          <div className=''>
              <p className='label'>Email</p>
              <input className='' type="email" 
              placeholder='Enter Your email here'
              {...register('email')}
              />
              {errors.email? (<p>{errors.email.message}</p>) :
              (<></>)}
          </div>
          <div className=''>
              <p className='label'>Password</p>
              <input className='' type="password" 
              placeholder='Enter Your Password here'
              {...register('password')}/>
              {errors.password? (<p>{errors.password.message}</p>) :
              (<></>)}
          </div>
          <p>by sign up to healthy 24 you agree all term and condition</p>
          <button disabled={loading} type='submit'>Sign Up</button>
        </form>
        or
        <button>Sign Up with google</button>
        <button>Sign Up with facebook</button>
        <p>You Already have account ? <button type='button' onClick={goToLogin}> Sign in</button></p>
        
    </div>
  )
}

export default Register;
