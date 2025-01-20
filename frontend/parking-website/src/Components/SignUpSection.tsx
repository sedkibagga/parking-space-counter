import React, { useState } from 'react';
import {
    Box,
    TextField,
    Button,
    Typography,
    Container,
} from '@mui/material';
import { MdPersonOutline } from 'react-icons/md';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useAuth } from './AuthContexte';
import { useNavigate } from 'react-router-dom';
import apiService from '../Apis/Services/apisService';
import { createClientDto } from '../Apis/DataParam/dataParam';
const schema = z
    .object({
        firstName: z.string().nonempty('firstName is required'),
        email: z.string().email('Invalid email address').nonempty('Email is required'),
        password: z.string().min(6, 'Password must be at least 6 characters').nonempty('Password is required'),
        confirmPassword: z.string().nonempty('Confirm Password is required'),
        lastName:z.string().nonempty('lastName is required'),
        cin:z.string().nonempty('cin is required'),
        tel:z.string().nonempty('tel is required')
    })
    .refine((data) => data.password === data.confirmPassword, {
        path: ['confirmPassword'],
        message: 'Passwords do not match',
    });

type SignUpFormInputs = z.infer<typeof schema>;

const SignUpSection: React.FC = () => {
    const navigate = useNavigate(); 
    // const { user, setUser } = useAuth();  

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<SignUpFormInputs>({
        resolver: zodResolver(schema),
    });

    

    const onSubmit = async (data: SignUpFormInputs): Promise<void> => {
        try {
            const client: createClientDto = { firstName: data.firstName, lastName: data.lastName, cin: data.cin, email: data.email, password: data.password, tel: data.tel };
            const response = await apiService.createClient(client);
            console.log(response);
            navigate('/Signin');
        } catch (error: any) {
            console.error(error);
        }
    };

    return (
        <Container component="main" maxWidth="xs">
            <Box sx={{ marginTop: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Typography
                    sx={{
                        fontSize: 50,
                        textAlign: 'center',
                        color: '#050507',
                        fontWeight: 'bold',
                        fontFamily: 'sans-serif',
                    }}
                >
                    Welcome
                </Typography>
                <MdPersonOutline size={40} color="#050507" />

                <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 3 }}>
                    <Controller
                        name="firstName"
                        control={control}
                        defaultValue=""
                        render={({ field }) => (
                            <TextField
                                {...field}
                                margin="normal"
                                fullWidth
                                id="firstName"
                                label="firstName"
                               
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
                                error={!!errors.firstName}
                                helperText={errors.firstName?.message}
                            />
                        )}
                    />
                     <Controller
                        name="lastName"
                        control={control}
                        defaultValue=""
                        render={({ field }) => (
                            <TextField
                                {...field}
                                margin="normal"
                                fullWidth
                                id="lastName"
                                label="lastName"
                                type="name"
                              
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
                                error={!!errors.lastName}
                                helperText={errors.lastName?.message}
                            />
                        )}
                    />
                     <Controller
                        name="cin"
                        control={control}
                        defaultValue=""
                        render={({ field }) => (
                            <TextField
                                {...field}
                                margin="normal"
                                fullWidth
                                id="cin"
                                label="cin"
                                type="cin"
                                
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
                                error={!!errors.cin}
                                helperText={errors.cin?.message}
                            />
                        )}
                    />
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
                    <Controller
                        name="confirmPassword"
                        control={control}
                        defaultValue=""
                        render={({ field }) => (
                            <TextField
                                {...field}
                                margin="normal"
                                fullWidth
                                id="confirmPassword"
                                label="Confirm Password"
                                type="password"
                               
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
                                error={!!errors.confirmPassword}
                                helperText={errors.confirmPassword?.message}
                            />
                        )}
                    />
                     <Controller
                        name="tel"
                        control={control}
                        defaultValue=""
                        render={({ field }) => (
                            <TextField
                                {...field}
                                margin="normal"
                                fullWidth
                                id="tel"
                                label="tel"
                                type="tel"
                                
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
                                error={!!errors.tel}
                                helperText={errors.tel?.message}
                            />
                        )}
                    />

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
                            Sign Up
                        </Button>
                    </Box>
                </Box>
            </Box>
        </Container>
    );
};

export default SignUpSection;
