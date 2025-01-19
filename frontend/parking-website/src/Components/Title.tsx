import React from 'react';
import { Box, Typography } from '@mui/material';
import { motion } from 'framer-motion';

interface SectionTitleProps {
    title: string;
    description: string;
}

const Title: React.FC<SectionTitleProps> = ({ title, description }) => {
    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '20vh',
                backgroundColor: 'black',
                color: 'white',
                flexDirection: 'column',
                padding: '20px',
            }}
        >
            {/* Animation du titre */}
            <motion.div
                initial={{ opacity: 0, y: -50 }}  // Démarre invisible et décalé vers le haut
                animate={{ opacity: 1, y: 0 }}     // Apparaît et descend
                transition={{ duration: 1 }}       // Animation d'une seconde
            >
                <Typography variant="h2" sx={{ fontWeight: 'bold' }}>
                    {title}
                </Typography>
            </motion.div>

            {/* Animation de la description */}
            <motion.div
                initial={{ opacity: 0, y: 50 }}   // Démarre invisible et décalé vers le bas
                animate={{ opacity: 1, y: 0 }}     // Apparaît et monte
                transition={{ duration: 1, delay: 0.5 }} // Légère delay pour que la description apparaisse après le titre
            >
                <Typography variant="h1" sx={{ fontSize: '1rem', fontWeight: 'normal', marginTop: '16px' }}>
                    {description}
                </Typography>
            </motion.div>
        </Box>
    );
};

export default Title;
