import React, { createContext, useState, useEffect, ReactNode, useContext } from 'react';
import { factureReservationResponse, loginResponse, userSettingsResponse } from '../Apis/DataResponse/dataResponse';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage

interface MyContextType {
     user: loginResponse | null;
     setUser: (user: loginResponse | null) => void;
     placeClicked:number;
     setPlaceClicked: (placeClicked:number|0) => void ;
     showReservationModal:boolean;
     setShowReservationModal: (showReservationModal:boolean) => void;
     userSettings:userSettingsResponse;
     setUserSettings:(userSettings:userSettingsResponse) => void;
     facture:factureReservationResponse;
     setFacture:(facture:factureReservationResponse) => void;
}

export const MyContext = createContext<MyContextType | undefined>(undefined);

export const MyContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<loginResponse | null>(null);
    const [facture, setFacture] = useState<factureReservationResponse>({ zoneId: 0, reservation_Time: "", reservation_Duration: "", total_Amount: "", firstName: "", lastName: "", cin: "", email: "", tel: "" });
    const [placeClicked , setPlaceClicked] = useState<number>(0);
    const [showReservationModal,setShowReservationModal] = useState<boolean>(false);
    const[userSettings,setUserSettings] = useState<userSettingsResponse>({firstName:"",lastName:"",email:"" , phoneNumber:"" , color:"" , model:"" , registrationNumber:"",imageUri:"" });
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
    }, []);

    return (
        <MyContext.Provider value={{ user,setUser,placeClicked,setPlaceClicked , showReservationModal , setShowReservationModal , userSettings ,setUserSettings ,facture ,setFacture }}>
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
