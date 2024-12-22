import { Box } from '@mui/material'

import Navbar from '../Components/Navbar'
import FooterSection from '../Components/FooterSection'
import Title from '../Components/Title'
import ReservationPlace from '../Components/ReservationPlace'

function Reservation() {
    return (
        <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Navbar />
            <Title
                title="Reservation"
                description="Here is a brief description about our mission and values." />
            <ReservationPlace />
            <FooterSection />
        </Box>

    )
}

export default Reservation