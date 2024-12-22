
import { Box, Typography } from '@mui/material';
import { motion } from 'framer-motion';  // Import motion from framer-motion
import image from '../assets/Capture2.jpg';

const ReadyToExperienceSection = () => (
    <Box>
        {/* Section with animated text */}
        <Box sx={{ textAlign: "center", padding: "50px 20px", backgroundColor: "#000", color: 'white' }}>
            <motion.div
                initial={{ opacity: 0, y: -50 }}  // Start with hidden and slightly above
                animate={{ opacity: 1, y: 0 }}    // Fade in and move to normal position
                transition={{ duration: 1 }}      // Duration of the animation
            >
                <Typography variant="h4" fontWeight="bold" gutterBottom>
                    Are You Ready To Experience?
                </Typography>
            </motion.div>
        </Box>

        {/* Full-width image */}
        <Box
            component="img"
            src={image}
            alt="Car"
            sx={{
                width: "100%", // Image takes full width of the container
                height: "60%", // Maintain aspect ratio
                display: "block", // Ensures no extra space below image
            }}
        />
    </Box>
);

export default ReadyToExperienceSection;
