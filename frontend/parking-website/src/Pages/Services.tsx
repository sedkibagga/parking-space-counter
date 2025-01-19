import { Box } from '@mui/material'
import Navbar from '../Components/Navbar'
import FooterSection from '../Components/FooterSection'
import Title from '../Components/Title'
import WhyChooseSection from '../Components/WhyChooseSection'

function Services() {
    return (
        <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Navbar />
            <Title
                title="Services"
                description="Here is a brief description about our mission and values." />
            <WhyChooseSection />
            <FooterSection />

        </Box>

    )
}

export default Services