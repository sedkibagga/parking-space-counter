import axios from "axios";
import {
    loginDto,
    createClientDto,
    createAdminDto,
    updateUserCarDto,
    updateStatusDto,
    zonePermitOccupiedDto,
}
    from './DataParam/dataParam';
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
} from "./DataResponse/dataResponse";

const BaseUri = "http://localhost:8080/";

const login = async (data: loginDto): Promise<loginResponse> => {
    try {
        const response = await axios.post(`${BaseUri}auth/login`, data);
        return response.data;
    } catch (error: any) {
        throw new Error(error.response?.data?.message || "Login failed");
    }
};

const createClient = async (
    data: createClientDto,
    token: string
): Promise<createClientResponse> => {
    try {
        const response = await axios.post(`${BaseUri}clients`, data, {
            headers: { Authorization: `Bearer ${token}` },
        });
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
    data: zonePermitOccupiedDto,
    token: string
): Promise<zonePermitOccupiedResponse> => {
    try {
        const response = await axios.patch(`${BaseUri}zones/permit/occupied`, data, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return response.data;
    } catch (error: any) {
        throw new Error(
            error.response?.data?.message || "Marking zone as occupied failed"
        );
    }
};

const zonePermitFree = async (
    zoneId: string,
    token: string
): Promise<zonePermitFreeResponse> => {
    try {
        const response = await axios.patch(`${BaseUri}zones/${zoneId}/free`, {}, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return response.data;
    } catch (error: any) {
        throw new Error(
            error.response?.data?.message || "Marking zone as free failed"
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
};

export default apiService;
