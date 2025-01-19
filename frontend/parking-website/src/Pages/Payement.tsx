import React from "react";
import { Stack, Box, Typography, Button, Divider } from "@mui/material";
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Chargez la clé publique Stripe
const stripePromise = loadStripe("pk_test_4TbuO3Tjb6jMb9Imu3iZg7LX00");

const PaymentForm = () => {
    const stripe = useStripe();
    const elements = useElements();

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        if (!stripe || !elements) {
            console.error("Stripe or Elements not loaded");
            return;
        }

        const cardElement = elements.getElement(CardElement);

        if (!cardElement) {
            console.error("CardElement not found");
            return;
        }

        try {
            // Simulation de création d’un PaymentMethod (sans backend)
            const { error } = await stripe.createPaymentMethod({
                type: "card",
                card: cardElement,
            });

            if (error) {
                console.error("Payment error:", error.message);
                toast.error("Payment failed. Please try again!");
            } else {
                // Simuler un succès
                toast.success("Payment successful! Please check your email.");
            }
        } catch (err) {
            console.error("Error processing payment:", err);
            toast.error("An error occurred. Please try again!");
        }
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

            <Box display="flex" alignItems="center" gap={1} mb={2}>
                <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                    CREDIT / DEBIT CARD
                </Typography>
                <CreditCardIcon />
            </Box>

            <Typography variant="body2" sx={{ color: "gray", mb: 2 }}>
                You may be directed to your bank's 3D secure process to authenticate your information.
            </Typography>

            {/* Card Element */}
            <Box
                sx={{
                    border: "1px solid #e0e0e0",
                    borderRadius: "4px",
                    p: 2,
                    mb: 3,
                }}
            >
                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: "16px",
                                color: "#424770",
                                "::placeholder": {
                                    color: "#aab7c4",
                                },
                            },
                            invalid: {
                                color: "#9e2146",
                            },
                        },
                    }}
                />
            </Box>

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
        </Box>
    );
};

const Payment = () => {
    return (
        <Stack
            justifyContent="center"
            alignItems="center"
            sx={{ minHeight: "100vh", backgroundColor: "#f9f9f9", p: 4 }}
        >
            <Elements stripe={stripePromise}>
                <PaymentForm />
            </Elements>
            <ToastContainer position="top-right" autoClose={3000} />
        </Stack>
    );
};

export default Payment;
