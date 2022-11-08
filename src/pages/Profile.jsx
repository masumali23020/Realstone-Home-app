import { getAuth, updateProfile } from 'firebase/auth';
import { doc, updateDoc } from "firebase/firestore";
import React, { useState } from 'react';
import { FcHome } from "react-icons/fc";
import { Link, useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";
import { db } from "../Firebase";

const Profile = () => {
  const auth = getAuth()
  const [changeDetails, setChangeDetails] = useState(false)
  const [fromData, setFromData] = useState({
    name:auth.currentUser.displayName,
    email:auth.currentUser.email
  })
  const {name, email} = fromData;
  const navigate = useNavigate()

  // onChange hander 
  const onChange = (e) => {
    
    setFromData((preveState)=> ({
      ...preveState,
      [e.target.id]: e.target.value,

    }))
    


  }
  // onEdite change 
  const updatChange = () => {
    changeDetails && onSubmit();
    setChangeDetails((prevState) => !prevState);
  }
 
  // onlogOut  functin 

  const onlogOut = () => {
    auth.signOut()
    navigate("/")

  }

  // onSubmit function 
  async function onSubmit() {
    try {
      if (auth.currentUser.displayName !== name) {
        //update display name in firebase auth
        await updateProfile(auth.currentUser, {
          displayName: name,
        });

        // update name in the firestore

        const docRef = doc(db, "users", auth.currentUser.uid);
        await updateDoc(docRef, {
          name,
        });
      }
      toast.success("Profile details updated");
    } catch (error) {
      toast.error("Could not update the profile details");
    }
  }

  return (
    <section className="max-w-6xl mx-auto flex justify-center items-center flex-col">
        <h1 className="text-3xl text-center mt-6 font-bold">My Profile</h1>
        <div className="w-full md:w-[50%] mt-6 px-3">
          <form>
            {/* Name Input */}

            <input
              type="text"
              id="name"
              value={name}
              disabled={!changeDetails}
              onChange={onChange}
              className={`mb-6 w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition ease-in-out
              ${changeDetails && "bg-red-400 text-black "} }`}
            />

            {/* Email Input */}

            <input
              type="email"
              id="email"
              value={email}
              disabled
              className="mb-6 w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition ease-in-out"
            />
          
          <div className="flex justify-between whitespace-nowrap text-sm sm:text-lg mb-6">
              <p className="flex items-center ">
                Do you want to change your name?
                <span
             onClick={updatChange}
                  className={`text-red-600 hover:text-red-700 transition ease-in-out duration-200 ml-1 cursor-pointer `}
                >
                {changeDetails ? "Apply the change" : "edit"}
                </span>
              </p>
              <p
              onClick={onlogOut}
                className="text-blue-600 hover:text-blue-800 transition duration-200 ease-in-out cursor-pointer"
              >
                Sign out
              </p>
            </div>
          </form>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white uppercase px-7 py-3 text-sm font-medium rounded shadow-md hover:bg-blue-700 transition duration-150 ease-in-out hover:shadow-lg active:bg-blue-800"
          >
            <Link
              to="/creating-listing"
              className="flex justify-center items-center"
            >
              <FcHome className="mr-2 text-3xl bg-red-200 rounded-full p-1 border-2" />
              Sell or rent your home
            </Link>
          </button>
        </div>

           
            </section>

  )
}

export default Profile