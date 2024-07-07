import { useRef } from 'react'
import Index from '../Index'
import { useNavigate } from 'react-router-dom'

export default function JoinRoom() {
  const roomRef = useRef<HTMLInputElement | null>(null)
  const navigate = useNavigate()

  return (
    <Index linkRoute='sign-in'>
      <section className='flex flex-col gap-4 md:w-1/3'>
        <label className='input input-bordered flex items-center gap-2'>
          Room
          <input ref={roomRef} type='text' className='grow' placeholder='eg.. asdfasdfsd' />
        </label>
        <button
          className='btn btn-primary'
          onClick={() => navigate(`/chat?room_id=${roomRef.current!.value}`)}
        >
          Join Room
        </button>
      </section>
    </Index>
  )
}
