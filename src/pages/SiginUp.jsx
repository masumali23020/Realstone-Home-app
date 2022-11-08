import { createUserWithEmailAndPassword, getAuth, updateProfile } from 'firebase/auth';
import { doc, serverTimestamp, setDoc } from 'firebase/firestore';
import React, { useState } from 'react';
import { BiHide, BiShowAlt } from "react-icons/bi";
import { Link, useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";
import Oauth from '../components/Oauth';
import { app, db } from "../Firebase";
import SiginInImge from '../images/sign.svg';
const SiginUp = () => {
  const [formData, setFormData] = useState({
    name: '',
    email:"",
    password:""
  })
  const [showPassword, setShowPassword] = useState(false)
  const {name, email, password} = formData;

  
  const navigate = useNavigate()



  // handelInputChange

 function handelInputChange  (e) {
    setFormData((prevState) =>( {
      ...prevState,
      [e.target.id]:e.target.value
    }))
  }

  // hide or show password 
  const showHidePassword = () => {
    setShowPassword((prevState) => !prevState)
  }

  // fom submit function 

  async function onHandelSubmit(e){
    e.preventDefault()
   
    try {
      const auth = getAuth(app)
      
      const credtialUser = 
     await createUserWithEmailAndPassword(auth, email,password)
    
     updateProfile(auth.currentUser,{
      displayName:name,
     })
     const user = credtialUser.user;
     const formDataCopy = { ...formData };
     delete formDataCopy.password;
     formDataCopy.timestamp = serverTimestamp();

     await setDoc(doc(db, "users", user.uid), formDataCopy);
     toast.success("Sign up was successful");
     navigate("/")

      
    } catch (error) {
      // toast.error("Sign up erro ")
      toast.error("Something went wrong with the registration");
      
      
      
    }

   
  }





  return (
    <div>
      <h1 className='text-xl font-bold text-center mt-12 '>Sign Up</h1>
      <div className='px-4 mt-6 max-w-6xl flex justify-center items-center flex-wrap'>
        {/* left side imge  */}
        <div className='md:w-[67%] lg:w-[50%] mb-12 md:mb-6'>
          <img src={SiginInImge} alt="sign up imge" />
        </div>

        {/* right side from input  */}
        <div className='md:w-[67%] lg:w-[40%] w-full'>
          <form onSubmit={onHandelSubmit}  >
            <input type="text" required onChange={handelInputChange}  id="name" value={name}className='w-full rounded font-semibold text-gray-500 px-3 py-2 bg-white mb-6 border-gray-400 '  placeholder='Inter Name ' />
            <div>
            <input type="text" required onChange={handelInputChange}  id="email" value={email}className='w-full rounded font-semibold text-gray-500 px-3 py-2 bg-white mb-6 border-gray-400 '  placeholder='boss@gmail.com' />
            </div>


            <div className=' relative' >

            <input required type={showPassword ? "text" : "password"} onChange={handelInputChange}  id="password" value={password}className='w-full rounded font-semibold text-gray-500 px-3 py-2 bg-white border-gray-400 '  placeholder='Inter Your password ' />
            {showPassword ? (<BiShowAlt size={25} onClick={showHidePassword} className=" absolute right-4 top-3 cursor-pointer " /> ) : (<BiHide size={25}  className=" cursor-pointer absolute right-4 top-3" onClick={showHidePassword} />)  }

           
            </div>
            <div className='flex justify-between whitespace-nowrap text-sm sm:text-lg mt-6 mb-4'>
              <p className='text-gray-600 '> have a account?
                <Link to="/sign-in" className='text-red-500 ml-2 hover:text-red-600 transition duration-150 ease-in-out'  > Sign in</Link>
              </p>
              <p>
                <Link className='text-gray-600 hover:text-gray-800 transition duration-150 ease-in-out' to="/forget-password" >forget password</Link>
              </p>
            </div>
            <button  type="submit" className='w-full bg-blue-600 px-3 py-3 uppercase  font-bold text-white rounded shadow-md hover:bg-blue-700 hover:text-gray-300 active:bg-blue-800 hover:shadow-lg duration-150 transition ease-in-out'>Sign Up</button>
          <div className='flex items-center my-4 before:border-t before:flex-1 before:border-gray-300 after:border-t after:border-gray-300 after:flex-1'>
            <p className='text-center font-semibold mx-4 uppercase'>or</p>
          </div>
         
          <Oauth />
            
          </form>
     
        
        </div>
      </div>

    </div>
  )
}




export default SiginUp