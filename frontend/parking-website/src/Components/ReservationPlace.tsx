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

// Array of 12 places with initial statuses (Libre or Occupé)
const initialPlaces = Array.from({ length: 12 }, (_, index) => ({
    id: index + 1,
    status: index % 3 === 0 ? "Occupé" : "Libre", // Example: every 3rd place is occupied
}));

const ReservationPlace: React.FC = () => {
    const [places, setPlaces] = useState(initialPlaces);
    const [popupOpen, setPopupOpen] = useState(false);

    const handlePlaceClick = (place: { id: number; status: string }) => {
        if (place.status === "Libre") {
            // Redirect to reservation form
            window.location.href = "/Reservation/reserveform";
        } else {
            // Show pop-up for occupied places
            setPopupOpen(true);
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
                Reserve Your Spot
            </Typography>

            {/* Image after the reservation */}
            <Box sx={{ marginTop: "40px" }}>
                <img
                    src={image} // Replace with your actual image URL
                    alt="Reservation"
                    style={{
                        width: "60%",
                        marginBottom: "5%",
                        borderRadius: "12px",
                        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                    }}
                />
            </Box>

            {/* Grid of places */}
            <Box
                sx={{
                    display: "grid",
                    gridTemplateColumns: "repeat(3, 1fr)",
                    gap: "50px", // Increased space between the boxes
                    justifyContent: "center",
                    marginLeft: "auto",
                    marginRight: "auto", // Center the grid
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
                                width: "150px", // Set width for consistency
                                display: "flex", // Flex container for alignment
                                alignItems: "center", // Center content vertically
                                justifyContent: "center", // Center content horizontally
                                flexDirection: "column", // Stack items vertically
                            }}
                        >
                            {/* Circle with place ID */}
                            <Typography
                                variant="h6"
                                sx={{
                                    display: "inline-flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    borderRadius: "50%",
                                    width: "40px", // Smaller size for the circle
                                    height: "40px",
                                    marginBottom: "10px", // Space between circle and button
                                    backgroundColor: "white",
                                    color: "#E3311D",
                                    fontWeight: "bold",
                                }}
                            >
                                {place.id}
                            </Typography>

                            {/* Button for the place */}
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

            {/* Popup for occupied places */}
            <Dialog
                open={popupOpen}
                onClose={() => setPopupOpen(false)}
                PaperProps={{
                    sx: { backgroundColor: "black", color: "white" },
                }}
            >
                <DialogTitle>Place Occupée</DialogTitle>
                <DialogContent>
                    <Typography>Cette place est déjà occupée.</Typography>
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
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default ReservationPlace;
