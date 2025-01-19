import React, { useState } from "react";
import { AppBar, Toolbar, IconButton, Box, Button, Menu, MenuItem } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Link, useLocation } from "react-router-dom";
import { MdAccountCircle } from "react-icons/md";
import image from "../assets/Capture.png"; // Import correct de l'image
import { useAuth } from "./AuthContexte";

const Navbar: React.FC = () => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const location = useLocation();
    const { user, logout } = useAuth(); // Assurez-vous que `useAuth` retourne `user` et `logout` correctement typés

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
                {/* Logo */}
                <IconButton edge="start" color="inherit" aria-label="logo" sx={{ mr: 2 }}>
                    <img
                        src={image}
                        alt="logo"
                        style={{ width: "80px", height: "50px" }}
                    />
                </IconButton>

                {/* Desktop Menu */}
                <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" }, justifyContent: "center" }}>
                    {["home", "about", "services", "reservation", "contact"].map((item) => (
                        <Button
                            key={item}
                            color="inherit"
                            sx={{
                                mx: 1,
                                fontWeight: location.pathname === `/${item}` ? "bold" : "normal",
                                fontSize: location.pathname === `/${item}` ? "0.9rem" : "0.8rem",
                                "&:hover": {
                                    color: "#f44336",
                                    fontSize: "0.9rem",
                                },
                            }}
                            component={Link}
                            to={`/${item}`}
                        >
                            {item.charAt(0).toUpperCase() + item.slice(1).replace(/([a-z])([A-Z])/g, "$1 $2")}
                        </Button>
                    ))}
                </Box>

                {/* Mobile Menu */}
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
                        {["home", "about", "services", "reservation", "contact"].map((item) => (
                            <MenuItem
                                key={item}
                                onClick={handleMenuClose}
                                component={Link}
                                to={`/${item}`}
                            >
                                {item.charAt(0).toUpperCase() + item.slice(1).replace(/([a-z])([A-Z])/g, "$1 $2")}
                            </MenuItem>
                        ))}
                    </Menu>
                </Box>

                {/* Right Section */}
                <Box>
                    {!!user ? (
                        <>
                            <Link to="/profil">
                                <IconButton sx={{ color: "white" }}>
                                    <MdAccountCircle size={30} />
                                </IconButton>
                            </Link>
                            <Button
                                onClick={logout}
                                sx={{
                                    backgroundColor: '#E3311D',
                                    color: "white",
                                    minWidth: "80px",
                                    height: "35px",
                                    ml: 2,
                                }}
                            >
                                Log Out
                            </Button>
                        </>
                    ) : (
                        <>
                            <Button
                                variant="contained"
                                color="error"
                                sx={{ mx: 1 }}
                                component={Link}
                                to="/signup"
                            >
                                Sign Up
                            </Button>
                            <Button
                                variant="outlined"
                                color="inherit"
                                component={Link}
                                to="/signin"
                            >
                                Sign In
                            </Button>
                        </>
                    )}
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
