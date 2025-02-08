import { View, Text } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'

const TabsLayout = () => {
  return (
    <Tabs>
      <Tabs.Screen name="index" options={{
        title: 'Reservation',
        headerShown: false,
        tabBarBackground: () => <View className='bg-black h-full' />
      }} />
      <Tabs.Screen name='settings/Settings' options={{ headerShown: false, title: 'Settings', tabBarBackground: () => <View className='bg-black h-full' /> }} />
      <Tabs.Screen name='maps/Maps' options={{ headerShown: false, title: 'Maps', tabBarBackground: () => <View className='bg-black h-full' /> }} />
      <Tabs.Screen name='pages/FeedbackPage' options={{ headerShown: false, title: 'Feedback', tabBarBackground: () => <View className='bg-black h-full' /> }} />
    </Tabs>
  )
}

export default TabsLayout