import React from 'react'
import { FcGoogle } from "react-icons/fc"

const Oauth = () => {
  return (
    <div>
        <button className='w-full px-3 py-2 bg-red-600 rounded shadow-md hover:bg-red-700 active:bg-red-800 transition duration-150 ease-in-out uppercase flex justify-center items-center'><FcGoogle className=' rounded-full bg-white mr-2 hover:bg-slate-50 ' size={20}/> contunu with google</button>
    </div>
  )
}

export default Oauth