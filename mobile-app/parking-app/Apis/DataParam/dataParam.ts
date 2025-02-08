export type loginDto = {
    email: string,
    password: string
}
export type createClientDto = {
    firstName: string,
    lastName: string,
    cin: string,
    email: string,
    password: string,
    tel: string
}
export type createAdminDto = {
    firstName: string,
    lastName: string,
    cin: string,
    email: string,
    password: string,
    tel: string
}
export type updateUserCarDto = {
    registrationNumber: string,
    model: string,
    color: string
}
export type deleteUserCarDto = {

}
export type updateStatusDto = {

}
export type zonePermitOccupiedDto = {

}
export type zonePermitFreeResponse = {

}
export type getReservationResponse = {


}
export type getReservationByUserIdDto = {

}
export type getParkingHistoryByUserIdsDto = {

}
export type deletedReservationDto = {


}
export type deleteHistoryParkingByIdDto = {

}

export type createReservationDto = {
    reservation_Time: string,
    reservation_Duration: string
}


export type createFactureDto = {
    zoneId: number,
    reservation_Time: string,
    reservation_Duration: string,
}

export type updateUserCarInformationDto = {
    registrationNumber: string,
    model: string,
    color: string,
    imageUri: string

}

export type UpdateUserPasswordDto = {
    oldPassword: string,
    newPassword: string,
    confirmPassword: string
}

export type UpdateUserInformationDto = {
    firstName: string,
    lastName: string,
    email: string,
    phoneNumber: string
}

export type createCommentDto = {
    comment: string
    userId: number
}

export type updateCommentByIdDto = {
    comment: string,
    
}