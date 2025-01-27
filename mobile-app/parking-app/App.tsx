import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import './global.css';
import Home from './component/Home';
import Services from './component/Services';
import Login from './component/Login';
import { MyContextProvider } from './Context/MyContext';
export default function App() {
  return (
    <MyContextProvider>
    <View className='flex-1 '>
      <Login />
    </View>
    </MyContextProvider>
  );
}


