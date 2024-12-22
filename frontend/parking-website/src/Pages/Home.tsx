
import Navbar from '../Components/Navbar';
import HeroSection from '../Components/HeroSection';
import AboutUsSection from '../Components/AboutUsSection';
import StatisticsSection from '../Components/StatisticsSection';
import ProcessSection from '../Components/ProcessSection';
import ReadyToExperienceSection from '../Components/ReadyToExperienceSection';
import FeedbackSection from '../Components/FeedbackSection';
import FooterSection from '../Components/FooterSection';
import { Box } from '@mui/material';

const Home = () => {
    return (
        <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Navbar />
            <HeroSection />
            <AboutUsSection />
            <StatisticsSection />
            <ProcessSection />
            <ReadyToExperienceSection />
            <FeedbackSection />
            <FooterSection />
        </Box>
    );
};

export default Home;
