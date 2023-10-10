import { Link } from 'react-router-dom'
import './styles.css'
import { AuthForm, authFromSchema } from './form'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { Props, RegisterProps } from '../../types/Props.ts'
import { useState } from 'react'
import { FacebookAuthProvider, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithPopup } from 'firebase/auth'
import { auth, db } from '../../firebase/firebase.config.ts'
import { setDoc, doc } from 'firebase/firestore'
import { useAppDispatch } from '../../hooks/storeHook.ts'
import { login } from './authSlice.ts'
import googleIcon from '../../assets/Google.svg'
import facebookIcon from '../../assets/Facebook.svg'



const Register: React.FC<RegisterProps> = ({ changeContentHandler }) => {
  const [ loading, setLoading ] = useState(false);
  const [ errorMessage, setErrorMessage ] = useState<null | string>(null)
  const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);
  const dispatch = useAppDispatch()

  const handleFormSubmit = async (data: AuthForm) => {
    const {fullName, email, password} = data; 
    console.log(data)

    if (!isCheckboxChecked) {
      // If the checkbox is not checked, do not submit the form
      return;
    }

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

  const handleGoogleSignUp = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
  
      console.log('Google Sign-up successful:', result.user);
    } catch (error) {

      console.error('Google Sign-up error:', error);
    }
  };

  const handleFacebookSignUp = async () => {
    try {
      const provider = new FacebookAuthProvider();
      const result = await signInWithPopup(auth, provider);

      // Handle successful sign-up. 'result.user' contains user information.
      console.log('Facebook Sign-up successful:', result.user);
    } catch (error) {
      // Handle sign-up error.
      console.error('Facebook Sign-up error:', error);
    }
  };

  return (
    <div className='Register'>
      <div style={{width: '100%'}}>
        <p className='title'>Sing up your account 👋</p>
        <p className='subtitle'>Let’s Enter your data to continue use healthy <br className='br'/>24 services</p>
      </div>
        <form className='registerform' onSubmit={handleSubmit(handleFormSubmit)} action="submit">
          <div className=''>
              <p className='label'>Fullname</p>
              <input className='registerInput' type="text"
              placeholder='Enter Your name here'
              {...register('fullName')}/>
              {errors.fullName? (<p className='errormessage'>{errors.fullName.message}</p>) :
              (<></>)}
          </div>
          <div className=''>
              <p className='label'>Email</p>
              <input className='registerInput' type="email" 
              placeholder='Enter Your email here'
              {...register('email')}
              />
              {errors.email? (<p className='errormessage'>{errors.email.message}</p>) :
              (<></>)}
          </div>
          <div className=''>
              <p className='label'>Password</p>
              <input className='registerInput' type="password" 
              placeholder='Enter Your Password here'
              {...register('password')}/>
              {errors.password? (<p className='errormessage'>{errors.password.message}</p>) :
              (<></>)}
          </div>
          <div style={{width: '100%', display: 'flex', alignItems: 'center'}}>
            <input
              className='checkbox'
              type="checkbox"
              onChange={(e) => setIsCheckboxChecked(e.target.checked)}
              />
            <label className='termandcond' htmlFor="termandcond">
              by sign up to healthy 24 you agree all <span style={{ fontWeight: 'bold' }}>term</span> and <span style={{ fontWeight: 'bold' }}><br className='br'/>condition</span>
            </label>
          </div>
          {errorMessage && (<p className='errormessage' style={{textAlign: 'center'}}>{errorMessage}</p>)}
          <button className='submitbutton' 
            disabled={loading || !isCheckboxChecked} 
            type='submit'>
              Sign Up
          </button>
        </form>
        <span className='or'>or</span>
        <button className='registerButton' onClick={handleGoogleSignUp}><img style={{marginRight: '8px'}} src={googleIcon} alt='Google Icon' />  Sign Up with google</button>
        <button className='registerButton' onClick={handleFacebookSignUp}><img style={{marginRight: '8px'}} src={facebookIcon} alt='Facebook Icon' /> Sign Up with facebook</button>
        <p className='gotosignin'>You Already have account ? <button className='gotosigninbtn' type='button' onClick={goToLogin}> Sign in</button></p>
        
    </div>
  )
}

export default Register;
