import React from 'react';
import { Box, TextField, Button, Typography, Container, Stack } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { MdPersonOutline } from "react-icons/md";
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

// Validation schema with Zod
const schema = z.object({
    name: z.string().nonempty("Name is required"),
    email: z.string().email("Invalid email address").nonempty("Email is required"),
    password: z.string().min(6, "Password must be at least 6 characters").nonempty("Password is required"),
    confirmPassword: z.string().nonempty("Confirm Password is required")
}).refine(data => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
});

type SignUpFormInputs = z.infer<typeof schema>;

const SignUpSection: React.FC = () => {
    const { control, handleSubmit, formState: { errors } } = useForm<SignUpFormInputs>({
        resolver: zodResolver(schema)
    });

    const onSubmit = (data: SignUpFormInputs) => {
        console.log('Sign Up form submitted:', data);
    };

    return (
        <Container component="main" maxWidth="xs">
            <Box sx={{ marginTop: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Typography
                    sx={{
                        fontSize: 50,
                        textAlign: "center",
                        color: "#050507",
                        fontWeight: "bold",
                        fontFamily: "sans-serif",
                    }}
                >
                    Welcome
                </Typography>
                <MdPersonOutline size={40} color="#050507" />

                <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 3 }}>
                    <Controller
                        name="name"
                        control={control}
                        defaultValue=""
                        render={({ field }) => (
                            <TextField
                                {...field}
                                margin="normal"
                                fullWidth
                                id="name"
                                label="Name"
                                autoFocus
                                sx={{
                                    ml: 6, width: "380px",
                                    "& .MuiInputLabel-root": {
                                        "&.Mui-focused": {
                                            color: "#050507"
                                        }
                                    },
                                    "& .MuiOutlinedInput-root": {
                                        borderRadius: "15px",
                                        "&.Mui-focused fieldset": {
                                            borderColor: "#050507"
                                        }
                                    }
                                }}
                                error={!!errors.name}
                                helperText={errors.name?.message}
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
                                    ml: 6, width: "380px",
                                    "& .MuiInputLabel-root": {
                                        "&.Mui-focused": {
                                            color: "#050507"
                                        }
                                    },
                                    "& .MuiOutlinedInput-root": {
                                        borderRadius: "15px",
                                        "&.Mui-focused fieldset": {
                                            borderColor: "#050507"
                                        }
                                    }
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
                                    ml: 6, width: "380px",
                                    "& .MuiInputLabel-root": {
                                        "&.Mui-focused": {
                                            color: "#050507"
                                        }
                                    },
                                    "& .MuiOutlinedInput-root": {
                                        borderRadius: "15px",
                                        "&.Mui-focused fieldset": {
                                            borderColor: "#050507"
                                        }
                                    }
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
                                    ml: 6, width: "380px",
                                    "& .MuiInputLabel-root": {
                                        "&.Mui-focused": {
                                            color: "#050507"
                                        }
                                    },
                                    "& .MuiOutlinedInput-root": {
                                        borderRadius: "15px",
                                        "&.Mui-focused fieldset": {
                                            borderColor: "#050507"
                                        }
                                    }
                                }}
                                error={!!errors.confirmPassword}
                                helperText={errors.confirmPassword?.message}
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
                                backgroundColor: "#E3311D",
                                color: "#fff",
                                width: "150px",
                                height: "40px",
                                borderRadius: "15px",
                                "&:hover": { backgroundColor: "darkred" },
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
