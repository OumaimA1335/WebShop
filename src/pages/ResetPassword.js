import React from 'react'
import CustomInput from '../Components/CustomInput'
export const ResetPassword = () => {
  return (
    <div>
      <div className='py-5' style={{"background": "#ffd333" ,minHeight:"100vh"}}> 
    <div className="my-5 w-25 bg-white rounded-3 mx-auto p-4">
        <h3 className='text-center'>Reset Password </h3>
        <p className='text-center'>Please enter your new password </p>
        <form action=''>
        <CustomInput type='text' label = " New password" id ="pass"/>
        <CustomInput type='text' label = "Confirm password" id ="confirmpass"/>
        <button  className='border-0 px-3 py-2 text-white fw-blod w-100'
         style={{"background": "#ffd333"}}
         type="submit">Reset Password </button>
         </form>
        </div>
     </div>
    </div>
  )
}
