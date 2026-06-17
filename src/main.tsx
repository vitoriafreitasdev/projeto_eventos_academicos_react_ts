import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'

import store from './redux/store.ts'
import './index.css'
import App from './App.tsx'
import Home from './Routes/Home.tsx'
import Login from './Routes/Login.tsx'
import Cadastro from './Routes/Cadastro.tsx'
import UserPage from './Routes/UserPage.tsx'
import EditEvent from './Routes/EditEvent.tsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    children: [
      {
        path: "/",
        element: <Home/>
      },
      {
        path: "/login",
        element: <Login/>
      },
      {
        path: "/cadastro",
        element: <Cadastro/>
      },
      {
        path: "/user/:id",
        element: <UserPage/>
      },
      {
        path: "/user/:userid/:eventid",
        element: <EditEvent/>
      }
    ]
  }
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}/>
    </Provider>
  </StrictMode>,
)
