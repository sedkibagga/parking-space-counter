import { View, Text, Image, Dimensions, TextInput, Button, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import React, { useEffect, useState } from 'react';
import '../../../global.css';
import AntDesign from '@expo/vector-icons/AntDesign';
import * as ImagePicker from 'expo-image-picker';
import { useMyContext } from '../../../Context/MyContext';
import apiService from '../../../Apis/Services/apisService';
import { getUserInformationResponse, updateUserCarInformationResponse } from '../../../Apis/DataResponse/dataResponse';
import { updateUserCarInformationDto } from '../../../Apis/DataParam/dataParam';

const Settings = () => {
  const { width, height } = Dimensions.get('window');
  const { user } = useMyContext();
  const iconSize = width * 0.08;
  const [userCarInformation, setUserCarInformation] = useState<getUserInformationResponse>({ id: 0, registrationNumber: "", model: "", color: "", imageUri: '', userId: 0 });
  const [image, setImage] = useState<string | null>(null);
  const [buttonSelected, setButtonSelected] = useState<number>(1);
  // console.warn("userCarInformation:", userCarInformation);
  useEffect(() => {
    if (user?.token && user?.id) {
      const fetchUserCarInformation = async () => {
        try {
          const res = await apiService.getUserCarInformation(user.token, user.id);
          setUserCarInformation(res);
          setImage(res.imageUri);

        } catch (error: any) {
          console.warn(error);
        }
      };

      fetchUserCarInformation();
    }
  }, [user])
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
      console.warn("result.assets[0].uri:", result.assets[0].uri);
      setImage(result.assets[0].uri);


      userCarInformation.imageUri = result.assets[0].uri;
      console.warn("userCarInformation.imageUri:", userCarInformation.imageUri)
    }
  };

  const handleSaveChangesClick = async () => {
    try {
      const updatedUserCarInformation: updateUserCarInformationDto = {
        registrationNumber: userCarInformation?.registrationNumber ?? '',
        model: userCarInformation?.model ?? '',
        color: userCarInformation?.color ?? '',
        imageUri: userCarInformation?.imageUri ?? '',
      };

      console.warn("Payload:", updatedUserCarInformation);
      console.warn("Token:", user?.token);
      console.warn("User ID:", user?.id);

      if (user?.token && user?.id) {
        const res = await apiService.updateUserCarInformation(user.token, updatedUserCarInformation, user.id);
        console.warn("Response:", res);
      }
    } catch (error: any) {
      console.warn("Error:", error);
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

        {buttonSelected === 1 && (
          <View>
            <View className='flex flex-row justify-start items-start mt-1 '>
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
          </View>
        )}

        {buttonSelected === 2 && (
          <View >
            <View className='flex flex-row justify-start items-start mt-5 '>
              <Text className='text-white text-2xl font-bold ml-5'>
                Color
              </Text>
            </View>
            <View className="flex flex-row items-center bg-white h-12 px-4 mx-5 rounded-md">
              <TextInput
                placeholderTextColor="gray"
                placeholder="Color"
                className="flex-1 text-black"
                value={user?.firstName}
              />
              <AntDesign name="edit" size={24} color="black" />
            </View>

            <View className='flex flex-row justify-start items-start mt-2 p-2'>
              <Text className='text-white text-2xl font-bold ml-5'>
                Model
              </Text>
            </View>
            <View className="flex flex-row items-center bg-white h-12 px-4 mx-5 rounded-md">
              <TextInput
                placeholderTextColor="gray"
                placeholder="Model"
                className="flex-1 text-black"
                value={user?.lastName}
              />
              <AntDesign name="edit" size={24} color="black" />
            </View>

            <View className='flex flex-row justify-start items-start mt-2 p-2'>
              <Text className='text-white text-2xl font-bold ml-5'>
                RegistrationNumber
              </Text>
            </View>
            <View className="flex flex-row items-center bg-white h-12 px-4 mx-5 rounded-md">
              <TextInput
                placeholderTextColor="gray"
                placeholder="RegistrationNumber"
                className="flex-1 text-black"
                value={user?.email}
              />
              <AntDesign name="edit" size={24} color="black" />
            </View>




          </View>
        )}

        <View className=' flex flex-row justify-center items-center mt-5 '>
          <View className={`mr-5 w-1/5 rounded-lg ${buttonSelected === 1 ? 'bg-blue-600' : 'bg-white'}`}>
            <Button title='1' color="black" onPress={() => { setButtonSelected(1) }} />
          </View>
          <View className={`w-1/5 rounded-lg ${buttonSelected === 2 ? 'bg-blue-600' : 'bg-white'}`}>
            <Button title='2' color="black" onPress={() => { setButtonSelected(2) }} />
          </View>

        </View>

        <View className='flex flex-col justify-between items-center mt-2 p-2'>
          <Button title='Save Changes' onPress={handleSaveChangesClick} />
          <Button title='Logout' onPress={() => { }} />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Settings;