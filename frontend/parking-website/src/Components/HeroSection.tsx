import { Box, Button, Typography } from '@mui/material';
import { motion } from 'framer-motion'; // Importer framer-motion
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'; // Importer l'icône de flèche
import image from '../assets/image1.png';

const HeroSection = () => (
    <Box
        sx={{
            backgroundImage: `url(${image})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            textAlign: "center",
            minHeight: "50vh", // Réduire la taille de l'image
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center", // Centrer horizontalement
            py: 4, // Padding vertical global
            px: 2,
        }}
    >
        {/* Animation du texte de titre */}
        <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            style={{
                marginTop: '200px', // Ajouter une marge supérieure pour tout le texte
            }}
        >
            <Typography
                variant="h2"
                fontWeight="bold"
                sx={{ color: "#050501", mb: -1 }} // Ajouter un espacement inférieur
            >
                Car Park
            </Typography>
        </motion.div>

        {/* Animation du sous-titre */}
        <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.3 }}
        >
            <Typography
                variant="h5"
                color="#E3311D"
                sx={{ my: 2, fontWeight: "bold" }} // Augmenter l'espacement vertical
            >
                Your Spot, Anytime, Anywhere
            </Typography>
        </motion.div>

        <Box sx={{ display: "flex", justifyContent: "center", gap: 6, mt: 2 }}>
            {/* Bouton "Our Services" */}
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.5 }}
            >
                <Button
                    variant="contained"
                    sx={{
                        backgroundColor: "#D9D9D9", // Fond gris
                        color: "#000", // Texte noir
                        borderRadius: 4, // Rayon de bordure
                        px: 2, // Réduire le padding horizontal
                        minWidth: "130px", // Largeur minimum réduite
                        "&:hover": {
                            fontWeight: "bold",
                            backgroundColor: "#E3311D", // Changer la couleur au survol
                        },
                        display: "flex",
                        alignItems: "center", // Centrer l'icône et le texte
                        fontWeight: "bold",
                    }}
                >
                    Our Services
                    <ArrowForwardIcon sx={{ ml: 1 }} /> {/* Ajouter l'icône de flèche */}
                </Button>
            </motion.div>

            {/* Bouton "Reserve Now" */}
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.7 }}
            >
                <Button
                    variant="contained"
                    color="error"
                    sx={{
                        backgroundColor: "#D9D9D9",
                        borderRadius: 4,
                        color: "#000", // Texte noir
                        px: 2, // Réduire le padding horizontal
                        minWidth: "130px", // Largeur minimum réduite
                        display: "flex",
                        alignItems: "center", // Centrer l'icône et le texte
                        fontWeight: "bold",
                        "&:hover": {

                            backgroundColor: "#E3311D", // Changer la couleur au survol
                        },
                    }}
                >
                    Reserve Now
                    <ArrowForwardIcon sx={{ ml: 1 }} /> {/* Ajouter l'icône de flèche */}
                </Button>
            </motion.div>
        </Box>
    </Box>
);

export default HeroSection;
