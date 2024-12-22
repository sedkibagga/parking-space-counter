import { Box } from '@mui/material'
import Navbar from '../Components/Navbar'
import FooterSection from '../Components/FooterSection'

function Services() {
    return (
        <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Navbar />
            <FooterSection />
        </Box>

    )
}

export default Services