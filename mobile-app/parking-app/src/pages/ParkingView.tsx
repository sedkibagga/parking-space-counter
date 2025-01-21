// src/pages/ParkingPage.tsx
import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, ScrollView } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack'; // Import the correct type
import { RootStackParamList } from '../navigation/types'; // Import your navigation types
import {
    createStaticNavigation,
    useNavigation,
  } from '@react-navigation/native';


const ParkingPage = () => {
    const navigation = useNavigation();
    const handleReserve = () => {
         navigation.navigate('ReservationForm'as never);
      };            

  const spots = [
    { id: '1', name: 'Spot 1', imageUrl: 'https://www.greenslips.com.au/app/uploads/parking.jpg' },
    { id: '2', name: 'Spot 2', imageUrl: 'https://www.greenslips.com.au/app/uploads/parking.jpg' },
    { id: '3', name: 'Spot 3', imageUrl: 'https://www.greenslips.com.au/app/uploads/parking.jpg' },
    { id: '4', name: 'Spot 4', imageUrl: 'https://www.greenslips.com.au/app/uploads/parking.jpg' },
    { id: '5', name: 'Spot 5', imageUrl: 'https://www.greenslips.com.au/app/uploads/parking.jpg' },
    { id: '6', name: 'Spot 6', imageUrl: 'https://www.greenslips.com.au/app/uploads/parking.jpg' },
    { id: '7', name: 'Spot 7', imageUrl: 'https://www.greenslips.com.au/app/uploads/parking.jpg' },
    { id: '8', name: 'Spot 8', imageUrl: 'https://www.greenslips.com.au/app/uploads/parking.jpg' },
  ];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {spots.map((spot) => (
        <View key={spot.id} style={styles.card}>
          <Image source={{ uri: spot.imageUrl }} style={styles.image} />
          <Text style={styles.spotName}>{spot.name}</Text>
          <TouchableOpacity
            style={styles.reserveButton}
            onPress={handleReserve}
          >
            <Text style={styles.reserveButtonText}>Reserve</Text>
          </TouchableOpacity>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingTop: 20,
    backgroundColor: '#000', // Dark background color
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 20,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  image: {
    width: '100%',
    height: 150,
    borderRadius: 8,
    marginBottom: 10,
  },
  spotName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  reserveButton: {
    backgroundColor: '#ff3c15',
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  reserveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ParkingPage;
