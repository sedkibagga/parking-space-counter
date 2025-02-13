import React from 'react';
import avatar from '../../assets/avatar.jpg';
import TextField from '@mui/material/TextField';
import signUp from '../../assets/signup.jpeg';

function SignUp() {
    return (
        <div className='flex flex-col h-screen items-center justify-center sm:flex-row'>
            <div className='flex flex-col w-full h-full sm:w-1/2 p-4 sm:p-0'>
                <div className='flex flex-row items-center justify-center mt-5 sm:mt-20'>
                    <div className='text-2xl sm:text-4xl font-bold text-white text-center'>
                        Welcome
                    </div>
                </div>

                <div className='flex flex-row items-center justify-center mt-5 sm:mt-10'>
                    <img
                        src={avatar}
                        alt='avatar'
                        className='h-24 w-24 sm:h-32 sm:w-32 rounded-full object-cover'
                    />
                </div>

                <div className='flex flex-col items-center justify-center mt-5 w-full sm:mt-10'>
                    <div className='flex flex-row bg-white w-full sm:w-3/4 rounded-lg mb-4'>
                        <TextField
                            id="name"
                            label="Name"
                            className='w-full'
                            variant="outlined"
                        />
                    </div>
                    <div className='flex flex-row bg-white w-full sm:w-3/4 rounded-lg mb-4'>
                        <TextField
                            id="email"
                            label="Email"
                            className='w-full'
                            variant="outlined"
                        />
                    </div>
                    <div className='flex flex-row bg-white w-full sm:w-3/4 rounded-lg mb-4'>
                        <TextField
                            id="password"
                            label="Password"
                            type="password"
                            className='w-full'
                            variant="outlined"
                        />
                    </div>
                    <div className='flex flex-row bg-white w-full sm:w-3/4 rounded-lg mb-4'>
                        <TextField
                            id="confirm-password"
                            label="Confirm Password"
                            type="password"
                            className='w-full'
                            variant="outlined"
                        />
                    </div>
                    <div className='flex flex-row bg-white w-full sm:w-3/4 rounded-lg mb-4'>
                        <TextField
                            id="phone"
                            label="Phone Number"
                            className='w-full'
                            variant="outlined"
                        />
                    </div>
                    <div className='flex flex-row bg-white w-full sm:w-3/4 rounded-lg mb-4'>
                        <TextField
                            id="address"
                            label="Address"
                            className='w-full'
                            variant="outlined"
                        />
                    </div>
                </div>
            </div>
            <div className='hidden sm:flex flex-col w-full h-full items-center justify-center sm:w-1/2'>
                <img
                    src={signUp}
                    alt='signUp'
                    className='w-full h-full object-cover'
                />
            </div>
        </div>
    );
}

export default SignUp;