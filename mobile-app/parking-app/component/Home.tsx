import { View, Text, Image, Button } from 'react-native'
import React from 'react'
import '../global.css'
import AntDesign from '@expo/vector-icons/AntDesign';
const Home = () => {
    return (
        <View className='bg-black h-full'>
            <View className="flex flex-col bg-red-500 h-1/2 mt-10">
                <Image
                    source={require('../assets/place-stationnement.jpg')}
                    className='h-full w-full'
                />

                <View className='flex flex-col items-center justify-center mt-10'>
                    <Text className='text font-bold text-white text-5xl'>
                        Car Park
                    </Text>
                    <Text className='text text-red-600 text-xl mt-5'>
                        Your Spot , Anytime , Anywhere
                    </Text>
                    <View className="flex flex-row p-2 mt-5">
                        <View className='bg-gray-200 mr-10 w-1/3 flex flex-row justify-center items-center rounded-xl'>
                        <Button title="Services" color="black" />
                        <AntDesign name="arrowright" size={24} color="black" />
                        </View>
                        <View className='bg-gray-200 mr-10 w-1/3 flex flex-row justify-center items-center rounded-xl'>
                        <Button title="Register" color="black" />
                        <AntDesign name="arrowright" size={24} color="black" />
                        </View>
                    </View>
                </View>

            </View>
           
        </View>
    )
}

export default Home