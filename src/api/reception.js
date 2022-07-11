import apiClient from "./httpService";

export function offlineGuestCheck(values) {
  return apiClient.get("/reception/offlinesignup", values);
}

export function getBookings(values) {
  return apiClient.get("/reception/booking/todays", values);
}

export function getCompletedStays(values) {
  return apiClient.get("/reception/booking/completed", values);
}

export function getCurrentlyStaying(values) {
  return apiClient.get("/reception/booking/staying", values);
}

export function getBookingDetails(id) {
  return apiClient.get(`/reception/booking/details/${id}`);
}

export function checkOutDetails(id) {
  return apiClient.get(`/reception/booking/checkout/${id}`);
}

export function getUpcomingBookings(values) {
  return apiClient.get("/reception/booking/upcoming", values);
}

export function downloadInvoice(bookingId) {
  return apiClient.get(`/reception/booking/downloadInvoice/${bookingId}`);
}

export function getReception(values) {
  return apiClient.get("/reception/signin", values);
}

export function receptionSignin(values) {
  return apiClient.post("/reception/signin", values);
}

export function offlineGuestSignup(values) {
  return apiClient.post("/reception/offlinesignup", values);
}

export function bookOfflineHotel(values) {
  return apiClient.post("/reception/booking", values);
}

export function receptionSignup(values) {
  return apiClient.post("/reception/signup", values);
}

export function receptionChangePassword(values) {
  return apiClient.post("/reception/changePassword", values);
}

export function checkOut(id, values) {
  return apiClient.post(`/reception/booking/checkout/${id}`,values);
}
export function checkIn(values) {
  return apiClient.post(`/reception/booking/checkin`,values);
}

export function editReceptionData(values) {
  return apiClient.put("/reception/signup", values);
}

export function cancelBooking(bookingId) {
  return apiClient.delete(`/reception/booking/${bookingId}`);
}