import { useContext } from 'react'
import Index from '../Index'
import { ContextType, ChatContext } from '../../context/Context'
import { Link } from 'react-router-dom'

export default function JoinRoom() {
  const { room, user, setUser, setRoom } = useContext(ChatContext) as ContextType
  return (
    <Index>
      <section className='flex flex-col gap-4'>
        <label className='input input-bordered flex items-center gap-2'>
          Username
          <input
            type='text'
            value={user}
            onChange={(e) => setUser(e.target.value)}
            className='grow'
            placeholder='eg.. asdfasdfsd'
          />
        </label>
        <label className='input input-bordered flex items-center gap-2'>
          Room
          <input
            type='text'
            value={room}
            onChange={(e) => setRoom(e.target.value)}
            className='grow'
            placeholder='eg.. asdfasdfsd'
          />
        </label>
        <Link to='/' className='btn btn-primary'>Join Room</Link>
      </section>
    </Index>
  )
}
