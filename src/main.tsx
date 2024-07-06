import * as ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import Chat from './pages/chat/Chat'
import JoinRoom from './pages/chat/JoinRoom'
import ContextProvider from './context/Context'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Chat />,
  },
  {
    path: '/join-room',
    element: <JoinRoom />,
  },
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <ContextProvider>
    <RouterProvider router={router} />
  </ContextProvider>
)
