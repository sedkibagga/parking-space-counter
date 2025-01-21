import { Box } from '@mui/material'

import Navbar from '../Components/Navbar'
import FooterSection from '../Components/FooterSection'
import Title from '../Components/Title'

function Contact() {
    return (
        <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Navbar />
            <Title
                title="Contact"
                description="Here is a brief description about our mission and values." />
            <FooterSection />
        </Box>

    )
}

export default Contact