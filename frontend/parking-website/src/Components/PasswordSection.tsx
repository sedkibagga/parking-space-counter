import React from 'react';
import { Box, TextField, Button, Typography, Container } from '@mui/material';
import { MdOutlineMail } from "react-icons/md";
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import toast, { Toaster } from 'react-hot-toast';

// Schéma de validation avec Zod
const schema = z.object({
    email: z.string().email("Invalid email address").nonempty("Email is required"),
});

type PasswordRecoveryInputs = z.infer<typeof schema>;

const PasswordSection: React.FC = () => {
    const { control, handleSubmit, formState: { errors } } = useForm<PasswordRecoveryInputs>({
        resolver: zodResolver(schema),
    });

    const onSubmit = (data: PasswordRecoveryInputs) => {
        console.log('Email submitted:', data);
        toast.success('Verification code sent to your email');
    };

    return (
        <Container component="main" maxWidth="xs">
            <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Typography
                    sx={{
                        fontSize: 40,
                        textAlign: "center",
                        color: "#050507",
                        fontWeight: "bold",
                        fontFamily: "sans-serif",
                        marginBottom: "10%"
                    }}
                >
                    Password Recovery
                </Typography>
                <MdOutlineMail size={40} color="#050507" />
                <Typography
                    variant="h6"
                    sx={{
                        color: "#E3311D",
                        textAlign: "center",
                        fontWeight: "bold",
                        fontFamily: "sans-serif",
                        mt: 2,
                    }}
                >
                    Enter your email
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
                                    width: "380px",
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
                            Send
                        </Button>
                    </Box>
                </Box>
                <Toaster position="top-center" reverseOrder={false} />
            </Box>
        </Container>
    );
};

export default PasswordSection;
