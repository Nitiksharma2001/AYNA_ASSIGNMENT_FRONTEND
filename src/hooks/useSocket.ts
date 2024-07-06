import { useContext, useEffect, useState } from 'react'
import { socket } from '../socket/socket'
import { ChatContext, ContextType } from '../context/Context'

interface MessageType {
  message: string
  username: string
  __createdtime__: number
}

export default function useSocket() {
  const [isConnected, setIsConnected] = useState(false)
  const [messagesRecieved, setMessagesReceived] = useState<MessageType[]>([])
  const { user, room } = useContext(ChatContext) as ContextType
  useEffect(() => {
    function onConnect() {
      socket.emit('join_room', {
        username: user,
        room,
      })
      setIsConnected(true)
    }

    function onDisconnect() {
      setIsConnected(false)
    }

    socket.connect()
    socket.on('connect', onConnect)
    socket.on('message', (data) => {
      console.log('Received message:', data)
    })
    socket.on('disconnect', onDisconnect)

    socket.on('receive_message', (data: MessageType) => {
      setMessagesReceived((state) => [
        ...state,
        {
          message: data.message,
          username: data.username,
          __createdtime__: data.__createdtime__,
        },
      ])
    })

    return () => {
      socket.off('connect', onConnect)
      socket.off('disconnect', onDisconnect)
    }
  }, [])
  return {
    socket,
    isConnected,
    messagesRecieved,
    setMessagesReceived
  }
}
