import { View, Text, Modal, Button, TextInput } from 'react-native';
import React, { useState } from 'react';
import '../global.css';
import { useMyContext } from '../Context/MyContext';
import { userSettingsResponse } from '../Apis/DataResponse/dataResponse';
import { updateUserCarInformationDto } from '../Apis/DataParam/dataParam';
import apiService from '../Apis/Services/apisService';

type UpdateUserInformationModalProps = {
    visible: boolean;
    setVisible: (visible: boolean) => void;
    title: string;
    content: string;
};

const UpdateUserInformationModal = ({
    visible,
    setVisible,
    title,
    content,
}: UpdateUserInformationModalProps) => {

    const [textChanges, setTextChanges] = useState<string>("");
    const { userSettings, user } = useMyContext();
    console.log("userSettings in modal :", userSettings);

    const updateUserCarInformationDto: updateUserCarInformationDto = {
        registrationNumber: userSettings.registrationNumber,
        model: userSettings.model,
        color: userSettings.color,
        imageUri: userSettings.imageUri
    };

    const handleConfirm = async () => {
        try {
            if (user?.token && user?.id) {
                
                if (title === "Edit Color" && textChanges) {
                    updateUserCarInformationDto.color = textChanges;
                }
    
                if (title === "Edit RegistrationNumber" && textChanges) {
                    updateUserCarInformationDto.registrationNumber = textChanges;
                }

                if (title === "Edit Model" && textChanges) {
                    updateUserCarInformationDto.model = textChanges;
                }

                await apiService.updateUserCarInformation(user.token, updateUserCarInformationDto, user.id);
                 setTextChanges("");
                setVisible(false);
            }
        } catch (error: any) {
            alert(error);
            console.warn("error:", error);
        }
    };

    return (
        <Modal visible={visible} animationType="slide" transparent={true}>
            <View className="flex-1 justify-center items-center bg-black/50">
                <View className="w-96 p-8 bg-white rounded-lg">
                    <Text className="text-2xl font-bold mb-4">{title}</Text>
                    <Text className="mb-4">{content}</Text>
                    <TextInput
                        value={textChanges}
                        placeholder={`Update this ${content}`}
                        className="border border-black p-3 rounded-md mb-4"
                        onChange={(e) => setTextChanges(e.nativeEvent.text)}
                    />
                    <View className="flex flex-row justify-center items-center p-2 mt-5">
                        <Button title="Close" onPress={() => setVisible(false)} />
                        <Button title="Confirm" onPress={handleConfirm} />
                    </View>
                </View>
            </View>
        </Modal>
    );
};

export default UpdateUserInformationModal;
