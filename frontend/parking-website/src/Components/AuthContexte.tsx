import React, { createContext, useState, useEffect, ReactNode, useContext } from 'react';
import { loginResponse } from '../Apis/DataResponse/dataResponse';

interface AuthContextType {
    user: loginResponse | null;
    setUser: (user: loginResponse | null) => void;
    placeClicked:number;
    setPlaceClicked: (placeClicked:number|0) => void ;

}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<loginResponse | null>(null);
    const [placeClicked , setPlaceClicked] = useState<number>(0);
    useEffect(() => {
        const storedUser = localStorage.getItem('userData');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    return (
        <AuthContext.Provider value={{ user,setUser,placeClicked,setPlaceClicked }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
