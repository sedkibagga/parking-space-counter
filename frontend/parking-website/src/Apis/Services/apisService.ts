import axios from "axios";
import {
    loginDto,
    createClientDto,
    createAdminDto,
    updateUserCarDto,
    updateStatusDto,
    zonePermitOccupiedDto,
    createReservationDto,
}
    from '../DataParam/dataParam';
import {
    loginResponse,
    createClientResponse,
    createAdminResponse,
    updateUserCarResponse,
    updateStatusResponse,
    zonePermitOccupiedResponse,
    zonePermitFreeResponse,
    getReservationResponse,
    getReservationByUserIdResponse,
    getParkingHistoryByUserIdsResponse,
    deletedReservationResponse,
    deleteHistoryParkingByIdResponse,
    User,
    createReservationResponse,
} from "../DataResponse/dataResponse";


const BaseUri = "http://localhost:8080/";

const login = async (data: loginDto, setUser: (user: loginResponse | null) => void): Promise<loginResponse> => {
    try {
        const response = await axios.post(`${BaseUri}api/login`, data);
        const userData: loginResponse = response.data;
        setUser(userData);
        localStorage.setItem('userData', JSON.stringify(userData));
        console.log("the user in stoarage:", localStorage.getItem('userData'));
        return response.data;

    } catch (error: any) {
        throw new Error(error.response?.data?.message || "Login failed");
    }
};

const createClient = async (
    data: createClientDto,
): Promise<createClientResponse> => {
    try {
        const response = await axios.post(`${BaseUri}api/createClient`, data);
        return response.data;
    } catch (error: any) {
        throw new Error(error.response?.data?.message || "Creating client failed");
    }
};

const createAdmin = async (
    data: createAdminDto,
    token: string
): Promise<createAdminResponse> => {
    try {
        const response = await axios.post(`${BaseUri}admins`, data, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return response.data;
    } catch (error: any) {
        throw new Error(error.response?.data?.message || "Creating admin failed");
    }
};

const updateUserCar = async (
    data: updateUserCarDto,
    token: string,
    userId: string
): Promise<updateUserCarResponse> => {
    try {
        const response = await axios.patch(`${BaseUri}users/${userId}/car`, data, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return response.data;
    } catch (error: any) {
        throw new Error(error.response?.data?.message || "Updating user car failed");
    }
};

const updateStatus = async (
    data: updateStatusDto,
    token: string,
    zoneId: string
): Promise<updateStatusResponse> => {
    try {
        const response = await axios.patch(`${BaseUri}zones/${zoneId}/status`, data, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return response.data;
    } catch (error: any) {
        throw new Error(error.response?.data?.message || "Updating status failed");
    }
};

const zonePermitOccupied = async (
): Promise<zonePermitOccupiedResponse[]> => {
    try {
        const response = await axios.get(`${BaseUri}api/zones/permit/occupied`);
        return response.data;
    } catch (error: any) {
        throw new Error(
            error.response?.data?.message || "Error of get occupied zones"
        );
    }
};

const zonePermitFree = async (
): Promise<zonePermitFreeResponse[]> => {
    try {
        const response = await axios.get(`${BaseUri}api/zones/permit/free`);
        return response.data;
    } catch (error: any) {
        throw new Error(
            error.response?.data?.message || "Error of get free zones"
        );
    }
};

const getReservation = async (
    reservationId: string,
    token: string
): Promise<getReservationResponse> => {
    try {
        const response = await axios.get(`${BaseUri}reservations/${reservationId}`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return response.data;
    } catch (error: any) {
        throw new Error(
            error.response?.data?.message || "Fetching reservation failed"
        );
    }
};

const getReservationByUserId = async (
    userId: string,
    token: string
): Promise<getReservationByUserIdResponse[]> => {
    try {
        const response = await axios.get(`${BaseUri}users/${userId}/reservations`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return response.data;
    } catch (error: any) {
        throw new Error(
            error.response?.data?.message || "Fetching user reservations failed"
        );
    }
};

const getParkingHistoryByUserId = async (
    userId: string,
    token: string
): Promise<getParkingHistoryByUserIdsResponse[]> => {
    try {
        const response = await axios.get(`${BaseUri}users/${userId}/parking-history`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return response.data;
    } catch (error: any) {
        throw new Error(
            error.response?.data?.message || "Fetching parking history failed"
        );
    }
};

const deleteReservation = async (
    reservationId: string,
    token: string
): Promise<deletedReservationResponse> => {
    try {
        const response = await axios.delete(`${BaseUri}reservations/${reservationId}`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return response.data;
    } catch (error: any) {
        throw new Error(
            error.response?.data?.message || "Deleting reservation failed"
        );
    }
};

const deleteParkingHistory = async (
    historyId: string,
    token: string
): Promise<deleteHistoryParkingByIdResponse> => {
    try {
        const response = await axios.delete(`${BaseUri}parking-history/${historyId}`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return response.data;
    } catch (error: any) {
        throw new Error(
            error.response?.data?.message || "Deleting parking history failed"
        );
    }
};

const createReservation = async (
    reservation: createReservationDto,
    zone: number,
    token: string
): Promise<createReservationResponse> => {
    try {

        const response = await axios.post(`${BaseUri}api/zones/reserve/${zone}`, reservation, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return response.data;
    } catch (error: any) {

        throw new Error(
            error.response?.data?.message || "Creating reservation failed"
        );
    }
}


const apiService = {
    login,
    createClient,
    createAdmin,
    updateUserCar,
    updateStatus,
    zonePermitOccupied,
    zonePermitFree,
    getReservation,
    getReservationByUserId,
    getParkingHistoryByUserId,
    deleteReservation,
    deleteParkingHistory,
    createReservation
};

export default apiService;
