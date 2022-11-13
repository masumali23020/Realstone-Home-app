import React from 'react'
import spinerImge from "../images/slider.svg"

const Spener = () => {
  return (
    <div>
        <div className='flex justify-center h-screen items-center '>
            <img src={spinerImge} className='h-25' alt="spinner imge" />
        </div>
    </div>
  )
}

export default Spener