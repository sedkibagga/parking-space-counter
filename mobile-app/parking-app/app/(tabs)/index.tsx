import { View, Text, Pressable } from 'react-native'
import React from 'react'
import { Link, router } from 'expo-router'
import Reservation from '../../component/Reservation'
const index = () => {
  return (
    <View>
      <Reservation/>
    </View>
  )
}

export default index