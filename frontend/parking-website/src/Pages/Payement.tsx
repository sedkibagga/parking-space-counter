import React from 'react';
import { Stack } from '@mui/material';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js'; // Import de loadStripe
import PayementSection from '../Components/PayementSection';
import ReftSection from '../Components/RightSection';

// Remplacez 'pk_test_4TbuO3Tjb6jMb9Imu3iZg7LX00' par votre propre clé publique Stripe
const stripePromise = loadStripe('pk_test_4TbuO3Tjb6jMb9Imu3iZg7LX00');

function Payement() {
    return (
        <Stack direction="row">
            {/* Enroulez le composant PayementSection avec Elements */}
            <Elements stripe={stripePromise}>
                <PayementSection />
            </Elements>

            {/* Composant de la partie droite */}
            <ReftSection />
        </Stack>
    );
}

export default Payement;
