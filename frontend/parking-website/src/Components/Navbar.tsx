import React, { useState } from "react";
import { AppBar, Toolbar, IconButton, Box, Button, Menu, MenuItem } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Link, useLocation } from "react-router-dom";  // Importer useLocation de react-router-dom
import image from '../assets/Capture.png'; // Correctement importer l'image

const Navbar: React.FC = () => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const location = useLocation(); // Utilisation de useLocation pour obtenir le chemin actuel

    const open = Boolean(anchorEl);

    const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    return (
        <AppBar position="static" sx={{ backgroundColor: "#000" }}>
            <Toolbar>
                {/* Left: Logo */}
                <IconButton edge="start" color="inherit" aria-label="logo" sx={{ mr: 2 }}>
                    <img
                        src={image} // Utilisez directement l'image importée
                        alt="logo"
                        style={{ width: "80px", height: "50px" }}
                    />
                </IconButton>

                {/* Center: Menu */}
                <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" }, justifyContent: "center" }}>
                    <Button
                        color="inherit"
                        sx={{
                            mx: 1,
                            fontWeight: location.pathname === "/home" ? "bold" : "normal", // Vérifier si le chemin actuel est "/home"
                            fontSize: location.pathname === "/home" ? "0.9rem" : "0.8rem", // Réduire la taille de la police
                            "&:hover": {
                                color: "#f44336", // Changer la couleur au survol
                                fontSize: "0.9rem", // Taille de police survolée
                            }
                        }}
                        component={Link} to="/home"
                    >
                        Home
                    </Button>
                    <Button
                        color="inherit"
                        sx={{
                            mx: 1,
                            fontWeight: location.pathname === "/about" ? "bold" : "normal",
                            fontSize: location.pathname === "/about" ? "0.9rem" : "0.8rem",
                            "&:hover": {
                                color: "#f44336",
                                fontSize: "0.9rem",
                            }
                        }}
                        component={Link} to="/about"
                    >
                        About Us
                    </Button>
                    <Button
                        color="inherit"
                        sx={{
                            mx: 1,
                            fontWeight: location.pathname === "/services" ? "bold" : "normal",
                            fontSize: location.pathname === "/services" ? "0.9rem" : "0.8rem",
                            "&:hover": {
                                color: "#f44336",
                                fontSize: "0.9rem",
                            }
                        }}
                        component={Link} to="/services"
                    >
                        Services
                    </Button>
                    <Button
                        color="inherit"
                        sx={{
                            mx: 1,
                            fontWeight: location.pathname === "/reservation" ? "bold" : "normal",
                            fontSize: location.pathname === "/reservation" ? "0.9rem" : "0.8rem",
                            "&:hover": {
                                color: "#f44336",
                                fontSize: "0.9rem",
                            }
                        }}
                        component={Link} to="/reservation"
                    >
                        Reservation
                    </Button>
                    <Button
                        color="inherit"
                        sx={{
                            mx: 1,
                            fontWeight: location.pathname === "/contact" ? "bold" : "normal",
                            fontSize: location.pathname === "/contact" ? "0.9rem" : "0.8rem",
                            "&:hover": {
                                color: "#f44336",
                                fontSize: "0.9rem",
                            }
                        }}
                        component={Link} to="/contact"
                    >
                        Contact
                    </Button>
                </Box>

                {/* Responsive Menu for Mobile */}
                <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
                    <IconButton
                        color="inherit"
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        onClick={handleMenuOpen}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Menu
                        id="menu-appbar"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleMenuClose}
                        sx={{ display: { xs: "block", md: "none" } }}
                    >
                        <MenuItem
                            onClick={() => { handleMenuClose(); }}
                            component={Link} to="/home"
                        >
                            Home
                        </MenuItem>
                        <MenuItem
                            onClick={() => { handleMenuClose(); }}
                            component={Link} to="/about"
                        >
                            About Us
                        </MenuItem>
                        <MenuItem
                            onClick={() => { handleMenuClose(); }}
                            component={Link} to="/services"
                        >
                            Services
                        </MenuItem>
                        <MenuItem
                            onClick={() => { handleMenuClose(); }}
                            component={Link} to="/reservation"
                        >
                            Reservation
                        </MenuItem>
                        <MenuItem
                            onClick={() => { handleMenuClose(); }}
                            component={Link} to="/contact"
                        >
                            Contact
                        </MenuItem>
                    </Menu>
                </Box>

                {/* Right: Buttons */}
                <Box>
                    <Button
                        variant="contained"
                        color="error"
                        sx={{ mx: 1 }}
                        component={Link}
                        to="/signup" // Link vers la page d'inscription
                    >
                        Sign Up
                    </Button>
                    <Button
                        variant="outlined"
                        color="inherit"
                        component={Link}
                        to="/signin" // Link vers la page de connexion
                    >
                        Sign In
                    </Button>
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
