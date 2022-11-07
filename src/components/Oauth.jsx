import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth"
import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore"
import React from 'react'
import { FcGoogle } from "react-icons/fc"
import { useNavigate } from "react-router-dom"
import { db } from "../Firebase"

const Oauth = () => {
  const navigate = useNavigate()
  async function onGooleClick (){
    try {
      const auth = getAuth()
      const provider = new GoogleAuthProvider()
      const result = await signInWithPopup(auth, provider)
      const user = result.user
      console.log(user);
      // check the user 
      const docRef = doc(db, "users", user.uid)

      const docSnap = await getDoc(docRef);
      if(!docSnap.exists()){
        await setDoc(docRef, {
          name:user.displayName,
          email:user.email,
          timestamp: serverTimestamp()
        })
      }
      navigate("/")

      
    } catch (error) {
      console.log(error);
    }

  }
  return (
    <div>
        <button type='button ' onClick={onGooleClick} className='w-full px-3 py-2 bg-red-600 rounded shadow-md hover:bg-red-700 active:bg-red-800 transition duration-150 ease-in-out uppercase flex justify-center items-center'><FcGoogle className=' rounded-full bg-white mr-2 hover:bg-slate-50 ' size={20}/> contunu with google</button>
    </div>
  )
}

export default Oauth