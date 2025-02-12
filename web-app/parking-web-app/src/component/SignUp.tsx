import React from 'react'

function SignUp() {
    return (
        <div className='flex flex-row h-screen items-center justify-center'>

            <div className='flex flex-col bg-green-500 w-1/2 h-full'>

                <div className='flex flex-row items-center justify-center bg-red-600 mt-20'>
                    <div className='text text-3xl font-bold text-white'>
                        Welcome
                    </div>
                </div>
            </div>

            <div className='flex flex-col bg-blue-500 w-1/2 h-full'>
                <div className='flex flex-row items-center justify-center bg-red-600'>
                    <div className='text text-xl text-white'>second part</div>
                </div>
            </div>

        </div>
    )
}

export default SignUp