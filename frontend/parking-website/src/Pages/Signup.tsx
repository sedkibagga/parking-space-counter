import { Stack } from '@mui/material'

import ReftSection from '../Components/RightSection'
import SignUpSection from '../Components/SignUpSection'

function Signup() {
    return (
        <Stack direction="row">
            <SignUpSection />
            <ReftSection />

        </Stack>
    )
}

export default Signup