import { useContext, useState } from 'react'
import Index from '../Index'
import { ChatContext, ContextType } from '../../context/Context'
import useSocket from '../../hooks/useSocket'
import { useSearchParams } from 'react-router-dom'

export default function Chat() {
  const [message, setMessage] = useState('')
  const { user } = useContext(ChatContext) as ContextType
  const { socket, isConnected, messagesRecieved, setMessagesReceived } = useSocket()
  const [searchParams] = useSearchParams()
  const room = searchParams.get('room_id')
  isConnected
  const sendMessage = () => {
    if (!user) return

    const data = {
      username: user.username,
      message,
    }
    socket.emit('send_message', { ...data, room })
    localStorage.setItem(
      'chat_history',
      JSON.stringify({
        roomId: room,
        messages: [...messagesRecieved, { ...data, __createdtime__: Date.now() }],
      })
    )
    setMessagesReceived([...messagesRecieved, { ...data, __createdtime__: Date.now() }])
    setMessage('')
  }

  return (
    <Index linkRoute='join-room'>
      {user ? (
        <section className='flex flex-col gap-4 justify-between h-full'>
          <div className='flex flex-col gap-4'>
            <p className='text-3xl font-bold'>
              Hello {`@${user?.username} you have joined the room ${room}`}
            </p>
            <main className='flex flex-col gap-4'>
              {messagesRecieved.map((message, index) => {
                return (
                  <div
                    className={`${
                      user?.username === message.username
                        ? 'self-end text-blue-500'
                        : 'text-red-500 '
                    } flex gap-2`}
                    key={index}
                  >
                    <p className='font-bold'>{message.username}</p>
                    <p>{message.message}</p>
                  </div>
                )
              })}
            </main>
          </div>
          <div className='flex gap-4'>
            <label className='input input-bordered flex items-center gap-2 w-full'>
              Message
              <input
                type='text'
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className='w-full'
                placeholder='eg.. Hello'
              />
            </label>
            <button className='btn btn-primary' onClick={sendMessage}>
              Send
            </button>
          </div>
        </section>
      ) : (
        <></>
      )}
    </Index>
  )
}
