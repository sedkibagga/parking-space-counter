export type loginResponse = {
    token: string,
    firstName: string,
    lastName: string,
    cin: string,
    email: string,
    role: string,
    tel: string
}
export type createClientResponse = {
    firstName: string,
    lastName: string,
    email: string,
    tel: string,
    cin: string
}
export type createAdminResponse = {

    firstName: string,
    lastName: string,
    email: string,
    tel: string,
    cin: string

}
export type updateUserCarResponse = {
    id: 1073741824,
    registrationNumber: string,
    model: string,
    color: string,
    userId: 1073741824
}
export type deleteUserCarResponse = {
    id: 1073741824,
    registrationNumber: string,
    model: string,
    color: string,
    userId: 1073741824
}
export type updateStatusResponse = {
    update: string
}
export type zonePermitOccupiedResponse = {
    zoneId: 1073741824,
    status: string
}
export type zonePermitFreeResponse = {
    zoneId: 1073741824,
    status: string
}
export type getReservationResponse = {
    id: 1073741824,
    zoneId: 1073741824,
    reservation_Time: string,
    reservation_Duration: string,
    total_Amount: string,
    email: string,
    cin: string

}
export type getReservationByUserIdResponse = {
    id: 1073741824,
    zoneId: 1073741824,
    status: string,
    reservation_Time: string,
    reservation_Duration: string,
    total_Amount: string,
    cin: string,
    email: string,
    firstName: string
}
export type getParkingHistoryByUserIdsResponse = {
    id: 1073741824,
    zoneId: 1073741824,
    cin: string,
    email: string,
    firstName: string,
    lastName: string,
    createdDate: " 2025-01-19T22:20:53.831Z"
}
export type deletedReservationResponse = {
    id: 1073741824,
    zoneId: 1073741824,
    status: string,
    reservation_Time: string,
    reservation_Duration: string,
    total_Amount: string,
    userId: 1073741824

}
export type deleteHistoryParkingByIdResponse = {
    id: 1073741824,
    zoneId: 1073741824,
    cin: string,
    email: string,
    firstName: string,
    lastName: string,
    createdDate: "2025-01-19T22:25:37.358Z"
}