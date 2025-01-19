
import {
    Box,
    Typography,
    TextField,
    Button,
    Grid,
    IconButton,
    Link as MuiLink,
} from "@mui/material";
import image from "../assets/Capture.png";
import {
    Email as EmailIcon,
    Phone as PhoneIcon,
    LocationOn as LocationIcon,
    Facebook,
    Twitter,
    Instagram,
    LinkedIn,
} from "@mui/icons-material";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const FooterSection = () => {
    const handleSubscribe = () => {
        toast.success("Subscribed successfully!", {
            position: "bottom-right",
        });
    };

    return (
        <Box>
            {/* Red Separator Bar */}
            <Box sx={{ backgroundColor: "#E3311D", height: "5px" }} />

            {/* Main Footer Content */}
            <Box sx={{ backgroundColor: "#050507", padding: "30px 100px" }}>
                <Grid
                    container
                    spacing={4}
                    justifyContent="center"
                    alignItems="center"
                    textAlign="center"
                >
                    {/* Left Section */}
                    <Grid item xs={12} sm={6} md={4}>
                        <Box textAlign="left" sx={{ color: "white" }}>

                            <img
                                src={image}
                                alt="Car Park Logo"
                                style={{ width: "80px", marginBottom: "10px" }}
                            />
                            <Box
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    marginBottom: "8px",
                                }}
                            >
                                <LocationIcon
                                    sx={{ marginRight: "10px", fontSize: "15px", color: "#E3311D" }}
                                />
                                <Typography variant="body2" sx={{ fontSize: "14px" }} color="#ccc">
                                    40 Lavira street, Magana City, Texas
                                </Typography>
                            </Box>
                            <Box
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    marginBottom: "8px",
                                }}
                            >
                                <PhoneIcon sx={{ marginRight: "10px", color: "#E3311D" }} />
                                <Typography variant="body2" sx={{ fontSize: "14px" }} color="#ccc">
                                    +555 444 333
                                </Typography>
                            </Box>
                            <Box sx={{ display: "flex", alignItems: "center" }}>
                                <EmailIcon sx={{ marginRight: "10px", color: "#E3311D" }} />
                                <Typography variant="body2" sx={{ fontSize: "14px" }} color="#ccc">
                                    carpark@gmail.com
                                </Typography>
                            </Box>
                        </Box>
                    </Grid>

                    {/* Middle Section */}
                    <Grid item xs={12} sm={6} md={4}>
                        <Box>
                            <Typography
                                variant="h6"
                                fontWeight="bold"
                                sx={{ color: "white", fontSize: "17px", marginBottom: "10px" }}
                            >
                                Quick Links
                            </Typography>
                            {[{ name: "Home", href: "/Home" }, { name: "About Us", href: "/about" }, { name: "Our Services", href: "/services" }, { name: "Reservation", href: "/reservation" }, { name: "Contact", href: "/contact" }].map((link, index) => (
                                <MuiLink
                                    key={index}
                                    href={link.href}
                                    underline="none"
                                    sx={{
                                        display: "block",
                                        color: "#ccc",
                                        margin: "5px 0",
                                        fontSize: "14px",
                                        "&:hover": { color: "white" },
                                    }}
                                >
                                    {link.name}
                                </MuiLink>
                            ))}
                        </Box>
                    </Grid>

                    {/* Right Section */}
                    <Grid item xs={12} sm={6} md={4}>
                        <Box>
                            <Typography
                                variant="h6"
                                fontWeight="bold"
                                sx={{ color: "white", fontSize: "17px", marginBottom: "10px" }}
                            >
                                Newsletter
                            </Typography>
                            <Typography
                                variant="body2"
                                sx={{ color: "#ccc", fontSize: "14px", marginBottom: "10px" }}
                            >
                                Subscribe to our newsletter
                            </Typography>
                            <TextField
                                variant="outlined"
                                size="small"
                                placeholder="Enter your email"
                                sx={{
                                    backgroundColor: "#D9D9D9",
                                    borderRadius: "15px",
                                    marginBottom: "10px",
                                    width: "80%",
                                }}
                            />
                            <Button
                                variant="contained"
                                sx={{ backgroundColor: "#E3311D", borderRadius: "15px", color: "white" }}
                                onClick={handleSubscribe}
                            >
                                Subscribe
                            </Button>
                        </Box>
                    </Grid>
                </Grid>

                {/* Red Separator Line */}
                <Box sx={{ backgroundColor: "#E3311D", height: "2px", width: "1400px", marginLeft: "-15%", marginBottom: "2%", marginTop: "2%" }} />

                {/* Social Media and Copyright */}
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        flexWrap: "wrap",
                        color: "#ccc",
                        padding: "2px 0",
                    }}
                >
                    {/* Social Media Icons */}
                    <Box>
                        {[Facebook, Twitter, Instagram, LinkedIn].map((Icon, index) => (
                            <IconButton
                                key={index}
                                sx={{
                                    color: "black",  // Set the icon color to black
                                    backgroundColor: "#ccc",
                                    margin: "0 5px",
                                    borderRadius: "50%",
                                    "&:hover": { backgroundColor: "#555" },
                                    fontSize: "14px",  // Make the icons smaller
                                }}
                            >
                                <Icon />
                            </IconButton>
                        ))}
                    </Box>

                    {/* Reserved Rights */}
                    <Typography variant="body2" sx={{ color: "#ccc", fontSize: "14px" }}>
                        ©Car Park. All rights reserved
                    </Typography>
                </Box>
            </Box>

            {/* Toast Notifications */}
            <ToastContainer />
        </Box>
    );
};

export default FooterSection;
