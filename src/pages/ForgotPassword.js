import React from 'react'
import CustomInput from '../Components/CustomInput'
export const ForgotPassword = () => {
  return (
    <div>
       <div className='py-5' style={{"background": "#FF5720" ,minHeight:"100vh"}}> 
    <div className="my-5 w-25 bg-white rounded-3 mx-auto p-4">
        <h3 className='text-center'>Forgot Password </h3>
        <p className='text-center'>Please enter your email to get reset password mail </p>
        <form action=''>
        <CustomInput type='text' label = "Email adress" id ="email"/>
        <button  className='border-0 px-3 py-2 text-white fw-blod w-100'
         style={{"background": "#ffd333"}}
         type="submit">Send link </button>
         </form>
        </div>
     </div>
    </div>
  )
}
