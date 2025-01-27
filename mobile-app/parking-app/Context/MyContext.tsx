import React, { createContext, useState, useEffect, ReactNode, useContext } from 'react';
import { loginResponse } from '../Apis/DataResponse/dataResponse';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage

interface MyContextType {
     user: loginResponse | null;
     setUser: (user: loginResponse | null) => void;
     placeClicked:number;
     setPlaceClicked: (placeClicked:number|0) => void ;

}

export const MyContext = createContext<MyContextType | undefined>(undefined);

export const MyContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<loginResponse | null>(null);
    const [placeClicked , setPlaceClicked] = useState<number>(0);
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
        <MyContext.Provider value={{ user,setUser,placeClicked,setPlaceClicked }}>
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
