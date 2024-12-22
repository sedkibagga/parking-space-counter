import { Box } from '@mui/material'
import React from 'react'
import Navbar from '../Components/Navbar'
import FooterSection from '../Components/FooterSection'

function About() {
    return (
        <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Navbar />
            <FooterSection />
        </Box>
    )
}

export default About