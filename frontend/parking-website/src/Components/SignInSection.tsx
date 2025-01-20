import React from 'react';
import { Box, TextField, Button, Typography, Container, Stack } from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { MdOutlineVpnKey } from 'react-icons/md';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useAuth } from './AuthContexte';
import apiService from '../Apis/Services/apisService';
import { loginDto } from '../Apis/DataParam/dataParam';
const schema = z.object({
    email: z.string().email('Invalid email address').nonempty('Email is required'),
    password: z.string().nonempty('Password is required'),
});

type LoginFormInputs = z.infer<typeof schema>;

const SignInSection: React.FC = () => {
    const {setUser} = useAuth();
    const { control, handleSubmit, formState: { errors } } = useForm<LoginFormInputs>({
        resolver: zodResolver(schema),
    });

    const navigate = useNavigate();

       
    const onSubmit = async (data:LoginFormInputs) : Promise<void> => {
        try {
            const loginParam:loginDto = {email:data.email,password:data.password};
            const response = await apiService.login(loginParam,setUser);
            console.log("response of login :" , response);
            navigate('/Home');

        } catch(error:any) {
            console.log("error:", error.message);
            alert(error.message);
        }
    }
    return (
        <Container component="main" maxWidth="xs">
            <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                {/* Title and Icon */}
                <Typography
                    sx={{
                        fontSize: 50,
                        textAlign: 'center',
                        color: '#050507',
                        fontWeight: 'bold',
                        fontFamily: 'sans-serif',
                    }}
                >
                    CAR PARK
                </Typography>
                <MdOutlineVpnKey size={40} color="#050507" />
                <Typography
                    variant="h5"
                    sx={{
                        color: '#E3311D',
                        textAlign: 'center',
                        fontWeight: 'bold',
                        fontFamily: 'sans-serif',
                        mt: 2,
                    }}
                >
                    Login to your account
                </Typography>

                {/* Form */}
                <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 3 }}>
                    {/* Email Field */}
                    <Controller
                        name="email"
                        control={control}
                        defaultValue=""
                        render={({ field }) => (
                            <TextField
                                {...field}
                                margin="normal"
                                fullWidth
                                id="email"
                                label="Email Address"
                                autoComplete="email"
                                autoFocus
                                sx={{
                                    ml: 6,
                                    width: '380px',
                                    '& .MuiInputLabel-root': {
                                        '&.Mui-focused': {
                                            color: '#050507',
                                        },
                                    },
                                    '& .MuiOutlinedInput-root': {
                                        borderRadius: '15px',
                                        '&.Mui-focused fieldset': {
                                            borderColor: '#050507',
                                        },
                                    },
                                }}
                                error={!!errors.email}
                                helperText={errors.email?.message}
                            />
                        )}
                    />

                    {/* Password Field */}
                    <Controller
                        name="password"
                        control={control}
                        defaultValue=""
                        render={({ field }) => (
                            <TextField
                                {...field}
                                margin="normal"
                                fullWidth
                                id="password"
                                label="Password"
                                type="password"
                                autoComplete="current-password"
                                sx={{
                                    ml: 6,
                                    width: '380px',
                                    '& .MuiInputLabel-root': {
                                        '&.Mui-focused': {
                                            color: '#050507',
                                        },
                                    },
                                    '& .MuiOutlinedInput-root': {
                                        borderRadius: '15px',
                                        '&.Mui-focused fieldset': {
                                            borderColor: '#050507',
                                        },
                                    },
                                }}
                                error={!!errors.password}
                                helperText={errors.password?.message}
                            />
                        )}
                    />

                    {/* Forgot Password and Sign Up Links */}
                    <Stack direction="row" justifyContent="space-between" sx={{ mt: 2 }}>
                        <Button
                            component={RouterLink}
                            to="/password-recovery"
                            sx={{
                                textTransform: 'none',
                                fontSize: 12,
                                color: '#E3311D',
                                fontWeight: 'bold',
                            }}
                        >
                            Forgot Password?
                        </Button>
                        <Typography variant="body2">
                            Don't have an account?{' '}
                            <RouterLink
                                to="/signup"
                                style={{ textDecoration: 'none', color: '#050507', fontWeight: 'bold' }}
                            >
                                Sign up
                            </RouterLink>
                        </Typography>
                    </Stack>

                    {/* Submit Button */}
                    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                        <Button
                            type="submit"
                            variant="contained"
                            sx={{
                                mt: 3,
                                mb: 2,
                                backgroundColor: '#E3311D',
                                color: '#fff',
                                width: '150px',
                                height: '40px',
                                borderRadius: '15px',
                                '&:hover': { backgroundColor: 'darkred' },
                            }}
                        >
                            Login
                        </Button>
                    </Box>
                </Box>
            </Box>
        </Container>
    );
};

export default SignInSection;
