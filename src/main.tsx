import * as ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import Chat from './pages/chat/Chat'
import JoinRoom from './pages/chat/JoinRoom'
import ContextProvider from './context/Context'
import SignIn from './pages/auth/Signin'
import SignUp from './pages/auth/SignUp'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Chat />,
  },
  {
    path: '/chat',
    element: <Chat />,
  },
  {
    path: '/join-room',
    element: <JoinRoom />,
  },
  {
    path: '/sign-in',
    element: <SignIn />,
  },
  {
    path: '/sign-up',
    element: <SignUp />,
  },
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <ContextProvider>
    <RouterProvider router={router} />
  </ContextProvider>
)
