import { View, Text, Image, Modal, Pressable, Button, TextInput, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import React, { useEffect, useState } from 'react';
import '../global.css';
import { factureReservationResponse, zonePermitFreeResponse, zonePermitOccupiedResponse } from '../Apis/DataResponse/dataResponse';
import apiService from '../Apis/Services/apisService';
import ReservationCard from './ReservationCard';
import { useMyContext } from '../Context/MyContext';
import { createReservationDto } from '../Apis/DataParam/dataParam';
import { goBack } from 'expo-router/build/global-state/routing';
import Entypo from '@expo/vector-icons/build/Entypo';
import FontAwesome5 from '@expo/vector-icons/build/FontAwesome5';

const Reservation = () => {
    const { user, showReservationModal, setShowReservationModal, placeClicked } = useMyContext();
    const [freePlacesList, setFreePlacesList] = useState<zonePermitFreeResponse[]>([]);
    const [occupiedPlacesList, setOccupiedPlacesList] = useState<zonePermitOccupiedResponse[]>([]);
    const [reservationDate, setReservationDate] = useState<string>('');
    const [startTime, setStartTime] = useState<string>('');
    const [endingTime, setEndingTime] = useState<string>('');
    const [facture, setFacture] = useState<factureReservationResponse>({ zoneId: 0, status: "", reservation_Time: "", reservation_Duration: "", total_Amount: "", firstName: "", lastName: "", cin: "", email: "", tel: "" });
    const [showFactureModal, setShowFactureModal] = useState<boolean>(false);

    console.warn("startTime:", startTime);
    console.warn("endingTime:", endingTime);
    console.warn("placeClicked:", placeClicked);
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



    const handleGoBackFromReservationModal = () => {
        setShowReservationModal(false);
    };

    const handleGoBackFromFactureModal = () => {
        fetchFreePlaces();
        fetchOccupiedPlaces();
        setShowFactureModal(false);
        setShowReservationModal(false);
    }

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

    // const validateTime = (time: string) => {
    //     const timeRegex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/;
    //     return timeRegex.test(time);
    // };

    // const handleStartTimeChange = (text: string) => {
    //     if (validateTime(text)) {
    //         setStartTime(text);
    //     } else {
    //         console.error("Invalid start time format");
    //     }
    // };

    // const handleEndingTimeChange = (text: string) => {
    //     if (validateTime(text)) {
    //         setEndingTime(text);
    //     } else {
    //         console.error("Invalid ending time format");
    //     }
    // };

    const handleReservationSubmit = () => {
        // if (validateTime(startTime) && validateTime(endingTime)) {
        //     console.log("Reservation submitted with start time:", startTime, "and ending time:", endingTime);
        // } else {
        //     console.error("Invalid time inputs");
        // }
    };
    console.warn("reservationTime", reservationDate);
    const handleSubmit = async () => {
        try {
            const reservationTime = `${reservationDate}T${startTime}:00`;
            console.warn("reservationTime", reservationTime);
            const heureDebutInt = parseInt(startTime.split(':')[0]);
            const heureFinInt = parseInt(endingTime.split(':')[0]);
            const reservationDuration = heureFinInt - heureDebutInt;
            console.log("reservationDuration", reservationDuration);
            const reservationData: createReservationDto = {
                reservation_Time: reservationTime,
                reservation_Duration: reservationDuration.toString(),
            };

            console.warn("Reservation Data:", reservationData);
            if (user?.token) {
                console.warn("user.token", user.token);
                const response = await apiService.createReservation(reservationData, placeClicked, user.token);
                const fact: factureReservationResponse = {
                    zoneId: placeClicked,
                    status: response.status,
                    reservation_Time: response.reservation_Time,
                    reservation_Duration: response.reservation_Duration,
                    total_Amount: response.total_Amount,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    cin: user.cin,
                    email: user.email,
                    tel: user.tel
                }
                setFacture(fact);
                console.warn("reserved with succ:", response);
                setShowReservationModal(false);
                setShowFactureModal(true);

            } else {
                console.warn('User token is undefined');
            }
        } catch (error: any) {
            console.log("error:", error.message);
            alert(error.message);
        }


    }

    const handleConfirmFacture = () => {

    }
    useEffect(() => {
        fetchFreePlaces();
        fetchOccupiedPlaces();
    }, []);
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
                        <Button title='Go Back' onPress={handleGoBackFromReservationModal} color="white" />
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
                                onChangeText={(e) => { setStartTime(e.valueOf()) }}
                                // keyboardType='numeric'
                                maxLength={5}
                                className='bg-white p-2 rounded-lg w-3/4 text-center'
                            />
                        </View>
                        <View className='flex flex-row items-center justify-center mt-5'>
                            <TextInput
                                placeholder='Ending Time (HH:MM)'
                                value={endingTime}
                                onChangeText={(e) => { setEndingTime(e.valueOf()) }}
                                // keyboardType='numeric'
                                maxLength={5}
                                className='bg-white p-2 rounded-lg w-3/4 text-center'
                            />
                        </View>
                        <View className='flex flex-row items-center justify-center mt-5'>
                            <Pressable
                                onPress={handleSubmit}
                                className='bg-blue-500 p-3 rounded-lg'
                            >
                                <Text className='text-white text-xl'>Submit Reservation</Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
            </Modal>
            <Modal visible={showFactureModal} animationType="slide">
                <KeyboardAvoidingView
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                    style={{ flex: 1 }}
                >
                    <ScrollView className='bg-black h-full flex flex-col'>

                        <View className='flex flex-row items-start justify-start mt-20 ml-5'>
                            <Text className='text-white text-3xl'>Invoice</Text>
                        </View>

                        <View className='flex flex-row items-start justify-start ml-5 mt-3'>
                            <Text className='text-white text-xl'>May 14, 2022 /no 456485</Text>
                        </View>

                        <View className='flex flex-row items-start justify-start ml-5 mt-3'>
                            <Text className='text-white text-xl'>To: Alex Bets</Text>
                        </View>

                        <View className='flex flex-row items-start justify-start ml-5 mt-3'>
                            <Text className='text-white text-xl'>Mail: sedkibagga4@gmail.com</Text>
                        </View>

                        <View className='flex flex-row w-full mt-3'>
                            <View className='w-full border-b border-white' />
                        </View>

                        <View className='flex flex-row justify-between mt-3'>
                            <Text className='text-white text-xl ml-5'>Hour Price</Text>
                            <Text className='text-white text-xl mr-3'>$10.00</Text>
                        </View>

                        <View className='flex flex-row justify-between mt-3'>
                            <Text className='text-white text-xl ml-5'>ReservationTime</Text>
                            <Text className='text-white text-xl mr-3'>2025-10-20T13:00:00</Text>
                        </View>

                        <View className='flex flex-row justify-between mt-3'>
                            <Text className='text-white text-xl ml-5'>Duration</Text>
                            <Text className='text-white text-xl mr-3'>3</Text>
                        </View>

                        <View className='flex flex-row w-full mt-3'>
                            <View className='w-full border-b border-white' />
                        </View>

                        <View className='flex flex-row justify-between mt-3'>
                            <Text className='text-white text-xl ml-5'>Amount</Text>
                            <Text className='text-white text-xl mr-3'>$30.00</Text>
                        </View>

                        <View className='flex flex-row justify-between mt-3'>
                            <Text className='text-white text-xl ml-5'>Tax</Text>
                            <Text className='text-white text-xl mr-3'>$2.00</Text>
                        </View>

                        <View className='flex flex-row w-full mt-3'>
                            <View className='w-full border-b border-white' />
                        </View>

                        <View className='flex flex-row justify-between mt-3'>
                            <Text className='text-white text-2xl ml-5'>Total</Text>
                            <Text className='text-white text-2xl mr-3'>$32.00</Text>
                        </View>

                        <View className='flex flex-row w-full mt-3'>
                            <View className='w-full border-b border-white' />
                        </View>

                        <View className='flex flex-row justify-start items-start mt-5'>
                            <Text className='text text-white text-2xl ml-5'>Add your payment information</Text>
                        </View>

                        <View className='flex flex-row justify-between mt-5'>
                            <Text className='text-white text-lg ml-5 mt-2'>Card information</Text>
                            <View className='flex flex-row items-center justify-center'>
                                <Entypo name="camera" size={24} color="blue" />
                                <Text className='text text-blue-600 ml-2 mr-3'>Scan card</Text>
                            </View>
                        </View>

                        <View className='flex flex-row justify-between mt-3 items-center'>
                            <View className='relative w-full'>
                                <TextInput
                                    placeholder='Card Number'
                                    className='bg-white p-2 rounded-lg pl-3 pr-10'
                                />
                                <View className='absolute right-3 top-1/2 transform -translate-y-1/2'>
                                    <FontAwesome5 name="cc-visa" size={24} color="black" />
                                </View>
                            </View>
                        </View>

                        <View className='flex flex-row w-full mt-3'>
                            <View className='flex flex-row w-1/2'>
                                <TextInput placeholder='MM/YY' className='bg-white p-2 rounded-lg pl-3 pr-10 w-full' />
                            </View>
                            <View className='flex flex-row w-1/3 ml-5'>
                                <TextInput placeholder='CVC' className='bg-white p-2 rounded-lg pl-3 pr-10 w-full' />
                            </View>
                        </View>
                        <View className='flex flex-row items-center justify-center mt-5'>
                            <Button title='Pay' onPress={handleGoBackFromFactureModal} color="white" />
                        </View>
                    </ScrollView>
                </KeyboardAvoidingView>
            </Modal>
        </View>
    );
};

export default Reservation;