import React from 'react';
import { Box, Typography } from '@mui/material';
import { AccessAlarm, Star, ThumbUp } from '@mui/icons-material';

const QualitySection: React.FC = () => {
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                height: '300px', // Hauteur totale
            }}
        >
            {/* Section Noire en Haut */}
            <Box
                sx={{
                    height: '50%', // 50% de la hauteur totale
                    backgroundColor: 'black',
                    position: 'relative',
                }}
            >
                {/* Conteneur gris */}
                <Box
                    sx={{
                        backgroundColor: 'grey',
                        padding: '20px',
                        borderRadius: '12px',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        width: '60%', // Réduire la largeur
                        height: '100px', // Hauteur réduite
                        position: 'absolute', // Position absolue pour chevaucher les sections
                        top: '40%', // Ajuster pour chevaucher noir et rouge
                        left: '50%',
                        transform: 'translateX(-50%)', // Centrer horizontalement
                        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)', // Ajout d'une ombre pour un meilleur visuel
                    }}
                >
                    {/* Première Qualité */}
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                            flex: 1, // Partage équitable de l'espace
                        }}
                    >
                        <AccessAlarm sx={{ fontSize: 40, color: 'black' }} />
                        <Typography variant="h5" sx={{ color: 'black', fontWeight: "bold", marginTop: '8px' }}>
                            Quality 1
                        </Typography>
                    </Box>

                    {/* Deuxième Qualité */}
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                            flex: 1, // Partage équitable de l'espace
                        }}
                    >
                        <Star sx={{ fontSize: 40, color: 'black' }} />
                        <Typography variant="h5" sx={{ color: 'black', fontWeight: "bold", marginTop: '8px' }}>
                            Quality 2
                        </Typography>
                    </Box>

                    {/* Troisième Qualité */}
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                            flex: 1, // Partage équitable de l'espace
                        }}
                    >
                        <ThumbUp sx={{ fontSize: 40, color: 'black' }} />
                        <Typography variant="h5" sx={{ color: 'black', fontWeight: "bold", marginTop: '8px' }}>
                            Quality 3
                        </Typography>
                    </Box>
                </Box>
            </Box>

            {/* Section Rouge en Bas */}
            <Box
                sx={{
                    height: '35%', // 50% de la hauteur totale
                    backgroundColor: '#E3311D', // Rouge
                }}
            />
        </Box>
    );
};

export default QualitySection;
