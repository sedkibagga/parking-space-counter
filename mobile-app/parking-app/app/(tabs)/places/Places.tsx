import { View } from 'react-native';
import React from 'react';
import ParkingScreen from '../../pages/ParkingScreen';
import { useMyContext } from '../../../Context/MyContext';

const Places = () => {
    const { user } = useMyContext();
    const token = user?.token || '';
    console.log('Places token:', token); // Debugging line to check the token value
    
    return (
        <View style={{ flex: 1 }}>
            <ParkingScreen token={token} />
        </View>
    );
};

export default Places;