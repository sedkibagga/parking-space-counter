import React, { createContext, useState, useEffect, ReactNode, useContext } from 'react';
import { loginResponse, userSettingsResponse } from '../Apis/DataResponse/dataResponse';
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
}

export const MyContext = createContext<MyContextType | undefined>(undefined);

export const MyContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<loginResponse | null>(null);
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
        <MyContext.Provider value={{ user,setUser,placeClicked,setPlaceClicked , showReservationModal , setShowReservationModal , userSettings ,setUserSettings }}>
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
