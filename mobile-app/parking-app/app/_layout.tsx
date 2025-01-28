import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'
import { MyContextProvider } from '../Context/MyContext'

const RootLayout = () => {
  return (
  <MyContextProvider>
    <Stack>
      <Stack.Screen name='index' options={{ headerShown: false }} />
      <Stack.Screen name='pages/RegisterPage' options={{ headerShown: false  }} />
      <Stack.Screen name="pages/ServicesPage" options={{ headerShown: false }} />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>
    </MyContextProvider>
  )
}

export default RootLayout
