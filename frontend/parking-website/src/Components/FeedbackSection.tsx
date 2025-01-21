import { useState } from 'react';
import { Box, Grid, Card, CardContent, Avatar, Typography, IconButton } from '@mui/material';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';  // For arrow buttons

const FeedbackSection = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const feedbacks = [
        {
            name: "Name Customer 1",
            feedback: "Excellent support! Quick and professional response. Will use again!",
            rating: 5,
        },
        {
            name: "Name Customer 2",
            feedback: "Great service! Quick and easy parking reservation. Highly recommend!",
            rating: 4,
        },
        {
            name: "Name Customer 3",
            feedback: "Convenient and secure! Simple process, great experience.",
            rating: 3,
        },
        {
            name: "Name Customer 4",
            feedback: "Friendly staff, smooth experience. Will definitely come back!",
            rating: 5,
        },
        {
            name: "Name Customer 5",
            feedback: "Affordable and easy to use. A great solution for parking.",
            rating: 4,
        },
        {
            name: "Name Customer 6",
            feedback: "Very user-friendly platform. Quick process and reliable service.",
            rating: 5,
        },
    ];

    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 3) % feedbacks.length);  // Show next 3 feedbacks
    };

    const handlePrev = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 3 + feedbacks.length) % feedbacks.length);  // Show previous 3 feedbacks
    };

    const renderStars = (rating: number) => {
        return [...Array(5)].map((_, index) => (
            <span key={index} style={{ color: index < rating ? "#E3311D" : "#ccc" }}>★</span>
        ));
    };

    return (
        <Box sx={{ backgroundColor: "black", color: "white", padding: "50px 0" }}>
            <Typography
                variant="h3"
                sx={{ fontWeight: "bold", marginBottom: "20px", ml: "5%", color: "#E3311D" }}
            >
                Feedbacks
            </Typography>
            <Typography variant="h5" sx={{ textAlign: "center", fontWeight: "bold", marginBottom: "40px" }}>
                What Our Customers Say
            </Typography>

            {/* Feedback Cards */}
            <Grid container spacing={4} justifyContent="center">
                {feedbacks.slice(currentIndex, currentIndex + 3).map((item, index) => (
                    <Grid item xs={12} sm={6} md={4} key={index}>
                        <Card sx={{
                            backgroundColor: "#9e9e9e",
                            textAlign: "center",
                            borderRadius: "10px",
                            width: '80%',
                            maxWidth: 300,
                            margin: '0 auto',
                            padding: '20px',
                            transition: "border 0.3s",  // Smooth transition for the border
                            "&:hover": {
                                border: "2px solid #E3311D",  // Red border on hover
                            }
                        }}>
                            <CardContent>
                                <Avatar sx={{ width: 60, height: 60, margin: "0 auto", marginBottom: "10px" }} />
                                <Typography variant="h6" fontWeight="bold">
                                    {item.name}
                                </Typography>
                                <Typography variant="body2" sx={{ marginBottom: "10px" }}>
                                    {item.feedback}
                                </Typography>
                                <Box sx={{ marginBottom: "10px" }}>
                                    {renderStars(item.rating)}
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>

            {/* Navigation Buttons */}
            <Box sx={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
                <IconButton onClick={handlePrev} sx={{ color: "white", marginRight: "10px" }}>
                    <ChevronLeft />
                </IconButton>
                <IconButton onClick={handleNext} sx={{ color: "white" }}>
                    <ChevronRight />
                </IconButton>
            </Box>
        </Box>
    );
};

export default FeedbackSection;
