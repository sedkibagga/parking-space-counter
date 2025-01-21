import { Box, Grid, Card, CardContent, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const ProcessSection = () => {
    const { ref, inView } = useInView({
        triggerOnce: true, // Animation triggered only once
        threshold: 0.5, // Trigger when 50% of the component is in view
    });

    const steps = [
        { step: "1", title: "Create Account", description: "Create your account in just a few simple steps. Sign up quickly and easily to get started, access all features, and begin your journey with us today without any hassle!" },
        { step: "2", title: "Reserve Place", description: "Choose a convenient spot that works best for you. Reserve it effortlessly and secure your preferred location to ensure you have the perfect space for your needs, all with ease." },
        { step: "3", title: "Time To Pay", description: "Finish the process by completing your payment. Ensure everything is finalized and secure your reservation or purchase with a simple, smooth transaction to enjoy the service." },
    ];

    return (
        <Box sx={{ textAlign: "center", padding: "50px 20px", backgroundColor: "black", color: "white" }} ref={ref}>
            {/* Section Title with fade-in animation */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
            >
                <Typography variant="h3" fontWeight="bold" gutterBottom sx={{ color: 'white', marginBottom: '4%', margintop: '-2%' }}>
                    Our Process
                </Typography>
            </motion.div>

            {/* Grid for Steps */}
            <Grid container spacing={5} justifyContent="center"> {/* Increased spacing here */}
                {steps.map((process, index) => (
                    <Grid item xs={12} sm={6} md={4} key={index}>
                        {/* Card with slide-up animation */}
                        <motion.div
                            initial={{ opacity: 0, y: 50 }}  // Initial position, hidden and below
                            animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 50 }} // Trigger animation on scroll
                            transition={{ duration: 0.8, delay: index * 0.3 }}  // Delay between the steps
                        >
                            <Card
                                sx={{
                                    backgroundColor: "#E3311D", // Red background for the card
                                    color: "white", // White text color
                                    textAlign: "center",
                                    borderRadius: "15px",
                                    padding: "20px",
                                    boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)", // Optional shadow for the card
                                    position: "relative", // To position the circle inside the card
                                }}
                                component={motion.div}
                                whileHover={{
                                    scale: 1.05, // Agrandir la carte au survol
                                    transition: { duration: 0.3, ease: "easeOut" } // Transition pour un effet fluide
                                }}
                            >
                                <CardContent>
                                    {/* Circle with the step number, black background and white text */}
                                    <Box
                                        sx={{
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            backgroundColor: "#000000", // Black circle
                                            color: "white", // White text inside the circle
                                            borderRadius: "50%", // Make it a circle
                                            width: "60px", // Increase width for bigger circle
                                            height: "60px", // Increase height for bigger circle
                                            fontSize: "24px", // Make the font bigger
                                            fontWeight: "bold", // Make the number bold
                                            position: "absolute", // Positioning it inside the card
                                            top: "10px", // Distance from the top
                                            left: "10px", // Distance from the left
                                            zIndex: 1, // Ensures the circle is above other content
                                        }}
                                    >
                                        <motion.div
                                            initial={{ scale: 0 }}  // Start hidden and small
                                            animate={{ scale: inView ? 1 : 0 }}  // Scale up when in view
                                            transition={{
                                                type: "spring",
                                                stiffness: 400,
                                                damping: 10,
                                                delay: 0.3
                                            }}
                                        >
                                            {process.step}
                                        </motion.div>
                                    </Box>

                                    {/* Title of the step with bold font */}
                                    <Typography variant="h6" fontWeight="bold" gutterBottom sx={{ color: 'white' }}>
                                        {process.title}
                                    </Typography>

                                    {/* Description of the step with normal font */}
                                    <Typography variant="body2" sx={{ color: 'white' }}>
                                        {process.description}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </motion.div>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default ProcessSection;
