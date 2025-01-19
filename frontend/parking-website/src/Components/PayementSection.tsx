import React, { useState } from "react";
import { Stack, Box, Typography, Button, Divider, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom"; // Import React Router hook
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const validateCardNumber = (cardNumber: string): boolean => {
    // Expression régulière pour vérifier si le numéro de carte est valide avec des espaces tous les 4 chiffres
    const cardNumberRegex = /^(\d{4}\s?){3}\d{4}$/;

    if (!cardNumberRegex.test(cardNumber)) {
        return false;
    }

    // Luhn Check pour validation complémentaire
    const luhnCheck = (num: string): boolean => {
        let sum = 0;
        let shouldDouble = false;

        for (let i = num.length - 1; i >= 0; i--) {
            let digit = parseInt(num.charAt(i), 10);

            if (shouldDouble) {
                digit *= 2;
                if (digit > 9) digit -= 9;
            }

            sum += digit;
            shouldDouble = !shouldDouble;
        }

        return sum % 10 === 0;
    };

    return luhnCheck(cardNumber.replace(/\s+/g, ""));
};

const validateExpiryDate = (expiryDate: string): boolean => {
    // Expression régulière pour vérifier la date d'expiration au format MM/YY ou MM/YYYY
    const expiryDateRegex = /^(0[1-9]|1[0-2])\/?\d{0,2}$/;

    if (!expiryDateRegex.test(expiryDate)) {
        return false;
    }

    const [month, year] = expiryDate.split('/').map(num => parseInt(num, 10));

    // Vérification que la date est valide et dans le futur
    if (month < 1 || month > 12 || year < new Date().getFullYear()) {
        return false;
    }

    return true;
};

const PaymentForm: React.FC = () => {
    const [cardNumber, setCardNumber] = useState("");
    const [expiryDate, setExpiryDate] = useState("");
    const navigate = useNavigate(); // Hook pour la navigation

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        // Validation des champs
        if (!validateCardNumber(cardNumber)) {
            toast.error("Invalid card number. Please check and try again.");
            return;
        }

        if (!validateExpiryDate(expiryDate)) {
            toast.error("Invalid expiry date. Please check and try again.");
            return;
        }

        // Simuler un succès
        toast.success("Payment successful! Please check your email.");

        // Attendez un peu avant la redirection pour que le toast s'affiche
        setTimeout(() => {
            navigate("/home"); // Redirection vers la page "Home"
        }, 3000); // 3 secondes pour que l'utilisateur puisse voir le toast
    };

    return (
        <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
                p: 3,
                border: "1px solid #e0e0e0",
                borderRadius: "8px",
                maxWidth: "500px",
                backgroundColor: "white",
                boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
            }}
        >
            <Typography variant="h6" gutterBottom sx={{ fontWeight: "bold" }}>
                PAYMENT METHOD
            </Typography>

            <Divider sx={{ my: 2 }} />

            <TextField
                label="Card Number"
                fullWidth
                variant="outlined"
                margin="normal"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
                inputProps={{
                    maxLength: 19,
                }}
            />

            <TextField
                label="Expiry Date (MM/YY)"
                fullWidth
                variant="outlined"
                margin="normal"
                value={expiryDate}
                onChange={(e) => setExpiryDate(e.target.value)}
                inputProps={{
                    maxLength: 5,
                }}
            />

            {/* Submit Button */}
            <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                sx={{ py: 1.5, fontWeight: "bold", fontSize: "16px" }}
            >
                Pay Now
            </Button>

            <ToastContainer position="top-right" autoClose={3000} />
        </Box>
    );
};

export default PaymentForm;
