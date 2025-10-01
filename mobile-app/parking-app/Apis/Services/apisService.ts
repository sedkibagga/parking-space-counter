import axios from "axios";
import {
    loginDto,
    createClientDto,
    createAdminDto,
    updateUserCarDto,
    updateStatusDto,
    zonePermitOccupiedDto,
    createReservationDto,
    createFactureDto,
    updateUserCarInformationDto,
    UpdateUserInformationDto,
    createCommentDto,
    updateCommentByIdDto,
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
    CreateFactureResponse,
    getUserInformationResponse,
    updateUserCarInformationResponse,
    UpdateUserPasswordResponse,
    UpdateUserInformationResponse,
    getUserResponse,
    createCommentResponse,
    updateCommentByIdResponse,
    getAllCommentsResponse,
    deleteCommentByIdResponse,
    getCommentContainingFirstLastNameResponse,
} from "../DataResponse/dataResponse";

import AsyncStorage from '@react-native-async-storage/async-storage';
import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";

const BaseUri = 
const login = async (data: loginDto, setUser: (user: loginResponse | null) => void): Promise<loginResponse> => {
    try {
        const response = await axios.post(`${BaseUri}api/login`, data);
        const userData: loginResponse = response.data;
        console.log("userdata: " , userData)
        setUser(userData);
        await AsyncStorage.setItem('userData', JSON.stringify(userData));
        const storedUser = await AsyncStorage.getItem('userData');
        console.log("User in storage:", storedUser);
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

const updateUserPassword = async (
    token:string,
    updateUserPasswordDto:UpdateUserInformationDto
):Promise<UpdateUserPasswordResponse> => {
    try {

        const response = await axios.patch(`${BaseUri}api/user/updateUserPassword`, updateUserPasswordDto, {
            headers: { Authorization: `Bearer ${token}` },
        })

        return response.data

    } catch(error:any) {
        throw new Error(error.response?.data?.message || "Updating user password failed");
    }
}

const updateUserInformation = async (
    token:string,
    updateUserInformationDto:UpdateUserInformationDto,
    userId:number
):Promise<UpdateUserInformationResponse> => {
    try {
        const response = await axios.patch(`${BaseUri}api/user/updateUserInformation/${userId}`, updateUserInformationDto, {
            headers: { Authorization: `Bearer ${token}` },
        })
        return response.data
    } catch(error:any) {
        throw new Error(error.response?.data?.message || "Updating user information failed");
    }
}

const getUser = async (
    token:string,
    userId:number
):Promise<getUserResponse> => {
    try {
        const response = await axios.get(`${BaseUri}api/user/getUserInformation/${userId}`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return response.data;
    } catch (error: any) {
        throw new Error(error.response?.data?.message || "Getting user failed");
    }
}

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

const fetchQrCode = async (token: string, text: string): Promise<ArrayBuffer> => {
    try {
      const response = await axios.get(`${BaseUri}api/qrcode?text=${text}`, {
        headers: { Authorization: `Bearer ${token}` },
        responseType: 'arraybuffer',
      });
      return response.data;
    } catch (error: any) {
      console.error("Error fetching QR code:", error);
      throw new Error(error.response?.data?.message || "Failed to fetch QR code. Please try again.");
    }
  };

const updateUserCarInformation = async (
  token: string,
  updateUserCarInformationDto: updateUserCarInformationDto,
  userId:number
):Promise<updateUserCarInformationResponse> =>{
    try {
        const response = await axios.patch(`${BaseUri}api/user/updateUserCarInformation/${userId}`, updateUserCarInformationDto, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return response.data;
    } catch (error:any) {
        throw new Error(error.response?.data?.message || "Updating user car failed");
    }

}

const createFacture = async (
    data: createFactureDto,
    token: string
    
): Promise<CreateFactureResponse> => {
    try {
        const response = await axios.post(`${BaseUri}api/zones/getFacture`, data, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return response.data;
    } catch (error: any) {
        throw new Error(error.response?.data?.message || "Creating facture failed");
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

const getUserCarInformation = async (
    token:string,
    userId:number
) : Promise<getUserInformationResponse> => {
   try {
    const response = await axios.get(`${BaseUri}api/user/getUserCarInformation/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
   } catch(error:any) {
    throw new Error (
        error.response?.data?.message || "error of getting userCar Information"
    )
   }
}

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
};

const createComment = async (
    createCommentDto: createCommentDto,
    token: string
): Promise<createCommentResponse> => {
    try {
        const response = await axios.post(`${BaseUri}api/comments/createComment`, createCommentDto, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return response.data;
    } catch (error: any) {
        throw new Error(
            error.response?.data?.message || "Creating comment failed"
        );
    }
}

const updateComment = async (
    updateCommentDto: updateCommentByIdDto,
    token: string,
    commentId: number
): Promise<updateCommentByIdResponse> => {
    try {
        const response = await axios.patch(`${BaseUri}api/comments/updateComment/${commentId}`, updateCommentDto, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return response.data;
    } catch (error: any) {
        throw new Error(
            error.response?.data?.message || "Updating comment failed"
        );
    }
}

const getAllComments = async (
    token: string
) : Promise<getAllCommentsResponse[]> => {
    try {
        const response = await axios.get(`${BaseUri}api/comments/getAllComments`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return response.data;
    } catch (error: any) {
        throw new Error(
            error.response?.data?.message || "Fetching comments failed"
        );
    }
} 

const getCommentContainingFirstLastName = async (
    token: string,
    firstName:string|undefined,
    lastName:string|undefined
) :Promise<getCommentContainingFirstLastNameResponse[]> => {
    try {
       const response = await axios.get(`${BaseUri}api/comments/getCommentContainingUserFirstNameAndLastNames/${firstName}/${lastName}`, {
           headers: { Authorization: `Bearer ${token}` },
       })
       return response.data;
    } catch(error:any) {
        throw new Error(
            error.response?.data?.message || "Fetching comments failed"
        );
    }
} 




const deleteComment = async (
    token: string,
    commentId: number
): Promise<deleteCommentByIdResponse> => {
    try {
        const response = await axios.delete(`${BaseUri}api/comments/deleteComment/${commentId}`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return response.data;
    } catch (error: any) {
        throw new Error(
            error.response?.data?.message || "Deleting comment failed"
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
    createReservation,
    createFacture,
    getUserCarInformation,
    updateUserCarInformation,
    fetchQrCode,
    updateUserPassword,
    updateUserInformation,
    getUser,
    getAllComments,
    getCommentContainingFirstLastName,
    deleteComment,
    createComment,
    updateComment,
};

export default apiService;
