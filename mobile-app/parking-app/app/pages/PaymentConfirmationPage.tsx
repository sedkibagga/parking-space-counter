import { View, Text, Image, ActivityIndicator, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import '../../global.css';
import { useMyContext } from '../../Context/MyContext';
import apiService from '../../Apis/Services/apisService';
import * as Print from 'expo-print';
import * as FileSystem from 'expo-file-system';
import * as DocumentPicker from 'expo-document-picker';
import * as Sharing from 'expo-sharing';
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
                const response = await apiService.fetchQrCode(user.token, "your place is num :1");
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

    const handleSaveAsPDF = async () => {
        try {
            // Create an HTML template with the QR code and text
            const htmlContent = `
                <html>
                    <body>
                        <h1>Payment Confirmation</h1>
                        <p>Great! Your payment was successful 🎉</p>
                        <p>Total Paid: ${facture.total_Amount} DT</p>
                        <p>Show this QR code at the parking door camera to enter.</p>
                        <img src="${qrCodeObj.qrCode}" alt="QR Code" style="width: 200px; height: 200px;" />
                    </body>
                </html>
            `;
    
            // Generate PDF from HTML
            const { uri } = await Print.printToFileAsync({
                html: htmlContent,
            });
    
            // Save the PDF file
            const fileName = `PaymentConfirmation_${Date.now()}.pdf`;
            const newUri = `${FileSystem.documentDirectory}${fileName}`;
    
            await FileSystem.moveAsync({
                from: uri,
                to: newUri,
            });
    
            // Share the PDF file
            if (await Sharing.isAvailableAsync()) {
                await Sharing.shareAsync(newUri, {
                    mimeType: 'application/pdf',
                    dialogTitle: 'Save PDF',
                    UTI: 'com.adobe.pdf',
                });
            } else {
                alert('Sharing is not available on this platform.');
            }
        } catch (error) {
            console.error('Error saving PDF:', error);
            alert('Failed to save PDF. Please try again.');
        }
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
                    Total Paid: ${facture.total_Amount} DT
                </Text>
            </View>

            <View className="flex flex-col justify-center items-center bg-black/50 mt-10 p-5">
                <Text className="text-white text-xl text-center mb-5">
                    Show this QR code at the parking door camera to enter.
                </Text>

                <View className="bg-white p-5 rounded-lg w-4/5 justify-center items-center">
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