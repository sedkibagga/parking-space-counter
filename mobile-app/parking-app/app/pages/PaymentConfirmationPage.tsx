import { View, Text, Image, ActivityIndicator, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import '../../global.css';
import { useMyContext } from '../../Context/MyContext';
import apiService from '../../Apis/Services/apisService';

interface QRCodeResponse {
    qrCode: string | null;
    loading: boolean;
}

const PaymentConfirmationPage = () => {
    const [qrCodeObj, setQrCodeObj] = useState<QRCodeResponse>({ qrCode: null, loading: true });
    const { facture, user } = useMyContext();

    console.warn("facture in PaymentConfirmation:", facture);

    useEffect(() => {
        const fetchQrCode = async () => {
            try {
                if (!user?.token) {
                    throw new Error("There is no token");
                }
                const response = await apiService.fetchQrCode(user.token, "payment confirmation ");
                const base64Image = arrayBufferToBase64(response);
                console.log("base64Image:", base64Image);
                setQrCodeObj({ qrCode: `data:image/png;base64,${base64Image}`, loading: false });
            } catch (error: any) {
                console.error("Error fetching QR code:", error);
                setQrCodeObj({ qrCode: null, loading: false });
                alert("Failed to fetch QR code. Please try again.");
            }
        };

        fetchQrCode();
    }, [user?.token]);

    const arrayBufferToBase64 = (buffer: ArrayBuffer): string => {
        const binary = [];
        const bytes = new Uint8Array(buffer);
        for (let i = 0; i < bytes.byteLength; i++) {
            binary.push(String.fromCharCode(bytes[i]));
        }
        return btoa(binary.join(''));
    };

    const handleSaveAsPDF = () => {
        alert("Save as PDF functionality will be implemented here.");
    };

    const handleSendViaEmail = () => {
        alert("Send via email functionality will be implemented here.");
    };

    return (
        <View className='flex flex-col h-full bg-black'>
            <View className='h-1/4 mt-5'>
                <Image
                    source={require('../../assets/placa-park-and-pay.jpg')}
                    className='h-full w-full object-cover rounded-lg'
                />
            </View>

            <View className='flex flex-row justify-center items-center mt-5'>
                <Text className='text text-white text-2xl font-bold'>
                    Great! Your payment was successful 🎉
                </Text>
            </View>

            <View className='flex flex-row justify-center items-center mt-5'>
                <Text className='text text-white text-2xl font-bold'>
                    Total Paid: {facture.total_Amount} DT
                </Text>
            </View>

            <View className="flex flex-col justify-center items-center bg-black/50 mt-10 p-5">
                <Text className="text-white text-xl text-center mb-5">
                    Show this QR code at the parking door camera to enter.
                </Text>

                    <View className=" bg-white p-5 rounded-lg w-4/5 justify-center items-center">
                    {qrCodeObj.loading ? (
                        <ActivityIndicator size="large" color="#0000ff" />
                    ) : qrCodeObj.qrCode ? (
                        <Image source={{ uri: qrCodeObj.qrCode }} className="w-60 h-60" />
                    ) : (
                        <Text className="text-xl text-red-500">Failed to load QR code.</Text>
                    )}
                </View>

                <View className="flex flex-row justify-between mt-5 w-4/5">
                    <TouchableOpacity
                        className="bg-blue-500 px-6 py-3 rounded-lg flex-1 mr-2"
                        onPress={handleSaveAsPDF}
                    >
                        <Text className="text-white text-center font-bold">Save as PDF</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        className="bg-green-500 px-6 py-3 rounded-lg flex-1 ml-2"
                        onPress={handleSendViaEmail}
                    >
                        <Text className="text-white text-center font-bold">Send via Email</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

export default PaymentConfirmationPage;