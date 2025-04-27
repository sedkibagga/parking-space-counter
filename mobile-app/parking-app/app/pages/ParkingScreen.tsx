// src/screens/ParkingScreen.tsx
import React, { useState, useEffect } from 'react';
import { View, Text, Button, FlatList, StyleSheet } from 'react-native';
import {
  initReservationService,
  cleanupReservationService,
  createReservation,
  getOccupiedZones,
  getFreeZones,
  
} from '../../Apis/Services/reservationService'
  
import {ZoneStatus,ReservationResponse,} from '../../Apis/DataResponse/dataResponse';
import { CreateReservationDto } from '../../Apis/DataParam/dataParam';


interface ParkingScreenProps {
  token: string;
}

const ParkingScreen: React.FC<ParkingScreenProps> = ({ token }) => {
  
  const [zones, setZones] = useState<ZoneStatus[]>([]);
  const [freeZones, setFreeZones] = useState<ZoneStatus[]>([]);
  const [occupiedZones, setOccupiedZones] = useState<ZoneStatus[]>([]);
  const [reservationResult, setReservationResult] = useState<ReservationResponse | null>(null);

  useEffect(() => {
    const callbacks = {
      onZonesUpdate: (updatedZones: ZoneStatus[]) => setZones(updatedZones),
      onReservationResponse: (result: ReservationResponse) => setReservationResult(result),
      onOccupiedZones: (zones: ZoneStatus[]) => setOccupiedZones(zones),
      onFreeZones: (zones: ZoneStatus[]) => setFreeZones(zones),
      onConnected: () => {   
        console.log('WebSocket fully connected, now fetching zones');
        getFreeZones();
        getOccupiedZones();
        getFreeZones();
        getOccupiedZones();
      },
    };

    initReservationService(token, callbacks);
    
    
    console.log('Fetching free and occupied zones...',freeZones);
    console.log('Fetching free and occupied zones...',occupiedZones);

    return () => {
      cleanupReservationService();
    };
  }, [token]);

  const handleReserve = (zoneId: number): void => {
    const reservation: CreateReservationDto = {
      reservation_Time: new Date().toISOString(),
      reservation_Duration: '2', // 2 hours
    };
    createReservation(zoneId, reservation);
  };

  const renderZoneItem = ({ item }: { item: ZoneStatus }) => (
    <View style={styles.zoneItem}>
      <Text>Zone {item.zoneId}: {item.status}</Text>
      {item.status === 'free' && (
        <Button 
          title="Reserve" 
          onPress={() => handleReserve(item.zoneId)} 
        />
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Parking Zones</Text>
      
      <Text style={styles.sectionHeader}>Free Zones</Text>
      <FlatList
        data={freeZones}
        renderItem={renderZoneItem}
        keyExtractor={(item) => item.zoneId.toString()}
      />
      
      <Text style={styles.sectionHeader}>Occupied Zones</Text>
      <FlatList
        data={occupiedZones}
        renderItem={renderZoneItem}
        keyExtractor={(item) => item.zoneId.toString()}
      />
      
      {reservationResult && (
        <View style={styles.reservationResult}>
          <Text>Reservation Successful:</Text>
          <Text>Zone: {reservationResult.zoneId}</Text>
          <Text>Total: ${reservationResult.total_Amount}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 5,
  },
  zoneItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  reservationResult: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#e0f7fa',
    borderRadius: 5,
  },
});

export default ParkingScreen;