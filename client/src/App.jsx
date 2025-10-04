import { useEffect } from 'react'
import './App.css'
import { useDispatch, useSelector } from 'react-redux'
// import {login} from './store/slice/user/user.slice'
import {  getuserprofilethunk } from './store/slice/user/user.thunk'
import {Toaster} from "react-hot-toast"
// import { getmessagesthunk } from './store/slice/message/message.thunk'
function App() {

  // const state=useSelector(state=>state)
  // const {isauthenticated}=useSelector(state=>state.userslice)
  // console.log(isauthenticated)

  // const dispatch=useDispatch()

  // useEffect(()=>
  // {
  //   // dispatch(login())
  //   dispatch(loginuserthunk())
  // })


  const dispatch=useDispatch()
 
  useEffect(() => {
    (async () => {
      await dispatch(getuserprofilethunk());
      // await dispatch(getotheruserthunk())
      // await dispatch(getmessagesthunk())
    
    })();
  }, []);



  return (
    <>
         <Toaster
  position="top-center"
  reverseOrder={false}
/>
    </>
  )
}

export default App
