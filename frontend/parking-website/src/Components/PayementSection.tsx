import React, { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { Button, TextField, CircularProgress } from "@mui/material";

const PayementSection: React.FC = () => {
    const [error, setError] = useState<string | null>(null);
    const [processing, setProcessing] = useState(false);
    const [paymentSuccess, setPaymentSuccess] = useState(false);
    const stripe = useStripe();
    const elements = useElements();

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        if (!stripe || !elements) {
            return;
        }

        setProcessing(true);
        setError(null);

        const cardElement = elements.getElement(CardElement);

        if (!cardElement) {
            setError("Card details are required.");
            setProcessing(false);
            return;
        }

        const { token, error } = await stripe.createToken(cardElement);

        if (error) {
            // Assurez-vous que error.message est une chaîne ou null, jamais undefined
            setError(error.message ?? null); // Utilisation de la coalescence nulle pour remplacer undefined par null
            setProcessing(false);
        } else {
            // Si la création du token a réussi, vous pouvez effectuer le paiement avec le token
            try {
                // Appelez votre serveur pour traiter le paiement avec le token
                // Exemple: await processPayment(token.id);

                // Simulation d'un succès de paiement
                setPaymentSuccess(true);
                setProcessing(false);
            } catch (paymentError) {
                setError("Payment failed. Please try again.");
                setProcessing(false);
            }
        }
    };

    return (
        <form onSubmit={handleSubmit} style={{ width: "300px", margin: "0 auto" }}>
            <h3>Payment</h3>

            <CardElement options={{ hidePostalCode: true }} />

            {error && <div style={{ color: "red", marginTop: "10px" }}>{error}</div>}

            {paymentSuccess && (
                <div style={{ color: "green", marginTop: "10px" }}>
                    Payment Successful!
                </div>
            )}

            <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                disabled={processing}
                sx={{ marginTop: "20px" }}
            >
                {processing ? <CircularProgress size={24} color="secondary" /> : "Pay Now"}
            </Button>
        </form>
    );
};

export default PayementSection;
