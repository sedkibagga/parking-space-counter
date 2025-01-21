import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginPage from './src/pages/LoginPage';
import ParkingView from './src/pages/ParkingView';
import ReservationForm from './src/pages/ReservationForm';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer >
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginPage} />
        <Stack.Screen name="Parking" component={ParkingView} />
        <Stack.Screen name="ReservationForm" component={ReservationForm} />
      </Stack.Navigator>
    </NavigationContainer>

  
  );
}
