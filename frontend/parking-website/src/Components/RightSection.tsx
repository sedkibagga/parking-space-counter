import React from 'react';
import log from '/src/assets/log.jpeg';
import Box from '@mui/material/Box';
import { Divider } from '@mui/material';

const LeftSection: React.FC = () => {
    return (
        <Box
            display="flex"
            alignItems="center"
            justifyContent="flex-start"
            height="99vh"  // Ajustez la hauteur selon vos besoins

            sx={{ width: '50%', marginLeft: 'auto', marginRight: 0 }}
        >
            <Divider orientation="vertical" sx={{ bgcolor: '#2F4558', width: 2 }} flexItem />
            <Box
                component="img"
                src={log}
                alt="CARPARK"
                sx={{ width: '98.5%', height: '100%' }}
            />
        </Box>
    );
};

export default LeftSection;
