import { View, Text } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

const TabsLayout = () => {
  return (
    <Tabs>
      <Tabs.Screen name="index" options={{
        title: 'Reservation',
        headerShown: false,
        tabBarIcon: () => <FontAwesome5 name="parking" size={24} color="white" />,
        tabBarBackground: () => <View className='bg-black h-full' />
      }} />
      <Tabs.Screen name='settings/Settings' options={{ headerShown: false, title: 'Settings', tabBarIcon: () => <AntDesign name="setting" size={24} color="white" />, tabBarBackground: () => <View className='bg-black h-full'  /> }} />
      <Tabs.Screen name='maps/Maps' options={{ headerShown: false, title: 'Maps', tabBarIcon: () => <MaterialCommunityIcons name="google-maps" size={24} color="white" />, tabBarBackground: () => <View className='bg-black h-full' /> }} />
      <Tabs.Screen name='pages/FeedbackPage' options={{ headerShown: false, title: 'Feedback', tabBarIcon: () => <FontAwesome5 name="comment-dots" size={24} color="white" />, tabBarBackground: () => <View className='bg-black h-full' /> }} />
    </Tabs>
  )
}

export default TabsLayout