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
export default function SignIn() {
  const { setUser } = useContext(ChatContext) as ContextType

  const emailRef = useRef<HTMLInputElement | null>(null)
  const passwordRef = useRef<HTMLInputElement | null>(null)

  const navigate = useNavigate()

  const onSignInHandler = async () => {
    const email = emailRef.current?.value
    const password = passwordRef.current?.value
    const { data }: { data: LoginResponseType } = await axios.post(
      import.meta.env.VITE_BACKEND_URL + '/api/auth/local/',
      {
        identifier: email,
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
    navigate('/join-room')
  }

  return (
    <Index linkRoute='sign-up'>
      <section className='flex flex-col w-1/3 gap-8'>
        <label className='input input-bordered flex items-center gap-2'>
          email
          <input ref={emailRef} type='text' className='grow' placeholder='eg.. nitiksharma' />
        </label>
        <label className='input input-bordered flex items-center gap-2'>
          password
          <input ref={passwordRef} type='text' className='grow' placeholder='eg.. password' />
        </label>
        <button className='btn btn-primary' onClick={onSignInHandler}>
          Sign In
        </button>
      </section>
    </Index>
  )
}
