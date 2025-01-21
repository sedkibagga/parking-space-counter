import React, { useEffect, useState } from "react";
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
import { Link, useNavigate } from "react-router-dom";
import apiService from "../Apis/Services/apisService";
import { zonePermitFreeResponse, zonePermitOccupiedResponse } from "../Apis/DataResponse/dataResponse";

interface Place {
    zoneId: number;
    status: string;
}

const ReservationPlace: React.FC = () => {
    const [freePlacesList, setFreePlacesList] = useState<zonePermitFreeResponse[]>([]);
    const [occupiedPlacesList, setOccupiedPlacesList] = useState<zonePermitOccupiedResponse[]>([]);
    const [popupOpen, setPopupOpen] = useState(false);
    const { user, setPlaceClicked, placeClicked } = useAuth(); 
    const navigate = useNavigate();

    // Fetch free places
    const fetchFreePlaces = async () => {
        try {
            const response = await apiService.zonePermitFree();
            console.log("freePlacesList:", response);
            setFreePlacesList(response);
        } catch (error: any) {
            console.error("Error fetching free places:", error.message);
        }
    };

    // Fetch occupied places
    const fetchOccupiedPlaces = async () => {
        try {
            const response = await apiService.zonePermitOccupied();
            console.log("occupiedPlacesList:", response);
            setOccupiedPlacesList(response);
        } catch (error: any) {
            console.error("Error fetching occupied places:", error.message);
        }
    };

    useEffect(() => {
        fetchFreePlaces();
        fetchOccupiedPlaces();
    }, []);

    const handlePlaceClick = (place: Place) => {
        if (place.status === "free") {
            if (!user) {
                setPlaceClicked(place.zoneId);
                setPopupOpen(true); 
            } else {
                setPlaceClicked(place.zoneId);
                navigate("/Reservation/reserveform"); 
            }
        }
    };

    console.log("Current placeClicked state:", placeClicked);

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

          
            <Typography variant="h5" sx={{ marginTop: "30px", marginBottom: "10px" }}>
                Places Libres
            </Typography>
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
                {freePlacesList.map((place) => (
                    <motion.div
                        key={place.zoneId}
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
                                {place.zoneId}
                            </Typography>

                            <Button
                                variant="contained"
                                size="small"
                                onClick={() => handlePlaceClick(place)}
                                sx={{
                                    backgroundColor: "green",
                                    color: "white",
                                    borderRadius: "20px",
                                    textTransform: "none",
                                    "&:hover": {
                                        backgroundColor: "darkgreen",
                                    },
                                }}
                            >
                                {place.status}
                            </Button>
                        </Box>
                    </motion.div>
                ))}
            </Box>

            
            <Typography variant="h5" sx={{ marginTop: "30px", marginBottom: "10px" }}>
                Places Occupées
            </Typography>
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
                {occupiedPlacesList.map((place) => (
                    <motion.div
                        key={place.zoneId}
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
                                {place.zoneId}
                            </Typography>
                            <Button
                                variant="contained"
                                size="small"
                                disabled
                                sx={{
                                    backgroundColor: "gray",
                                    color: "white",
                                    borderRadius: "20px",
                                    textTransform: "none",
                                }}
                            >
                                {place.status}
                            </Button>
                        </Box>
                    </motion.div>
                ))}
            </Box>

            {/* Login Popup */}
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
                    <Link to="/signin">
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
