import {
    Container,
    Grid,
    Button,
    Typography,
    Box,
} from "@mui/material";
import { motion } from "framer-motion";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import image from '../assets/about1.jpg';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const AboutUsSection = () => (
    <Box
        sx={{
            backgroundColor: "#000", // Fond noir
            py: 12,
            width: "100 px",
            height: '500 px',
            color: "#fff", // Texte en blanc
        }}
    >
        <Container>
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
            >
                <Typography
                    variant="h3"
                    fontWeight="bold"
                    sx={{ mb: 4, color: "#E3311D" }} // Rouge et gras
                >
                    About Us
                </Typography>
            </motion.div>

            <Grid container spacing={4}>
                {/* Texte principal et Qualités */}
                <Grid item xs={12} md={6}>
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1 }}
                    >
                        <Typography variant="h6" fontWeight="bold">
                            Reserve a spot to park your car hassle-free
                        </Typography>
                        <Typography sx={{ my: 2 }}>
                            At Car Park, we make parking easy and stress-free. Our platform
                            lets you reserve secure, convenient parking spots wherever you go.
                            Focus on your day while we handle your parking.
                        </Typography>

                        {/* Qualités alignées horizontalement */}
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                mt: 3,
                                gap: 1, // Réduire l'écart entre les éléments
                            }}
                        >
                            <Box
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                }}
                            >
                                <Box
                                    sx={{
                                        width: "40px",
                                        height: "40px",
                                        borderRadius: "50%",
                                        backgroundColor: "#E3311D",
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        mr: 2,
                                    }}
                                >
                                    <CheckCircleIcon sx={{ color: "#fff" }} />
                                </Box>
                                <Typography fontWeight="bold">Reliable</Typography>
                            </Box>
                            <Box
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                }}
                            >
                                <Box
                                    sx={{
                                        width: "40px",
                                        height: "40px",
                                        borderRadius: "50%",
                                        backgroundColor: "#E3311D",
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        mr: 2,
                                    }}
                                >
                                    <CheckCircleIcon sx={{ color: "#fff" }} />
                                </Box>
                                <Typography fontWeight="bold">Quiet</Typography>
                            </Box>
                        </Box>

                        {/* Bouton Read More */}
                        <Box sx={{ mt: 3 }}>
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
                                        transform: "scale(1.05)", // Agrandir au survol
                                        transition: "transform 0.3s ease, background-color 0.3s ease", // Animation de l'agrandissement et du changement de couleur
                                    },
                                    display: "flex",
                                    alignItems: "center", // Centrer l'icône et le texte
                                    fontWeight: "bold",
                                }}
                            >
                                Read More
                                <ArrowForwardIcon sx={{ ml: 1 }} /> {/* Ajouter l'icône de flèche */}
                            </Button>
                        </Box>
                    </motion.div>
                </Grid>

                {/* Image avec le Box gris */}
                <Grid item xs={12} md={6}>
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1 }}
                    >
                        <Box
                            sx={{
                                backgroundColor: "#666", // Gris clair
                                p: 2, // Espacement interne
                                borderRadius: "8px",
                                boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                overflow: "hidden",
                                mt: -3, // Remonter le conteneur pour être plus haut
                                "&:hover": {
                                    transform: "scale(1.05)", // Zoom avant sur l'image
                                    transition: "transform 0.3s ease", // Animation de zoom
                                },
                            }}
                        >
                            <img
                                src={image}
                                alt="Parking"
                                style={{
                                    width: "100%",
                                    height: "auto",
                                    borderRadius: "4px",
                                    transition: "transform 0.3s ease", // Transition de zoom
                                }}
                            />
                        </Box>
                    </motion.div>
                </Grid>
            </Grid>
        </Container>
    </Box>
);

export default AboutUsSection;
