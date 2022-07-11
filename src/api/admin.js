import apiClient from "./httpService";

export function getAdmin(values){
    return apiClient.get("/admin/signin", values);
}

export function getRoomBoy(roomBoyId){
    return apiClient.get(`/admin/roomBoy/${roomBoyId}`);
}

export function getRoomBoys(hotelId){
    return apiClient.get(`/admin/roomBoy?hotelId=${hotelId}`);
}

export function getAdminHotels(){
    return apiClient.get("/admin/hotel");
}

export function getHotelRooms(id){
    return apiClient.get(`/admin/room?hotelId=${id}`);
}

export function getAdminRoomById(id){
    return apiClient.get(`/admin/room/${id}`);
}

export function getAdminHotelsbyId(id){
    return apiClient.get(`/admin/hotel/${id}`);
}

export function adminSignin(values){
    return apiClient.post("/admin/signin", values);
}

export function adminSignup(values){
    return apiClient.post("/admin/signup", values);
}

export function adminChangePassword(values){
    return apiClient.post("/admin/changePassword", values);
}

export function resetAdminPassword(values,token){
    return apiClient.put(`/admin/forgot/${token}`,values);
}

export function registerHotels(values){
    return apiClient.post("/admin/hotel", values);
}

export function forgotAdminPassword(values){
    return apiClient.post("/admin/forgot",values);
}

export function addRoom(values){
    return apiClient.post("/admin/room", values);
}

export function addRoomBoy(values){
    return apiClient.post("/admin/roomBoy", values);
}

export function editRoomBoy(roomBoyId,values){
    return apiClient.put(`/admin/roomBoy/${roomBoyId}`, values);
}

export function editAdminData(values){
    return apiClient.put("/admin/signup", values);
}

export function editRoomById(values,id){
    return apiClient.put(`/admin/room/${id}`,values);
}

export function editHotelById(values,id){
    return apiClient.put(`/admin/hotel/${id}`,values);
}

export function toggleVisibility(id){
    return apiClient.patch(`/admin/room/${id}`);
}

export function deleteRoomBoy(roomBoyId){
    return apiClient.delete(`/admin/roomBoy/${roomBoyId}`);
}