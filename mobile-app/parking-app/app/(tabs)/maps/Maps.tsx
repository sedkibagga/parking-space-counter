import React, { useEffect, useState, useCallback, useRef } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import axios from 'axios';
import '../../../global.css';

const Maps = () => {
    const [coordinates, setCoordinates] = useState<{ name: string; latitude: number; longitude: number }[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const cache = useRef(new Map<string, { latitude: number; longitude: number }>());

    const names = [
        'Tunis', 'Sfax', 'Sousse', 'Kairouan', 'Bizerte', 
        'Gabès', 'Ariana', 'Gafsa', 'Monastir', 'Ben Arous'
    ];

    const getCoordinates = useCallback(async (locationName: string) => {
        if (cache.current.has(locationName.toLowerCase())) {
            return cache.current.get(locationName.toLowerCase())!;
        }

        const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(locationName)},Tunisia&format=json`;

        try {
            const response = await axios.get(url);
            console.log(response.data);
            if (response.data.length > 0) {
                const { lat, lon } = response.data[0];
                const newCoordinates = { latitude: parseFloat(lat), longitude: parseFloat(lon) };
                cache.current.set(locationName.toLowerCase(), newCoordinates);
                return newCoordinates;
            } else {
                throw new Error('Location not found');
            }
        } catch (err) {
            throw new Error('Error fetching location');
        }
    }, []);

    const fetchAllCoordinates = async () => {
        setLoading(true);
        const coords: { name: string; latitude: number; longitude: number }[] = [];

        for (const name of names) {
            try {
                const coordsForName = await getCoordinates(name);
                coords.push({ name, ...coordsForName });
            } catch (error: any) {
                setError(error.message);
            }
        }

        setCoordinates(coords);
        setLoading(false);
    };

    useEffect(() => {
        fetchAllCoordinates();
    }, []); 

    if (loading) {
        return (
            <View style={styles.container}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    if (error) {
        return (
            <View style={styles.container}>
                <Text>{error}</Text>
            </View>
        );
    }

    if (coordinates.length === 0) {
        return (
            <View style={styles.container}>
                <Text>No coordinates available</Text>
            </View>
        );
    }

    const initialRegion = {
        latitude: coordinates[0].latitude,
        longitude: coordinates[0].longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    };

    return (
        <View className='bg-black h-full flex-1'>
            <MapView
                style={styles.map}
                region={initialRegion}
            >
                {coordinates.map(({ name, latitude, longitude }, index) => (
                    <Marker
                        key={`${name}-${index}`}
                        coordinate={{ latitude, longitude }}
                        title={name}
                    />
                ))}
            </MapView>
        </View>
    );
};

export default Maps;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    map: {
        width: '100%',
        height: '100%',
    },
});