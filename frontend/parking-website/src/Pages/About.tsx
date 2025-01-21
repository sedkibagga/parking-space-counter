import { Box } from '@mui/material'
import React from 'react'
import Navbar from '../Components/Navbar'
import FooterSection from '../Components/FooterSection'
import Title from '../Components/Title'
import InfoSection from '../Components/InfoSection'
import QualitySection from '../Components/QualitySection'
import BoxStatistics from '../Components/BoxStatistics'

function About() {
    return (
        <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Navbar />
            <Title
                title="About Us"
                description="Here is a brief description about our mission and values." />
            <InfoSection />
            <QualitySection />
            <BoxStatistics />
            <FooterSection />
        </Box>
    )
}

export default About