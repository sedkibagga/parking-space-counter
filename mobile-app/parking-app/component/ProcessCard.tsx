import { View, Text } from 'react-native'
import React from 'react'
import '../global.css'
import { ProcessCardProps } from '../Types/DataTypes'

const ProcessCard = (processType:ProcessCardProps) => { 
  return (
    <View className='flex flex-col bg-red-600 rounded-xl p-5 w-1/2 mr-2 h-auto mt-3 items-center justify-center'>
      <View className='flex flex-row items-center justify-center'>
        <View className='bg-black rounded-full w-10 h-10 flex flex-row justify-center items-center'>
          <Text className='text-white'>{processType.rank}</Text>
        </View>
        <Text className='text-white ml-2'>{processType.title}</Text>
      </View>
      <View className='flex flex-row items-center justify-center mt-5'>
        <Text className='text-white'>
            {processType.description}
        </Text>
      </View>
    </View>
  )
}

export default ProcessCard