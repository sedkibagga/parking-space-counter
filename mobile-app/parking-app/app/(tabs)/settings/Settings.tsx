import { View, Text, Image, Dimensions, TextInput, Button, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import React, { useState } from 'react';
import '../../../global.css';
import AntDesign from '@expo/vector-icons/AntDesign';
import * as ImagePicker from 'expo-image-picker';
import { useMyContext } from '../../../Context/MyContext';

const Settings = () => {
  const { width, height } = Dimensions.get('window');
  const { user } = useMyContext();
  const iconSize = width * 0.08;
  const [image, setImage] = useState<string | null>(null); 

  const onAddIconClick = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert('Sorry, we need camera roll permissions to make this work!');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images, 
      allowsEditing: true, 
      aspect: [1, 1],   
      quality: 1, 
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri); 
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
      <ScrollView className='bg-black h-full flex flex-col'>
        <View className='flex flex-row justify-center items-center h-1/5 mt-20'>
          <View className='h-36 w-36  rounded-full flex justify-center items-center relative'>
            <Image
              source={image ? { uri: image } : require('../../../assets/avatar.jpg')}
              className="h-full w-full rounded-full"
            />
            
            <View className="absolute bottom-2 right-2 bg-white rounded-full">
              <AntDesign name="pluscircle" size={iconSize} color="blue" onPress={onAddIconClick} />
            </View>
          </View>
        </View>

       
        <View className='flex flex-row justify-start items-start mt-2 p-2'>
          <Text className='text-white text-2xl font-bold ml-5'>
            FirstName
          </Text>
        </View>
        <View className="flex flex-row items-center bg-white h-12 px-4 mx-5 rounded-md">
          <TextInput
            placeholderTextColor="gray"
            placeholder="FirstName"
            className="flex-1 text-black"
            value={user?.firstName}
          />
          <AntDesign name="edit" size={24} color="black" />
        </View>

        
        <View className='flex flex-row justify-start items-start mt-2 p-2'>
          <Text className='text-white text-2xl font-bold ml-5'>
            LastName
          </Text>
        </View>
        <View className="flex flex-row items-center bg-white h-12 px-4 mx-5 rounded-md">
          <TextInput
            placeholderTextColor="gray"
            placeholder="LastName"
            className="flex-1 text-black"
            value={user?.lastName}
          />
          <AntDesign name="edit" size={24} color="black" />
        </View>

        
        <View className='flex flex-row justify-start items-start mt-2 p-2'>
          <Text className='text-white text-2xl font-bold ml-5'>
            Email
          </Text>
        </View>
        <View className="flex flex-row items-center bg-white h-12 px-4 mx-5 rounded-md">
          <TextInput
            placeholderTextColor="gray"
            placeholder="Email"
            className="flex-1 text-black"
            value={user?.email}
          />
          <AntDesign name="edit" size={24} color="black" />
        </View>

        
        <View className='flex flex-row justify-start items-start mt-2 p-2'>
          <Text className='text-white text-2xl font-bold ml-5'>
            Phone Number
          </Text>
        </View>
        <View className="flex flex-row items-center bg-white h-12 px-4 mx-5 rounded-md">
          <TextInput
            placeholderTextColor="gray"
            placeholder="Phone Number"
            className="flex-1 text-black"
            value={user?.tel}
          />
          <AntDesign name="edit" size={24} color="black" />
        </View>

       
        <View className='flex flex-row justify-start items-start mt-2 p-2'>
          <Text className='text-white text-2xl font-bold ml-5'>
            Password
          </Text>
        </View>
        <View className="flex flex-row items-center bg-white h-12 px-4 mx-5 rounded-md">
          <TextInput
            placeholderTextColor="gray"
            placeholder="Password"
            className="flex-1 text-black"
            value='....................'
          />
          <AntDesign name="edit" size={24} color="black" />
        </View>

       
        <View className='flex flex-col justify-between items-center mt-10 p-2'>
          <Button title='Save Changes' onPress={() => {}} />
          <Button title='Logout' onPress={() => {}} />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Settings;