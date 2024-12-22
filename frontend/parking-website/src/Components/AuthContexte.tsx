import React, { createContext, useState, useEffect, ReactNode, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

interface User {
    username: string;
    email: string;
    profileImage?: string;
}

interface AuthContextType {
    user: User | null;
    login: (userData: User) => void;
    logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const storedUser = localStorage.getItem('userData');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    const login = (userData: User) => {
        setUser(userData);
        localStorage.setItem('userData', JSON.stringify(userData));
        navigate('/Home'); // Redirige vers la page d'accueil ou une autre page après la connexion
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('userData');
        navigate('/login'); // Redirige vers la page de connexion après la déconnexion
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
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
