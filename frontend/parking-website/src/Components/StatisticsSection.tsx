
import { Box, Grid, Typography } from '@mui/material';
import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';

const StatisticsSection = () => {
    const { ref, inView } = useInView({
        triggerOnce: true, // Only trigger once when in view
        threshold: 0.5, // Trigger when 50% of the component is in view
    });

    const stats = [
        { number: 10, label: "Years In Experience" },
        { number: 2000, label: "Customers" },
        { number: 10, label: "Number of Cities" },
        { number: 90, label: "Satisfaction" },
    ];

    return (
        <Box
            sx={{
                backgroundColor: "black",
                color: "white",
                paddingBottom: "30px",
                width: "100%",
                height: 'auto', // Auto height to fit content
            }}
            ref={ref}
        >
            <Grid container spacing={2} sx={{ backgroundColor: "#e0e0e0", padding: "20px 0" }}>
                {stats.map((stat, index) => (
                    <Grid item xs={12} sm={6} md={3} key={index} textAlign="center">
                        {/* Flex container for number and label */}
                        <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                            {/* Displaying number with CountUp */}
                            <Typography
                                variant="h4"
                                fontWeight="bold"
                                color="black"
                                sx={{
                                    fontWeight: 'bold',
                                    fontSize: '3rem', // Bigger size for the number
                                    transition: 'all 0.3s ease',
                                    mr: 2, // Margin to the right to separate from label
                                }}
                            >
                                {inView ? (
                                    <CountUp
                                        start={0}
                                        end={stat.number}
                                        duration={2.5} // Animation duration in seconds
                                        separator=","
                                    />
                                ) : (
                                    <span>0</span>
                                )}
                            </Typography>

                            {/* Label text next to the number */}
                            <Typography
                                variant="subtitle1"
                                color="black"
                                sx={{
                                    fontWeight: 'bold',
                                    fontSize: '1rem',
                                    display: 'inline-block',
                                }}
                            >
                                {stat.label}
                            </Typography>
                        </Box>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default StatisticsSection;
