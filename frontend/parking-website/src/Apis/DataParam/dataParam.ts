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
