import { getAuth, onAuthStateChanged } from "firebase/auth"
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from "react-router-dom"
import logo from "../images/logo.svg"


const Header = () => {
    const [pageStatus, setPageStatus] = useState("Sign-In")
    const location = useLocation()
    const navigate = useNavigate()
    const auth = getAuth()
    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if(user){
                setPageStatus("Profile")
            } else {
                setPageStatus("Sign-In")
            }
           

        })

    },[auth])


    // pathmatch function 
    const pathMatch = (route) => {

    if(route === location.pathname ){
            return true;
        }
    }
  
  return (
 <div className=' bg-white border-b shadow-md top-0 sticky z-50 '>
     <header className='flex justify-between items-center mx-auto max-w-6xl px-4 py-3
    '>
        <div>
            <img src={logo} alt="logo" className='h-5 cursor-pointer' onClick={() => navigate("/")}/>

        </div> 
        <div>
            <ul className='flex
             space-x-3 uppercase '>
                <li className={` text-sm cursor-pointer  font-semibold text-gray-400 border-b-[3px] border-b-transparent ${pathMatch("/") && "text-black border-b-red-700"}` }  onClick={() => navigate("/")}>Home</li>
                <li className={`cursor-pointer  text-sm font-semibold text-gray-400 border-b-[3px] border-b-transparent ${pathMatch("/offer") && "text-black border-b-red-700"}`}onClick={() => navigate("/offer")}>Offer</li>


                <li className={`cursor-pointer  text-sm font-semibold text-gray-400 border-b-[3px] border-b-transparent ${(pathMatch("/sign-in") || pathMatch("/profile") )  && "text-black border-b-red-700"}`}onClick={() => navigate("/profile")}>{pageStatus}</li>
            </ul>
        </div>
    </header>
 </div>
  )
}

export default Header