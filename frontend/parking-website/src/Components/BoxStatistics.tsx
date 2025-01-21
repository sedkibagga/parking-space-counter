import React from 'react';
import { Box, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';

const BoxStatistics: React.FC = () => {
    // Intersection Observer pour détecter le moment où le composant est visible
    const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.5 });

    // Données des statistiques
    const stats = [
        { number: 1200, label: 'Projets terminés' },
        { number: 500, label: 'Clients satisfaits' },
        { number: 80, label: 'Employés talentueux' },
        { number: 15, label: 'Années d\'expérience' },
        { number: 95, label: 'Taux de satisfaction (%)' },
    ];

    return (
        <Box
            ref={ref}
            component={motion.div}
            initial={{ opacity: 0 }}
            animate={{ opacity: inView ? 1 : 0 }}
            transition={{ duration: 1 }}
            sx={{
                backgroundColor: 'black',
                color: 'white',
                padding: '40px',
                marginTop: "-5%",
                display: 'flex',
                justifyContent: 'space-around',
                alignItems: 'center',
                flexWrap: 'wrap',
            }}
        >
            {stats.map((stat, index) => (
                <Box
                    key={index}
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        margin: '20px',
                    }}
                >
                    <Typography
                        component={motion.div}
                        initial={{ scale: 0.8 }}
                        animate={{ scale: inView ? 1 : 0.8 }}
                        transition={{ duration: 0.6, delay: index * 0.2 }}
                        variant="h4"
                        sx={{ fontWeight: 'bold', marginBottom: '8px' }}
                    >
                        {inView && (
                            <CountUp
                                start={0}
                                end={stat.number}
                                duration={2}
                                suffix={stat.label.includes('%') ? '%' : ''}
                            />
                        )}
                    </Typography>
                    <Typography
                        variant="body1"
                        sx={{ fontSize: '16px', textAlign: 'center' }}
                    >
                        {stat.label}
                    </Typography>
                </Box>
            ))}
        </Box>
    );
};

export default BoxStatistics;
