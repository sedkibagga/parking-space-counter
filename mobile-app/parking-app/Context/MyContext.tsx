import React, { createContext, useState, useEffect, ReactNode, useContext } from 'react';
import { factureReservationResponse, getAllCommentsResponse, loginResponse, userSettingsResponse } from '../Apis/DataResponse/dataResponse';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage
import apiService from '../Apis/Services/apisService';

interface MyContextType {
    user: loginResponse | null;
    setUser: (user: loginResponse | null) => void;
    placeClicked: number;
    setPlaceClicked: (placeClicked: number | 0) => void;
    showReservationModal: boolean;
    setShowReservationModal: (showReservationModal: boolean) => void;
    userSettings: userSettingsResponse;
    setUserSettings: (userSettings: userSettingsResponse) => void;
    facture: factureReservationResponse;
    setFacture: (facture: factureReservationResponse) => void;
    comments: getAllCommentsResponse[];
    setComments: (comments: getAllCommentsResponse[]) => void;
    getAllComments: () => void;
    commentsLength:number
    setCommentsLength:(commentsLength:number)=> void;
}

export const MyContext = createContext<MyContextType | undefined>(undefined);

export const MyContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<loginResponse | null>(null);
    const [facture, setFacture] = useState<factureReservationResponse>({ zoneId: 0, reservation_Time: "", reservation_Duration: "", total_Amount: "", firstName: "", lastName: "", cin: "", email: "", tel: "" });
    const [placeClicked, setPlaceClicked] = useState<number>(0);
    const [showReservationModal, setShowReservationModal] = useState<boolean>(false);
    const [comments, setComments] = useState<getAllCommentsResponse[]>([]);
    const [userSettings, setUserSettings] = useState<userSettingsResponse>({ firstName: "", lastName: "", email: "", phoneNumber: "", color: "", model: "", registrationNumber: "", imageUri: "" });
    const [commentsLength, setCommentsLength] = useState<number>(0);
    const getAllComments = async () => {
        try {
            if (!user || !user.id || !user.token) return;
            const response = await apiService.getAllComments(user.token);
            setComments(response);
            setCommentsLength(response.length);
        } catch (error: any) {
            console.warn(error);
        }
    };
    useEffect(() => {
        const loadUser = async () => {
            try {
                const storedUser = await AsyncStorage.getItem('userData');
                if (storedUser) {
                    setUser(JSON.parse(storedUser));
                }
            } catch (error) {
                console.error('Failed to load user data:', error);
            }
        };
        loadUser();
        getAllComments();
    }, []);

    return (
        <MyContext.Provider value={{ user, setUser, placeClicked, setPlaceClicked, showReservationModal, setShowReservationModal, userSettings, setUserSettings, facture, setFacture, comments, setComments, getAllComments,commentsLength ,setCommentsLength }}>
            {children}
        </MyContext.Provider>
    );
};

export const useMyContext = (): MyContextType => {
    const context = useContext(MyContext);
    if (!context) {
        throw new Error('useMyContext must be used within an MyContextProvider');
    }
    return context;
};  
