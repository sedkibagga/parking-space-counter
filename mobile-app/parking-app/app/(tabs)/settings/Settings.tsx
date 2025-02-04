import { View, Text, Image, Dimensions, TextInput, Button, ScrollView, KeyboardAvoidingView, Platform, Modal, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import '../../../global.css';
import AntDesign from '@expo/vector-icons/AntDesign';
import * as ImagePicker from 'expo-image-picker';
import { useMyContext } from '../../../Context/MyContext';
import apiService from '../../../Apis/Services/apisService';
import { getUserInformationResponse, updateUserCarInformationResponse } from '../../../Apis/DataResponse/dataResponse';
import { updateUserCarInformationDto } from '../../../Apis/DataParam/dataParam';
import UpdateUserInformationModal from '../../../component/UpdateUserInformationModal';
import axios from 'axios';
interface QRCodeResponse {
  qrCode: string | null;
  loading: boolean;
}
const Settings = () => {
  const { width, height } = Dimensions.get('window');
  const { user } = useMyContext();
  const iconSize = width * 0.08;
  const [userCarInformation, setUserCarInformation] = useState<getUserInformationResponse>({ id: 0, registrationNumber: "", model: "", color: "", imageUri: '', userId: 0 });
  const [image, setImage] = useState<string | null>(null);
  const [buttonSelected, setButtonSelected] = useState<number>(1);
  const [qrCodeObj, setQrCodeObj] = useState<QRCodeResponse>({ qrCode: null, loading: true });
  const [showQrCodeModal, setShowQrCodeModal] = useState<boolean>(false);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [modalContent, setModalContent] = useState<{ title: string; content: string }>({
    title: "",
    content: "",
  });
  const { setUserSettings,userSettings } = useMyContext();

  //  console.warn("userCarInformation:", userCarInformation);
  useEffect(() => {
    if (user?.token && user?.id) {
      const fetchUserCarInformation = async () => {
        try {
          const res = await apiService.getUserCarInformation(user.token, user.id);
          setUserCarInformation(res);
          setImage(res.imageUri);
          const userInfo = await apiService.getUser(user.token,user.id);
          setUserSettings({ firstName: userInfo.firstName, lastName: userInfo.lastName, email: userInfo.email, phoneNumber: userInfo.phoneNumber, color: res.color, model: res.model, registrationNumber: res.registrationNumber, imageUri: res.imageUri });
        } catch (error: any) {
          console.warn(error);
        }
      };

      fetchUserCarInformation();
    }
  }, [user, modalVisible])
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


      if (user?.token && user?.id) {
        const res = await apiService.updateUserCarInformation(user.token, updatedUserCarInformation, user.id);
        console.warn("updatedUserCarInformation:", res);
      }
    } catch (error: any) {
      console.warn("Error:", error);
    }
  };

  const handleLongClickOnInformation = (field: string) => {
    setModalContent({
      title: `Edit ${field}`,
      content: `You can edit the ${field} information here.`,
    });
    setModalVisible(true);
  };

  const onQrCodeButtonClick = async () => {
    try {
      if (!user?.token) {
        throw new Error("There is no token");
      }
      setShowQrCodeModal(true);
      const response = await apiService.fetchQrCode(user.token, "vamos");
      const base64Image = arrayBufferToBase64(response);
      console.log("base64Image:", base64Image);
      setQrCodeObj({ qrCode: `data:image/png;base64,${base64Image}`, loading: false });
    } catch (error: any) {
      console.error("Error fetching QR code:", error);
      setQrCodeObj({ qrCode: null, loading: false });
      alert("Failed to fetch QR code. Please try again.");
    }
  };

  const arrayBufferToBase64 = (buffer: ArrayBuffer): string => {
    const binary = [];
    const bytes = new Uint8Array(buffer);
    for (let i = 0; i < bytes.byteLength; i++) {
      binary.push(String.fromCharCode(bytes[i]));
    }
    return btoa(binary.join(''));
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
                value={userSettings?.firstName}
                editable={false}

              />
              <AntDesign name="edit" size={24} color="black" onPress={() => { handleLongClickOnInformation("FirstName") }} />
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
                value={userSettings?.lastName}
                editable={false}
              />
              <AntDesign name="edit" size={24} color="black" onPress={() => { handleLongClickOnInformation("LastName") }} />
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
                value={userSettings?.email}
                editable={false}
              />
              <AntDesign name="edit" size={24} color="black" onPress={() => { handleLongClickOnInformation("Email") }} />
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
                value={userSettings?.phoneNumber}
                editable={false}
              />
              <AntDesign name="edit" size={24} color="black" onPress={() => { handleLongClickOnInformation("PhoneNumber") }} />
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
                editable={false}
                secureTextEntry
              />
              <AntDesign name="edit" size={24} color="black" onPress={() => { handleLongClickOnInformation("Password") }} />
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
                value={userCarInformation.color}
                editable={false}
              />
              <AntDesign name="edit" size={24} color="black" onPress={() => { handleLongClickOnInformation("Color") }} />
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
                value={userCarInformation.model}
                editable={false}
              />
              <AntDesign name="edit" size={24} color="black" onPress={() => { handleLongClickOnInformation("Model") }} />
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
                value={userCarInformation.registrationNumber}
                editable={false}
              />
              <AntDesign name="edit" size={24} color="black" onPress={() => { handleLongClickOnInformation("RegistrationNumber") }} />
            </View>

            <View className='flex flex-row justify-center items-center mt-5 mb-4'>
              <Button title='show qrcode' onPress={onQrCodeButtonClick} />
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
        <UpdateUserInformationModal
          visible={modalVisible}
          setVisible={setModalVisible}
          title={modalContent.title}
          content={modalContent.content}
        />

        <Modal visible={showQrCodeModal} transparent={true} animationType="fade">
          <View className="flex-1 justify-center items-center bg-black/50">
            <View className="bg-white p-5 rounded-lg w-4/5 justify-center items-center">
              {qrCodeObj.loading ? (
                <ActivityIndicator size="large" color="#0000ff" />
              ) : qrCodeObj.qrCode ? (
                <Image source={{ uri: qrCodeObj.qrCode }} className="w-60 h-60" />
              ) : (
                <Text className="text-xl text-red-500">Failed to load QR code.</Text>
              )}
              <Button title="Close" onPress={() => setShowQrCodeModal(false)} />
            </View>
          </View>
        </Modal>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Settings;