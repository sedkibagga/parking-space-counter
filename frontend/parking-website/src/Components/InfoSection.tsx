import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { motion } from 'framer-motion';
import { ArrowForward } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import image from '../assets/Capture5.png';

const InfoSection: React.FC = () => {
    const title = "More Than Just a CAR PARK";
    const paragraph = "Our platform offers a seamless parking experience by letting you reserve secure, convenient parking spots anytime and anywhere. Simplify your journey with instant access to verified parking locations, transparent pricing, and real-time availability updates. Whether you're heading to work, attending an event, or exploring a new city, we've got your parking needs covered.";

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'row',
                height: 'auto',
                backgroundColor: 'black',
                color: 'white',
                padding: '40px',
                gap: '40px',
            }}
        >
            {/* Image et boîte grise derrière l'image */}
            <Box
                sx={{
                    marginTop: "5%",
                    position: 'relative',
                    width: '40%',
                    marginRight: "6%",
                    height: '80%', // Réduction de la hauteur
                    backgroundColor: 'grey',
                    borderRadius: '12px',
                    overflow: 'hidden',
                    boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.4)',
                }}
            >
                <motion.div
                    initial={{ scale: 1.1, rotate: 5, opacity: 0 }}
                    animate={{ scale: 1, rotate: 0, opacity: 1 }}
                    transition={{ duration: 1, ease: "easeInOut" }}
                >
                    <motion.img
                        src={image}
                        alt="Section Image"
                        style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                        }}
                        whileHover={{ scale: 1.05 }}
                    />
                </motion.div>
            </Box>

            {/* Contenu sur la droite */}
            <Box
                sx={{
                    width: '50%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                }}
            >
                {/* Titre */}
                <motion.div
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <Typography variant="h2" sx={{ fontWeight: 'bold', fontSize: '2.5rem', marginBottom: '16px' }}>
                        {title}
                    </Typography>
                </motion.div>

                {/* Paragraphe */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                >
                    <Typography variant="body1" sx={{ fontSize: '1rem', lineHeight: '1.6', marginBottom: '24px' }}>
                        {paragraph}
                    </Typography>
                </motion.div>

                {/* Boutons */}
                <Box sx={{ display: 'flex', gap: '16px' }}>
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.6 }}
                    >
                        <Link to="/services" style={{ textDecoration: 'none' }}>
                            <Button
                                variant="contained"
                                sx={{
                                    backgroundColor: "#D9D9D9",
                                    color: "#000",
                                    borderRadius: 4,
                                    px: 2,
                                    minWidth: "130px",
                                    "&:hover": {
                                        fontWeight: "bold",
                                        backgroundColor: "#D9D9D9",
                                        transform: "scale(1.05)",
                                        transition: "transform 0.3s ease, background-color 0.3s ease",
                                    },
                                    display: "flex",
                                    alignItems: "center",
                                    fontWeight: "bold",
                                }}
                            >
                                Our Services
                                <ArrowForward sx={{ ml: 1 }} />
                            </Button>
                        </Link>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.8 }}
                    >
                        <Link to="/contact" style={{ textDecoration: 'none' }}>
                            <Button
                                variant="contained"
                                sx={{
                                    backgroundColor: "#E3311D",
                                    color: "white",
                                    borderRadius: 4,
                                    px: 2,
                                    minWidth: "130px",
                                    "&:hover": {
                                        fontWeight: "bold",
                                        backgroundColor: "#E3311D",
                                        transform: "scale(1.05)",
                                        transition: "transform 0.3s ease, background-color 0.3s ease",
                                    },
                                    display: "flex",
                                    alignItems: "center",
                                    fontWeight: "bold",
                                }}
                            >
                                Contact Us
                                <ArrowForward sx={{ ml: 1 }} />
                            </Button>
                        </Link>
                    </motion.div>
                </Box>
            </Box>
        </Box>
    );
};

export default InfoSection;
