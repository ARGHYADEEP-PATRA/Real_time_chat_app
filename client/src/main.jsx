
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {BrowserRouter, RouterProvider} from 'react-router-dom'
import Home from './Pages/Home/Home.jsx';
import Login from './Pages/Authantication/Login.jsx';
import Signup from './Pages/Authantication/Signup.jsx';
import { createBrowserRouter } from 'react-router-dom';
import { store } from './store/store.js';
import {Provider} from 'react-redux'
import Protectedroute from './componants/Protectedroute.jsx';
const router = createBrowserRouter(
  [
    {
      path: "/",
      element:
      <Protectedroute> <Home/></Protectedroute>
        
      ,
    },
    {
      path: "/login",
      element:<Login/>,
    },
    {
      path: "/signup",
      element:<Signup/>,
    },
  ],
);
createRoot(document.getElementById('root')).render(
  <Provider store={store}>
  <RouterProvider router={router}/>
  <App/>

  </Provider>
)
