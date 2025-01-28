import { View, Text, Image, Modal, Pressable, Button, TextInput } from 'react-native';
import React, { useEffect, useState } from 'react';
import '../global.css';
import { zonePermitFreeResponse, zonePermitOccupiedResponse } from '../Apis/DataResponse/dataResponse';
import apiService from '../Apis/Services/apisService';
import ReservationCard from './ReservationCard';
import { useMyContext } from '../Context/MyContext';

const Reservation = () => {
    const { user, showReservationModal, setShowReservationModal } = useMyContext();
    const [freePlacesList, setFreePlacesList] = useState<zonePermitFreeResponse[]>([]);
    const [occupiedPlacesList, setOccupiedPlacesList] = useState<zonePermitOccupiedResponse[]>([]);
    const [reservationDate, setReservationDate] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endingTime, setEndingTime] = useState('');

    const fetchFreePlaces = async () => {
        try {
            const response = await apiService.zonePermitFree();
            console.log("freePlacesList:", response);
            setFreePlacesList(response);
        } catch (error: any) {
            console.error("Error fetching free places:", error.message);
        }
    };

    const fetchOccupiedPlaces = async () => {
        try {
            const response = await apiService.zonePermitOccupied();
            console.log("occupiedPlacesList:", response);
            setOccupiedPlacesList(response);
        } catch (error: any) {
            console.error("Error fetching occupied places:", error.message);
        }
    };

    useEffect(() => {
        fetchFreePlaces();
        fetchOccupiedPlaces();
    }, []);

    const handleGoBack = () => {
        setShowReservationModal(false);
    };

    const formatDateInput = (text: string) => {
        const cleanedText = text.replace(/[^0-9]/g, '');
        let formattedText = '';
        if (cleanedText.length > 0) {
            formattedText += cleanedText.slice(0, 2);
        }
        if (cleanedText.length > 2) {
            formattedText += '/' + cleanedText.slice(2, 4);
        }
        if (cleanedText.length > 4) {
            formattedText += '/' + cleanedText.slice(4, 8);
        }
        setReservationDate(formattedText);
    };

    const validateTime = (time: string) => {
        const timeRegex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/;
        return timeRegex.test(time);
    };

    const handleStartTimeChange = (text: string) => {
        if (validateTime(text)) {
            setStartTime(text);
        } else {
            console.error("Invalid start time format");
        }
    };

    const handleEndingTimeChange = (text: string) => {
        if (validateTime(text)) {
            setEndingTime(text);
        } else {
            console.error("Invalid ending time format");
        }
    };

    const handleReservationSubmit = () => {
        if (validateTime(startTime) && validateTime(endingTime)) {
            console.log("Reservation submitted with start time:", startTime, "and ending time:", endingTime);
        } else {
            console.error("Invalid time inputs");
        }
    };

    return (
        <View className='bg-black h-full flex flex-col'>
            <View className='flex flex-col justify-center items-center h-1/6 mt-5'>
                <Text className='text-white text-2xl text-bold'>
                    Reservation
                </Text>
            </View>

            <View className='flex flex-col h-1/4'>
                <Image
                    source={require('../assets/Capture5.png')}
                    className='h-full w-full'
                />
            </View>

            <View className='flex flex-col h-1/2'>
                <View className='flex flex-row justify-center items-center'>
                    <Text className='text-white text-xl mt-2'>
                        Places Libres
                    </Text>
                </View>
                <View className='flex flex-row flex-wrap'>
                    {freePlacesList.map((place, index) => (
                        <ReservationCard key={index} place={place} />
                    ))}
                </View>
                <View className='flex flex-row items-center justify-center mt-3'>
                    <Text className='text-white text-xl mt-2'>
                        Places Occupées
                    </Text>
                </View>
                <View className='flex flex-row flex-wrap'>
                    {occupiedPlacesList.map((place, index) => (
                        <ReservationCard key={index} place={place} />
                    ))}
                </View>
            </View>

            <Modal visible={showReservationModal} animationType="slide">
                <View className='bg-black h-full flex flex-col'>
                    <View className='flex flex-col justify-center items-center h-1/6 mt-5'>
                        <Text className='text-white text-2xl text-bold'>
                            Form To Reserve The Spot
                        </Text>
                        <Button title='Go Back' onPress={handleGoBack} color="white" />
                    </View>

                    <View className='flex flex-col h-1/2'>
                        <View className='flex flex-row items-center justify-center mt-3 p-2'>
                            <Text className='text-white text-2xl text-bold'>
                                {user?.firstName} {user?.lastName}
                            </Text>
                        </View>
                        <View className='flex flex-row items-center justify-center mt-3 p-2'>
                            <Text className='text-white text-2xl text-bold'>
                                {user?.tel}
                            </Text>
                        </View>

                        <View className='flex flex-row items-center justify-center mt-5'>
                            <TextInput
                                placeholder='Date De Reservation (DD/MM/YYYY)'
                                value={reservationDate}
                                onChangeText={formatDateInput}
                                keyboardType='numeric'
                                maxLength={10}
                                className='bg-white p-2 rounded-lg w-3/4 text-center'
                            />
                        </View>
                        <View className='flex flex-row items-center justify-center mt-5'>
                            <TextInput
                                placeholder='Start Time (HH:MM)'
                                value={startTime}
                                onChangeText={handleStartTimeChange}
                                keyboardType='numeric'
                                maxLength={5}
                                className='bg-white p-2 rounded-lg w-3/4 text-center'
                            />
                        </View>
                        <View className='flex flex-row items-center justify-center mt-5'>
                            <TextInput
                                placeholder='Ending Time (HH:MM)'
                                value={endingTime}
                                onChangeText={handleEndingTimeChange}
                                keyboardType='numeric'
                                maxLength={5}
                                className='bg-white p-2 rounded-lg w-3/4 text-center'
                            />
                        </View>
                        <View className='flex flex-row items-center justify-center mt-5'>
                            <Pressable
                                onPress={handleReservationSubmit}
                                className='bg-blue-500 p-3 rounded-lg'
                            >
                                <Text className='text-white text-xl'>Submit Reservation</Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

export default Reservation;