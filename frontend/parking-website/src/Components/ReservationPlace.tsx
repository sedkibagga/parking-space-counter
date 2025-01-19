import React, { useState } from "react";
import {
    Box,
    Button,
    Typography,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
} from "@mui/material";
import { motion } from "framer-motion";
import image from "../assets/image1.png";
import { useAuth } from "./AuthContexte"; // Importer useAuth
import { Logout } from "@mui/icons-material";
import { Link } from "react-router-dom";

// Type pour les places
interface Place {
    id: number;
    status: "Libre" | "Occupé";
}

const initialPlaces: Place[] = Array.from({ length: 12 }, (_, index) => ({
    id: index + 1,
    status: index % 3 === 0 ? "Occupé" : "Libre",
}));

const ReservationPlace: React.FC = () => {
    const [places, setPlaces] = useState(initialPlaces);
    const [popupOpen, setPopupOpen] = useState(false);
    const { user, login } = useAuth(); // Utilisation de useAuth pour gérer l'état de connexion

    const handlePlaceClick = (place: Place) => {
        if (place.status === "Libre") {
            if (!user) {
                // L'utilisateur n'est pas connecté, ouvrir la popup pour se connecter
                setPopupOpen(true);
            } else {
                // L'utilisateur est connecté et la place est libre, redirige vers la réservation
                window.location.href = "/Reservation/reserveform";
            }
        }
    };

    return (
        <Box
            sx={{
                backgroundColor: "black",
                color: "white",
                minHeight: "100vh",
                padding: "40px",
                textAlign: "center",
            }}
        >
            <Typography variant="h4" sx={{ fontWeight: "bold", marginBottom: "30px" }}>
                Réservez votre place
            </Typography>

            <Box sx={{ marginTop: "40px" }}>
                <img
                    src={image}
                    alt="Reservation"
                    style={{
                        width: "60%",
                        marginBottom: "5%",
                        borderRadius: "12px",
                        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                    }}
                />
            </Box>

            <Box
                sx={{
                    display: "grid",
                    gridTemplateColumns: "repeat(3, 1fr)",
                    gap: "50px",
                    justifyContent: "center",
                    marginLeft: "auto",
                    marginRight: "auto",
                    maxWidth: "80%",
                }}
            >
                {places.map((place) => (
                    <motion.div
                        key={place.id}
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.3 }}
                    >
                        <Box
                            sx={{
                                backgroundColor: "#E3311D",
                                borderRadius: "12px",
                                padding: "12px",
                                textAlign: "center",
                                color: "white",
                                width: "150px",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                flexDirection: "column",
                            }}
                        >
                            <Typography
                                variant="h6"
                                sx={{
                                    display: "inline-flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    borderRadius: "50%",
                                    width: "40px",
                                    height: "40px",
                                    marginBottom: "10px",
                                    backgroundColor: "white",
                                    color: "#E3311D",
                                    fontWeight: "bold",
                                }}
                            >
                                {place.id}
                            </Typography>

                            <Button
                                variant="contained"
                                size="small"
                                onClick={() => handlePlaceClick(place)}
                                sx={{
                                    backgroundColor:
                                        place.status === "Libre" ? "green" : "gray",
                                    color: "white",
                                    borderRadius: "20px",
                                    textTransform: "none",
                                    "&:hover": {
                                        backgroundColor:
                                            place.status === "Libre" ? "darkgreen" : "gray",
                                    },
                                }}
                            >
                                {place.status}
                            </Button>
                        </Box>
                    </motion.div>
                ))}
            </Box>

            <Dialog
                open={popupOpen}
                onClose={() => setPopupOpen(false)}
                PaperProps={{
                    sx: { backgroundColor: "black", color: "white" },
                }}
            >
                <DialogTitle>Connexion requise</DialogTitle>
                <DialogContent>
                    <Typography>Veuillez vous connecter pour réserver une place.</Typography>
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={() => setPopupOpen(false)}
                        sx={{
                            backgroundColor: "#E3311D",
                            color: "white",
                            "&:hover": { backgroundColor: "darkred" },
                        }}
                    >
                        Fermer
                    </Button>
                    <Link to='/signin'>
                        <Button
                            variant="contained"
                            sx={{
                                backgroundColor: "#4CAF50",
                                color: "white",
                                "&:hover": { backgroundColor: "#45A049" },
                            }}

                        >
                            Se connecter
                        </Button>
                    </Link>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default ReservationPlace;
