// import React, { useEffect } from 'react'
// import { useSelector } from 'react-redux'
// import { useNavigate } from 'react-router-dom'

// function Protectedroute({children}) {

//     const {isauthenticated,screenloading}=useSelector(state=>state.userslice)
//     const nevigate=useNavigate();
    

//     useEffect(()=>{
//         // console.log(isauthenticated,screenloading)
//       if(!isauthenticated&&!screenloading)
//       {
//         nevigate("/login")
//       }
//     //   console.log("isauth",isauthenticated)
//     },[isauthenticated,screenloading])
//     return (
//         children
//     )
// }

// export default Protectedroute



import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

function Protectedroute({ children }) {
  const { isauthenticated, screenloading } = useSelector((state) => state.userslice)
  const navigate = useNavigate()

  useEffect(() => {
    // ✅ Only redirect after loading is done
    if (screenloading === false && isauthenticated === false) {
      navigate('/login', { replace: true })
    }
  }, [isauthenticated, screenloading, navigate])

  // ✅ While checking auth, don’t render children (prevents flicker)
  if (screenloading) {
    return <div className="flex justify-center items-center h-screen text-xl">Loading...</div>
  }

  return children
}

export default Protectedroute
