// src/pages/ReservationDetailsPage.tsx
import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import { RootStackParamList } from "../navigation/types";
import { RouteProp } from "@react-navigation/native";

type ReservationDetailsRouteProp = RouteProp<
  RootStackParamList,
  "ReservationDetails"
>;

const ReservationDetailsPage = () => {
  const handleReserve = () => {};

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Reserve</Text>
      <TextInput style={styles.input} placeholder="Name" />
      <TextInput style={styles.input} placeholder="Phone Number" />
      <TextInput style={styles.input} placeholder="Place number" />
      <TextInput style={styles.input} placeholder="Date" />
      <TextInput style={styles.input} placeholder="Start Time" />
      <TextInput style={styles.input} placeholder="End Time" />
      <TouchableOpacity style={styles.button} onPress={handleReserve}>
        <Text style={styles.buttonText}>Reserve</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    width: "80%",
    backgroundColor: "#fff",
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginBottom: 10,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  button: {
    backgroundColor: "#ff3c15",
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
    width: "80%",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default ReservationDetailsPage;
