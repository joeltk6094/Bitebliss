import React from 'react'

function LoginInput({placeHolder , inputState, inputStatefunc , type , isSignUp}) {
  return (
    <div>
      <input type={type} placeholder={placeHolder}   value={inputState} onChange={(e)=> inputStatefunc(e.target.value)}  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
      
    </div>
  )
}

export default LoginInput
