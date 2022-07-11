import apiClient from "./httpService";

export function getHotels(values){
    return apiClient.get("/guest/book", values);
}

export function getHotelsName(){
    return apiClient.get("/guest/gethotels");
}

export function getHotelInfo(values){
    return apiClient.get("/guest/book", values);
}

export function getHotel(id){
    return apiClient.get(`/guest/book/${id}`);
}

export function getRoomsbyId(data){
    return apiClient.get(`/guest/room`,data);
}

export function getBookedRoomsbyId(data){
    return apiClient.get(`/guest/bookings/guest`,data);
}

export function getRoombyId(roomId){
    return apiClient.get(`/guest/room/${roomId}`);
}

export function getGuest(values){
    return apiClient.get("/guest/signin", values);
}

export function getBookings(isStayCompleted){
    return apiClient.get("/guest/bookings",isStayCompleted);
}

export function downloadInvoice(bookingId){
    return apiClient.get(`/guest/bookings/downloadInvoice/${bookingId}`);
}

export function getLinkReview(linkId){
    return apiClient.get(`/guest/linkReview/${linkId}`);
}

export function getReviews(hotelId){
    return apiClient.get(`/guest/review/${hotelId}`);
}

export function getReviewById(reviewId){
    return apiClient.get(`/guest/reviewbyid/${reviewId}`);
}

export function forgotGuestPassword(values){
    return apiClient.post("/guest/forgot",values);
}

export function guestSignin(values){
    return apiClient.post("/guest/signin", values);
}

export function guestSignup(values){
    return apiClient.post("/guest/signup", values);
}

export function bookHotel(values){
    return apiClient.post("/guest/book", values);
}

export function guestChangePassword(values){
    return apiClient.post("/guest/changePassword", values);
}

export function addLinkReview(linkId,values){
    return apiClient.post(`/guest/linkReview/${linkId}`,values);
}

export function addReview(hotelId,values){
    return apiClient.post(`/guest/review/${hotelId}`, values);
}

export function editReview(hotelId,values){
    return apiClient.put(`/guest/review/${hotelId}`, values);
}

export function resetGuestPassword(values,token){
    return apiClient.put(`/guest/forgot/${token}`,values);
}

export function editUserData(values){
    return apiClient.put("/guest/signup", values);
}

export function cancelBooking(bookingId){
    return apiClient.delete(`/guest/book/${bookingId}`);
}