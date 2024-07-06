import { useContext, useState } from 'react'
import Index from '../Index'
import { ChatContext, ContextType } from '../../context/Context'
import useSocket from '../../hooks/useSocket'

export default function Chat() {
  const [message, setMessage] = useState('')
  const { socket, isConnected, messagesRecieved, setMessagesReceived } = useSocket()
  const { user, room } = useContext(ChatContext) as ContextType

  const sendMessage = () => {
    const data = {
      username: user,
      message,
    }
    socket.emit('send_message', { ...data, room })
    setMessagesReceived([...messagesRecieved, { ...data, __createdtime__: Date.now() }])
    setMessage('')
  }

  if (!isConnected) {
    return 'Please Connect'
  }

  return (
    <Index>
      <section>
        <p>Hello {`${user} you have joined the room ${room}`}</p>
        <main>
          {messagesRecieved.map((message, index) => {
            return (
              <div key={index}>
                <p>{message.username}</p>
                <p>{message.message}</p>
              </div>
            )
          })}
          <div className='flex gap-2'>
            <label className='input input-bordered flex items-center gap-2'>
              Message
              <input
                type='text'
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className='grow'
                placeholder='eg.. Hello'
              />
            </label>
            <button className='btn btn-primary' onClick={sendMessage}>
              Send
            </button>
          </div>
        </main>
      </section>
    </Index>
  )
}
