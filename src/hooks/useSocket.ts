import { useContext, useEffect, useState } from 'react'
import { socket } from '../socket/socket'
import { ChatContext, ContextType } from '../context/Context'
import { useSearchParams } from 'react-router-dom'

interface MessageType {
  message: string
  username: string
  __createdtime__: number
}
interface AllChatsType {
  roomId: string
  messages: MessageType[]
}

export default function useSocket() {
  const [isConnected, setIsConnected] = useState(false)
  const [searchParams] = useSearchParams()
  const [messagesRecieved, setMessagesReceived] = useState<MessageType[]>([])
  const { user } = useContext(ChatContext) as ContextType

  const room = searchParams.get('room_id')

  function onConnect() {
    socket.emit('join_room', {
      username: user?.username,
      room,
    })
    setIsConnected(true)
  }

  function onDisconnect() {
    setIsConnected(false)
  }

  function onMessageReceived(data: MessageType) {
    setMessagesReceived((state) => {
      const newChats = [
        ...state,
        {
          message: data.message,
          username: data.username,
          __createdtime__: data.__createdtime__,
        },
      ]
      localStorage.setItem('chat_history', JSON.stringify({roomId: room, messages: newChats}))
      return newChats
    })
  }

  useEffect(() => {
    if(!user) return 

    socket.connect()

    socket.on('connect', onConnect)
    socket.on('disconnect', onDisconnect)
    socket.on('receive_message', onMessageReceived)

    const chatHistory = localStorage.getItem('chat_history')

    if (chatHistory) {
      const chats = JSON.parse(chatHistory) as AllChatsType

      if (chats.roomId === room) {
        setMessagesReceived(chats.messages)
      } else {
        localStorage.removeItem('chat_history')
      }
    }

    return () => {
      socket.off('connect', onConnect)
      socket.off('disconnect', onDisconnect)
    }
  }, [user, room])
  return {
    socket,
    isConnected,
    messagesRecieved,
    setMessagesReceived,
  }
}
