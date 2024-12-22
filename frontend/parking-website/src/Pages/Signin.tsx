
import ReftSection from '../Components/RightSection'
import SignInSection from '../Components/SignInSection'
import { Stack } from '@mui/material'

function Signin() {
    return (
        <Stack direction="row">
            <SignInSection />
            <ReftSection />

        </Stack>
    )
}

export default Signin