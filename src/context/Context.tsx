import { createContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export interface UserType {
  id: number
  username: string
  email: string
  jwt: string
}
export interface ContextType {
  user: UserType | null
  setUser: React.Dispatch<React.SetStateAction<UserType | null>>
}
export const ChatContext = createContext<ContextType | null>(null)

export default function ContextProvider({ children }: { children: JSX.Element }) {
  const [user, setUser] = useState<UserType | null>(null)

  useEffect(() => {
    const localUser = localStorage.getItem('user_details')
    if (localUser) {
      setUser(JSON.parse(localUser) as UserType)
    }
  }, [])

  return <ChatContext.Provider value={{ user, setUser }}>{children}</ChatContext.Provider>
}
