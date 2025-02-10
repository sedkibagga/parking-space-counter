import { View, Text, ScrollView, Image, Pressable } from 'react-native'
import React from 'react'
import '../global.css'
import AntDesign from '@expo/vector-icons/AntDesign'
import ProcessCard from './ProcessCard'
import { ProcessCardProps } from '../Types/DataTypes'
import { StyleSheet } from 'react-native'
import { router } from 'expo-router'
const Services = () => {
    const processTypes: ProcessCardProps[] = [
        {
            rank: 1,
            title: 'Reliable',
            description: 'Our services are crafted to save you time and effort, ensuring you focus on what truly matters.',
        },
        {
            rank: 2,
            title: 'Reserve Place',
            description: 'Choose a convenient spot that works best for you. Reserve it effortlessly and secure your preferred location to ensure you have the perfect space for your needs, all with ease.',
        },
        {
            rank: 3,
            title: 'Time To Pay',
            description: 'Finish the process by completing your payment. Ensure everything is finalized and secure your reservation or purchase with a simple, smooth transaction to enjoy the service.',
        }
    ]

    const chunkArray = (arr: ProcessCardProps[], size: number) => {
        const chunks: ProcessCardProps[][] = []
        for (let i = 0; i < arr.length; i += size) {
            chunks.push(arr.slice(i, i + size))
        }
        return chunks
    }

    const processChunks = chunkArray(processTypes, 2)
     
    
    return (
        <ScrollView className="bg-black h-full" contentContainerStyle={styles.contentContainer}>
            
            <View className='flex flex-row items-center justify-center mt-20'>
                <Text className='text font-bold text-white text-5xl'>Services</Text>
            </View>
            <View className='bg-black flex flex-row h-1/3 mt-10'>
                <View className='flex flex-col w-1/2'>
                    <Text className='text-red-500 font-bold text-3xl'>About Us</Text>
                    <Text className='text-white text-lg'>Reserve a spot to park your car hassle-free</Text>
                    <Text className='text-white text-xs mt-10'>
                        At Car Park, we make parking easy and stress-free. Our platform lets you reserve secure, convenient parking spots wherever you go. Focus on your day while we handle your parking.
                    </Text>
                    <View className="flex flex-row justify-between mt-5">
                        <View className="items-start">
                            <View className='flex flex-row items-center'>
                                <AntDesign name="checkcircle" size={24} color="red" />
                                <Text className='text-white text-xs ml-2'>Reliable</Text>
                            </View>
                        </View>
                        <View className="items-end">
                            <View className='flex flex-row items-center'>
                                <AntDesign className='mr-1' name="checkcircle" size={24} color="red" />
                                <Text className='text-white text-xs mr-2'>Quiet</Text>
                            </View>
                        </View>
                    </View>
                </View>
                <View className='flex flex-col items-center justify-center bg-green-500 w-1/2'>
                    <Image
                        source={require('../assets/about1.jpg')}
                        className='h-full w-full'
                    />
                </View>
            </View>
            <View className='flex flex-col bg-white'>
                <View className='flex flex-row justify-between h-20 mt-5'>
                    <View className='flex flex-row items-center'>
                        <Text className='text-bold text-4xl text-black ml-2'>10</Text>
                        <Text className='text-black text-lg ml-3'>Years In Experience</Text>
                    </View>
                    <View className='flex flex-row items-center'>
                        <Text className='text-bold text-4xl text-black ml-2'>2,000</Text>
                        <Text className='text-black text-lg ml-3 mr-1'>Customers</Text>
                    </View>
                </View>
                <View className='flex flex-row justify-between h-20 mt-5'>
                    <View className='flex flex-row items-center'>
                        <Text className='text-bold text-4xl text-black ml-2'>10</Text>
                        <Text className='text-black text-lg ml-3'>Number of Cities</Text>
                    </View>
                    <View className='flex flex-row items-center'>
                        <Text className='text-bold text-4xl text-black ml-2'>90</Text>
                        <Text className='text-black text-lg ml-3 mr-1'>Satisfaction</Text>
                    </View>
                </View>
            </View>
            <View className='flex flex-rox items-center justify-center mt-5'>
                <Text className='text-white text-bold text-3xl'>Our Process</Text>
            </View>
            {processChunks.map((chunk, rowIndex) => (
                <View key={rowIndex} className='flex flex-row justify-between'>
                    {chunk.map((processType, index) => (
                        <ProcessCard
                            key={index}
                            rank={processType.rank}
                            title={processType.title}
                            description={processType.description}
                        />
                    ))}
                </View>
            ))} 
           
            {/* <View className='flex flex-col items-center justify-center bg-green-500'>
                <Image
                    source={require('../assets/Capture2.png')}
                    className='h-full w-full'
                />
            </View> */}
        </ScrollView>
    )
}

export default Services

const styles = StyleSheet.create({
    contentContainer: {
      paddingVertical: 10
    }
  })