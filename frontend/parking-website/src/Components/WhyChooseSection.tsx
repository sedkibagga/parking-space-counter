import React from 'react';
import { Box, Button, Typography, Card, CardContent } from '@mui/material';
import { ArrowForward } from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const WhyChooseSection: React.FC = () => {
    const navigate = useNavigate(); // For navigation with react-router-dom

    // Services array for dynamic rendering
    const services = [
        {
            title: 'Service one',
            description:
                'Our services are crafted to save you time and effort, ensuring you focus on what truly matters.',
        },
        {
            title: 'Service one',
            description:
                'Our services are crafted to save you time and effort, ensuring you focus on what truly matters.',
        },
        {
            title: 'Service one',
            description:
                'Our services are crafted to save you time and effort, ensuring you focus on what truly matters.',
        },
        {
            title: 'Service one',
            description:
                'Our services are crafted to save you time and effort, ensuring you focus on what truly matters.',
        },
    ];

    // Animation variants for the Reservation button
    const buttonVariants = {
        initial: { scale: 1 },
        hover: { scale: 1.1 },
        tap: { scale: 0.9 },
    };

    // Handle navigation to reservation page
    const handleReservationClick = () => {
        navigate('/reservation'); // Replace with your route
    };

    return (
        <Box
            sx={{
                backgroundColor: 'black',
                color: 'white',
                padding: '40px 20px',
                textAlign: 'center',
            }}
        >
            {/* Title */}
            <Typography variant="h4" sx={{ fontWeight: 'bold', marginBottom: '20px' }}>
                Why You Choose CAR PARK
            </Typography>

            {/* Services Grid */}
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    flexWrap: 'wrap',
                    gap: '20px',
                }}
            >
                {services.map((service, index) => (
                    <Card
                        key={index}
                        component={motion.div}
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.3 }}
                        sx={{
                            width: '250px',
                            backgroundColor: '#E3311D',
                            color: 'white',
                            borderRadius: '12px',
                            boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
                        }}
                    >
                        <CardContent>
                            <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: '10px' }}>
                                {service.title}
                            </Typography>
                            <Typography variant="body2" sx={{ marginBottom: '15px' }}>
                                {service.description}
                            </Typography>
                            <Button
                                variant="contained"
                                size="small"
                                sx={{
                                    backgroundColor: 'black',
                                    color: 'white',
                                    borderRadius: '20px',
                                    padding: '5px 20px',
                                    textTransform: 'none',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    gap: '5px',
                                    '&:hover': { backgroundColor: 'white', color: 'black' },
                                }}
                            >
                                More <ArrowForward />
                            </Button>
                        </CardContent>
                    </Card>
                ))}
            </Box>

            {/* Reservation Section */}
            <Box
                sx={{
                    marginTop: '30px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'column',
                }}
            >
                <Typography variant="h5" sx={{ fontWeight: 'bold', marginBottom: '10px' }}>
                    Reserve your spot with US
                </Typography>
                <motion.div
                    variants={buttonVariants}
                    initial="initial"
                    whileHover="hover"
                    whileTap="tap"
                >
                    <Button
                        variant="contained"
                        size="large"
                        onClick={handleReservationClick}
                        sx={{
                            backgroundColor: 'white',
                            color: 'black',
                            borderRadius: '25px',
                            padding: '10px 30px',
                            fontWeight: 'bold',
                            textTransform: 'none',
                            '&:hover': { backgroundColor: '#E3311D', color: 'white' },
                        }}
                    >
                        Reservation
                    </Button>
                </motion.div>
            </Box>
        </Box>
    );
};

export default WhyChooseSection;
