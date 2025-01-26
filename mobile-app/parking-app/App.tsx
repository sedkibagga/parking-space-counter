import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import './global.css';
import Home from './component/Home';
import Services from './component/Services';
export default function App() {
  return (
    <View className='flex-1 '>
      <Services />
      <Text>hi new branch</Text>
    </View>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
