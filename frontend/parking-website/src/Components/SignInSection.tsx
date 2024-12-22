import React from 'react';
import { Box, TextField, Button, Typography, Container, Stack } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { MdOutlineVpnKey } from "react-icons/md";
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

// Schéma de validation avec Zod
const schema = z.object({
    email: z.string().email("Invalid email address").nonempty("Email is required"),
    password: z.string().min(6, "Password must be at least 6 characters").nonempty("Password is required"),
});

type LoginFormInputs = z.infer<typeof schema>;

const SignInSection: React.FC = () => {
    const { control, handleSubmit, formState: { errors } } = useForm<LoginFormInputs>({
        resolver: zodResolver(schema)
    });

    const onSubmit = (data: LoginFormInputs) => {
        console.log('Form submitted:', data);
    };

    return (
        <Container component="main" maxWidth="xs">
            <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Typography
                    sx={{
                        fontSize: 50,
                        textAlign: "center",
                        color: "#050507",
                        fontWeight: "bold",
                        fontFamily: "sans-serif",
                    }}
                >
                    CAR PARK
                </Typography>
                <MdOutlineVpnKey size={40} color="#050507" />
                <Typography
                    variant="h5"
                    sx={{
                        color: "#E3311D",
                        textAlign: "center",
                        fontWeight: "bold",
                        fontFamily: "sans-serif",
                        mt: 2,
                    }}
                >
                    Login to your account
                </Typography>
                <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 3 }}>
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
                    <Stack direction="row" justifyContent="space-between" sx={{ mt: 2 }}>
                        <Button
                            component={RouterLink}
                            to="/password-recovery"
                            sx={{
                                textTransform: "none",
                                fontSize: 12,
                                color: "#E3311D",
                                fontWeight: "bold",
                            }}
                        >
                            Forgot Password?
                        </Button>
                        <Typography variant="body2">
                            Don't have an account?{" "}
                            <RouterLink
                                to="/signup"
                                style={{ textDecoration: 'none', color: '#050507', fontWeight: 'bold' }}
                            >
                                Sign up
                            </RouterLink>
                        </Typography>
                    </Stack>
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
                            Login
                        </Button>
                    </Box>
                </Box>
            </Box>
        </Container>
    );
};

export default SignInSection;
