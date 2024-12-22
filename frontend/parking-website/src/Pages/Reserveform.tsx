import { Stack } from '@mui/material'
import React from 'react'
import ReservationSection from '../Components/ReservationSection'
import ReftSection from '../Components/RightSection'

function Reserveform() {
    return (
        <Stack direction="row">
            <ReservationSection />
            <ReftSection />

        </Stack>
    )
}

export default Reserveform