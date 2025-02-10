import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import '../global.css'
import { zonePermitFreeResponse } from '../Apis/DataResponse/dataResponse'
import { useMyContext } from '../Context/MyContext'
 
const ReservationCard = ({ place }: { place: zonePermitFreeResponse }) => {
    const {setShowReservationModal,setPlaceClicked} = useMyContext();
    const handleLongPress = (placeStatus:string) => {
        if (placeStatus==="free") {
            setPlaceClicked(place.zoneId);
            setShowReservationModal(true);
        }
    }
    return (
          
            <TouchableOpacity onLongPress={() => handleLongPress(place.status)} className=' rounded-xl w-1/4 flex flex-col items-center justify-center p-5  mt-5 bg-red-600 mr-3 ml-5'>
                <View className='flex flex-row justify-center items-center bg-white rounded-full w-1/3 mb-3'>
                    <Text className='text-red-600'>{place.zoneId}</Text>
                </View>
                <View className='flex flex-row justify-center items-center rounded-full w-full mt-2'>
                    <Text className='text-white'>{place.status}</Text>

                </View>
            
        </TouchableOpacity>
    )
}

export default ReservationCard