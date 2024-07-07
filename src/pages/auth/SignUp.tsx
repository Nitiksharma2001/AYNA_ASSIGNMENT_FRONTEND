import { useContext, useRef } from 'react'
import axios from 'axios'
import { ChatContext, ContextType } from '../../context/Context'
import { useNavigate } from 'react-router-dom'
import Index from '../Index'

interface LoginResponseType {
  jwt: string
  user: {
    id: number
    username: string
    name: string
    email: string
  }
}
export default function SignUp() {
  const { setUser } = useContext(ChatContext) as ContextType

  const usernameRef = useRef<HTMLInputElement | null>(null)
  const emailRef = useRef<HTMLInputElement | null>(null)
  const passwordRef = useRef<HTMLInputElement | null>(null)

  const navigate = useNavigate()

  const onSignInHandler = async () => {
    const username = usernameRef.current?.value
    const email = emailRef.current?.value
    const password = passwordRef.current?.value
    const { data }: { data: LoginResponseType } = await axios.post(
      import.meta.env.VITE_BACKEND_URL + '/api/auth/local/register',
      {
        username,
        email,
        password,
      },
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    )
    localStorage.setItem('user_details', JSON.stringify({ jwt: data.jwt, ...data.user }))
    setUser({ jwt: data.jwt, ...data.user })
    navigate('/sign-in')
  }

  return (
    <Index linkRoute='sign-in'>
      <section className='flex flex-col gap-8 w-1/3'>
        <label className='input input-bordered flex items-center gap-2'>
          username
          <input ref={usernameRef} type='text' className='grow' placeholder='eg.. nitiksharma' />
        </label>
        <label className='input input-bordered flex items-center gap-2'>
          email
          <input ref={emailRef} type='text' className='grow' placeholder='eg.. nitiksharma' />
        </label>
        <label className='input input-bordered flex items-center gap-2'>
          password
          <input ref={passwordRef} type='text' className='grow' placeholder='eg.. password' />
        </label>
        <button className='btn btn-primary' onClick={onSignInHandler}>
          Sign Up
        </button>
      </section>
    </Index>
  )
}
