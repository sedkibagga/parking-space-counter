import { View, Text, Image, TextInput, Button } from 'react-native';
import React, { useState } from 'react';
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import FontAwesome5 from '@expo/vector-icons/build/FontAwesome5';
import { loginDto } from '../Apis/DataParam/dataParam';
import apiService from '../Apis/Services/apisService';
import { useMyContext } from '../Context/MyContext';
const Login = () => {
    const { setUser } = useMyContext();
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [secureText, setSecureText] = useState<boolean>(true);

    const handleLogin = async () => {
        try {
            const loginParam: loginDto = { email: email, password: password };
            console.log("loginParam: ", loginParam);
            const response = await apiService.login(loginParam, setUser);
            console.log("Response from API:", response);
        } catch (error: any) {
            console.log("error:", error.message);
            alert(error.message);
        }
    }
    return (
        <View className="flex flex-col bg-black h-full">

            <View className="flex flex-col items-center justify-center h-1/4 mt-10">
                <Image
                    source={require('../assets/about1.jpg')}
                    className="h-full w-full"
                />
            </View>


            <View className="flex flex-col items-center justify-center mt-5">
                <Text className="font-bold text-orange-600 text-3xl">
                    CAR PARK
                </Text>
                <AntDesign name="car" size={30} color="white" className="mt-3" />
            </View>


            <View className="flex flex-col mt-10">

                <TextInput
                    placeholderTextColor="gray"
                    placeholder="Email"
                    className="bg-white mb-5 h-12 px-4 ml-5 mr-5 rounded-md"
                    onChange={(e) => setEmail(e.nativeEvent.text)}
                />


                <View className="flex flex-row items-center bg-white h-12 px-4 mx-5 rounded-md">
                    <TextInput
                        placeholderTextColor="gray"
                        placeholder="Password"
                        secureTextEntry={secureText}
                        className="flex-1 text-black"
                        onChange={(e) => setPassword(e.nativeEvent.text)}
                    />

                    <FontAwesome
                        name={secureText ? "eye-slash" : "eye"}
                        size={24}
                        color="black"
                        onPress={() => setSecureText(!secureText)}
                    />
                </View>

                <View className='flex flex-row mt-3 justify-end items-end mx-5'>
                    <Text className='text-white text-bold text-xl'> Forget your password ?</Text>
                </View>

                <View className='flex flex-row items-center justify-center mt-10 bg-orange-600 mx-5 rounded-md '>
                    <Button title='Login' color='black' onPress={handleLogin}></Button>
                </View>
                <View className="flex flex-row justify-between items-center mt-5 mx-5">
                    <Text className="text-white flex-1 text-center">------------------</Text>
                    <Text className="text-white flex-1 text-center">or connect using</Text>
                    <Text className="text-white flex-1 text-center">------------------</Text>
                </View>

                <View className="flex flex-row  mx-5 mt-10 items-center justify-center p-2">
                    <View className='mr-5'>
                        <FontAwesome5 name="facebook" size={40} color="white" />
                    </View>
                    <View className='mr-5'>
                        <FontAwesome5 name="google" size={40} color="white" />
                    </View>
                    <View>
                        <FontAwesome5 name="github" size={40} color="white" />
                    </View>
                </View>
                <View className='flex flex-row justify-center items-center mt-5'>
                    <Text className='text text-white mr-5'>
                        Don't have an account ?
                    </Text>
                    <Text className='text text-white  text-bold'>
                        Sign Up
                    </Text>
                </View>
            </View>
        </View>
    );
};

export default Login;
