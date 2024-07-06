import { createContext, useState } from 'react'

export interface ContextType {
  user: string
  room: string
  setUser: React.Dispatch<React.SetStateAction<string>>
  setRoom: React.Dispatch<React.SetStateAction<string>>
}
export const ChatContext = createContext<ContextType | null>(null)

export default function ContextProvider({ children }: { children: JSX.Element }) {
  const [user, setUser] = useState('')
  const [room, setRoom] = useState('')

  return (
    <ChatContext.Provider value={{ user, room, setUser, setRoom }}>{children}</ChatContext.Provider>
  )
}
